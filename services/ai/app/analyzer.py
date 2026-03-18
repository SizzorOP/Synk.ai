from services.ai.app.schemas import (
    MatchPercentageRequest,
    MatchPercentageResponse,
    ProjectAnalyzeRequest,
    ProjectAnalyzeResponse,
    GithubAnalyzeRequest,
    GithubAnalyzeResponse,
)

def compute_match_percentage(request: MatchPercentageRequest) -> MatchPercentageResponse:
    # MOCK LLM: Deduce a match percentage based on skills length
    score = min(50 + (len(request.skills) * 10), 98)
    return MatchPercentageResponse(
        percentage=score,
        explanation=f"Based on {len(request.skills)} matched skills and LLM evaluation, this is a top tier match."
    )

def analyze_project(request: ProjectAnalyzeRequest) -> ProjectAnalyzeResponse:
    # MOCK LLM Analysis
    return ProjectAnalyzeResponse(
        score=85,
        feedback="The project shows good architecture but lacks comprehensive test coverage explanations.",
        improvements=[
            "Add a more detailed README",
            "Explain the technical challenges you overcame",
            "Include screenshots of the working product"
        ]
    )

def analyze_github(request: GithubAnalyzeRequest) -> GithubAnalyzeResponse:
    # MOCK LLM GitHub Code Analysis
    return GithubAnalyzeResponse(
        score=92.5,
        analysis_report="High quality commit history and modular structure found. Automated testing is present.",
        metrics={
            "code_quality": "A-",
            "test_coverage": "78%",
            "complexity": "moderate"
        }
    )
