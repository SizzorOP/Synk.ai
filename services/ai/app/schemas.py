from typing import List

from pydantic import BaseModel, Field


class MatchCandidate(BaseModel):
    freelancer_id: str
    skills: List[str]
    trust_score: float = Field(ge=0.0, le=1.0)
    verified: bool
    rate_min: int
    rate_max: int
    proof: List[str]


class MatchRequest(BaseModel):
    title: str
    description: str
    location: str
    budget_min: int = Field(ge=0)
    budget_max: int = Field(ge=0)
    required_skills: List[str]
    proof_signals: List[str] = Field(default_factory=list)
    requires_verified_badge: bool = False
    candidates: List[MatchCandidate] = Field(default_factory=list)


class MatchExplanation(BaseModel):
    freelancer_id: str
    score: float
    explanation: str
    matched_skills: List[str]


class MatchResponse(BaseModel):
    model: str
    results: List[MatchExplanation]


class IndexedJob(BaseModel):
    id: str
    slug: str
    title: str
    brand: str
    description: str
    location: str
    budget_min: int = Field(ge=0)
    budget_max: int = Field(ge=0)
    required_skills: List[str]
    proof_signals: List[str] = Field(default_factory=list)
    requires_verified_badge: bool = False


class IndexedPortfolio(BaseModel):
    id: str
    slug: str
    creator_name: str
    title: str
    category: str
    location: str
    hourly_rate_min: int = Field(ge=0)
    hourly_rate_max: int = Field(ge=0)
    skills: List[str]
    proof: List[str]
    trust_score: float = Field(ge=0.0, le=1.0)
    verified: bool
    availability: str


class JobsIndexRequest(BaseModel):
    jobs: List[IndexedJob] = Field(default_factory=list)


class PortfoliosIndexRequest(BaseModel):
    portfolios: List[IndexedPortfolio] = Field(default_factory=list)


class CollectionsResponse(BaseModel):
    status: str
    detail: str
    collections: dict[str, str] = Field(default_factory=dict)


class IndexResponse(BaseModel):
    status: str
    detail: str
    counts: dict[str, int] = Field(default_factory=dict)
