from fastapi import FastAPI

from services.ai.app.matcher import rerank_candidates
from services.ai.app.qdrant_indexer import QdrantIndexer
from services.ai.app.schemas import (
    CollectionsResponse,
    IndexResponse,
    JobsIndexRequest,
    MatchRequest,
    MatchResponse,
    PortfoliosIndexRequest,
)

app = FastAPI(
    title="Marketplace AI Service",
    version="0.1.0",
    description="AI service boundary for semantic search, ranking, and portfolio intelligence.",
)

qdrant_indexer = QdrantIndexer()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "ai"}


@app.post("/match/rerank", response_model=MatchResponse)
def rerank(request: MatchRequest) -> MatchResponse:
    return rerank_candidates(request)


@app.get("/collections/status", response_model=CollectionsResponse)
def collection_status() -> CollectionsResponse:
    result = qdrant_indexer.collection_status()
    return CollectionsResponse(
        status=result.status,
        detail=result.detail,
        collections=result.collections or {},
    )


@app.post("/collections/bootstrap", response_model=CollectionsResponse)
def bootstrap_collections() -> CollectionsResponse:
    result = qdrant_indexer.bootstrap()
    return CollectionsResponse(
        status=result.status,
        detail=result.detail,
        collections=result.collections or {},
    )


@app.post("/index/jobs", response_model=IndexResponse)
def index_jobs(request: JobsIndexRequest) -> IndexResponse:
    result = qdrant_indexer.index_jobs(request.jobs)
    return IndexResponse(
        status=result.status,
        detail=result.detail,
        counts=result.counts or {},
    )


@app.post("/index/portfolios", response_model=IndexResponse)
def index_portfolios(request: PortfoliosIndexRequest) -> IndexResponse:
    result = qdrant_indexer.index_portfolios(request.portfolios)
    return IndexResponse(
        status=result.status,
        detail=result.detail,
        counts=result.counts or {},
    )
