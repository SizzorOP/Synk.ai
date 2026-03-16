from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any

from qdrant_client import QdrantClient
from qdrant_client.http import models

from services.ai.app.embeddings import pseudo_embedding
from services.ai.app.schemas import IndexedJob, IndexedPortfolio


@dataclass
class OperationResult:
    status: str
    detail: str
    counts: dict[str, int] | None = None
    collections: dict[str, str] | None = None


class QdrantIndexer:
    def __init__(self) -> None:
        self.url = os.getenv("QDRANT_URL")
        self.embedding_dim = int(os.getenv("EMBEDDING_DIM", "3072"))

    def collection_status(self) -> OperationResult:
        client = self._client()
        if client is None:
          return OperationResult(
              status="skipped",
              detail="QDRANT_URL is not configured.",
              collections={},
          )

        try:
            response = client.get_collections()
            collections = {
                item.name: "present"
                for item in response.collections
            }
            return OperationResult(
                status="ok",
                detail="Fetched collection status.",
                collections=collections,
            )
        except Exception as exc:
            return OperationResult(
                status="failed",
                detail=f"Could not fetch collections: {exc}",
                collections={},
            )

    def bootstrap(self) -> OperationResult:
        client = self._client()
        if client is None:
            return OperationResult(
                status="skipped",
                detail="QDRANT_URL is not configured.",
                collections={},
            )

        try:
            self._ensure_talent_collection(client)
            self._ensure_evidence_collection(client)
            self._ensure_jobs_collection(client)
            return OperationResult(
                status="ok",
                detail="Collections bootstrapped.",
                collections={
                    "talent_profiles_v1": "ready",
                    "portfolio_evidence_v1": "ready",
                    "jobs_v1": "ready",
                },
            )
        except Exception as exc:
            return OperationResult(
                status="failed",
                detail=f"Collection bootstrap failed: {exc}",
                collections={},
            )

    def index_jobs(self, jobs: list[IndexedJob]) -> OperationResult:
        client = self._client()
        if client is None:
            return OperationResult(
                status="skipped",
                detail="QDRANT_URL is not configured.",
                counts={"jobs_v1": 0},
            )

        try:
            self._ensure_jobs_collection(client)
            points = [
                models.PointStruct(
                    id=job.id,
                    vector={
                        "job_semantic": pseudo_embedding(
                            " ".join(
                                [
                                    job.title,
                                    job.description,
                                    job.brand,
                                    job.location,
                                    " ".join(job.required_skills),
                                    " ".join(job.proof_signals),
                                ]
                            ),
                            self.embedding_dim,
                        )
                    },
                    payload={
                        "job_id": job.id,
                        "organization_id": job.brand,
                        "status": "OPEN",
                        "work_type": "FIXED_PRICE",
                        "location_type": "REMOTE",
                        "country_code": _country_code(job.location),
                        "city": job.location,
                        "budget_currency": "INR",
                        "budget_min_minor": job.budget_min * 100,
                        "budget_max_minor": job.budget_max * 100,
                        "required_skill_slugs": job.required_skills,
                        "requires_verified_badge": job.requires_verified_badge,
                    },
                )
                for job in jobs
            ]
            client.upsert(collection_name="jobs_v1", points=points)
            return OperationResult(
                status="ok",
                detail="Indexed jobs into Qdrant.",
                counts={"jobs_v1": len(points)},
            )
        except Exception as exc:
            return OperationResult(
                status="failed",
                detail=f"Job indexing failed: {exc}",
                counts={"jobs_v1": 0},
            )

    def index_portfolios(self, portfolios: list[IndexedPortfolio]) -> OperationResult:
        client = self._client()
        if client is None:
            return OperationResult(
                status="skipped",
                detail="QDRANT_URL is not configured.",
                counts={"talent_profiles_v1": 0, "portfolio_evidence_v1": 0},
            )

        try:
            self._ensure_talent_collection(client)
            self._ensure_evidence_collection(client)

            talent_points: list[models.PointStruct] = []
            evidence_points: list[models.PointStruct] = []

            for portfolio in portfolios:
                talent_points.append(
                    models.PointStruct(
                        id=portfolio.id,
                        vector={
                            "profile_semantic": pseudo_embedding(
                                f"{portfolio.creator_name} {portfolio.title} {portfolio.category} {portfolio.location}",
                                self.embedding_dim,
                            ),
                            "skills_semantic": pseudo_embedding(
                                " ".join(portfolio.skills),
                                self.embedding_dim,
                            ),
                            "proof_semantic": pseudo_embedding(
                                " ".join(portfolio.proof),
                                self.embedding_dim,
                            ),
                        },
                        payload={
                            "user_id": portfolio.id,
                            "country_code": _country_code(portfolio.location),
                            "city": portfolio.location,
                            "time_zone": _time_zone(portfolio.location),
                            "availability": portfolio.availability,
                            "hourly_rate_min_minor": portfolio.hourly_rate_min * 100,
                            "hourly_rate_max_minor": portfolio.hourly_rate_max * 100,
                            "primary_currency": "INR",
                            "subscription_plan_code": "FREE",
                            "visibility_multiplier": 1.0,
                            "verified_badge": portfolio.verified,
                            "trust_score": portfolio.trust_score,
                            "average_rating": 0.0,
                            "response_rate": 0.0,
                            "completed_contracts_count": 0,
                            "top_skill_slugs": portfolio.skills,
                            "featured_project_ids": [portfolio.slug],
                            "primary_proof_asset_ids": [],
                        },
                    )
                )

                for index, proof in enumerate(portfolio.proof):
                    evidence_points.append(
                        models.PointStruct(
                            id=f"{portfolio.id}:proof:{index}",
                            vector={
                                "evidence_semantic": pseudo_embedding(
                                    f"{portfolio.creator_name} {proof}",
                                    self.embedding_dim,
                                )
                            },
                            payload={
                                "point_kind": "project",
                                "user_id": portfolio.id,
                                "project_id": portfolio.slug,
                                "asset_id": None,
                                "source_type": "manual",
                                "skill_slugs": portfolio.skills,
                                "quality_score": portfolio.trust_score,
                                "verified_badge": portfolio.verified,
                                "public_url": portfolio.slug,
                                "thumbnail_url": None,
                                "duration_sec": 0.0,
                            },
                        )
                    )

            client.upsert(collection_name="talent_profiles_v1", points=talent_points)
            client.upsert(collection_name="portfolio_evidence_v1", points=evidence_points)
            return OperationResult(
                status="ok",
                detail="Indexed portfolios into Qdrant.",
                counts={
                    "talent_profiles_v1": len(talent_points),
                    "portfolio_evidence_v1": len(evidence_points),
                },
            )
        except Exception as exc:
            return OperationResult(
                status="failed",
                detail=f"Portfolio indexing failed: {exc}",
                counts={"talent_profiles_v1": 0, "portfolio_evidence_v1": 0},
            )

    def _client(self) -> QdrantClient | None:
        if not self.url:
            return None
        return QdrantClient(url=self.url, timeout=10.0)

    def _ensure_jobs_collection(self, client: QdrantClient) -> None:
        self._create_collection_if_missing(
            client,
            "jobs_v1",
            vectors_config={
                "job_semantic": models.VectorParams(
                    size=self.embedding_dim,
                    distance=models.Distance.COSINE,
                )
            },
        )

    def _ensure_talent_collection(self, client: QdrantClient) -> None:
        self._create_collection_if_missing(
            client,
            "talent_profiles_v1",
            vectors_config={
                "profile_semantic": models.VectorParams(
                    size=self.embedding_dim,
                    distance=models.Distance.COSINE,
                ),
                "skills_semantic": models.VectorParams(
                    size=self.embedding_dim,
                    distance=models.Distance.COSINE,
                ),
                "proof_semantic": models.VectorParams(
                    size=self.embedding_dim,
                    distance=models.Distance.COSINE,
                ),
            },
        )

    def _ensure_evidence_collection(self, client: QdrantClient) -> None:
        self._create_collection_if_missing(
            client,
            "portfolio_evidence_v1",
            vectors_config={
                "evidence_semantic": models.VectorParams(
                    size=self.embedding_dim,
                    distance=models.Distance.COSINE,
                )
            },
        )

    def _create_collection_if_missing(
        self,
        client: QdrantClient,
        name: str,
        vectors_config: dict[str, models.VectorParams],
    ) -> None:
        collections = client.get_collections().collections
        if any(item.name == name for item in collections):
            return
        client.create_collection(
            collection_name=name,
            vectors_config=vectors_config,
        )


def _country_code(location: str) -> str:
    normalized = location.lower()
    if "uae" in normalized or "dubai" in normalized:
        return "AE"
    return "IN"


def _time_zone(location: str) -> str:
    normalized = location.lower()
    if "uae" in normalized or "dubai" in normalized:
        return "Asia/Dubai"
    return "Asia/Kolkata"
