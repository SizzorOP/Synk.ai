from __future__ import annotations

from services.ai.app.schemas import MatchCandidate, MatchExplanation, MatchRequest, MatchResponse


def rerank_candidates(request: MatchRequest) -> MatchResponse:
    results: list[MatchExplanation] = []
    required_skills = {skill.lower() for skill in request.required_skills}
    proof_terms = [item.lower() for item in request.proof_signals]

    for candidate in request.candidates:
        matched_skills = sorted(
            skill for skill in candidate.skills if skill.lower() in required_skills
        )
        skill_score = len(matched_skills) / len(required_skills) if required_skills else 0

        budget_score = 1.0
        if request.budget_max < candidate.rate_min or request.budget_min > candidate.rate_max:
            budget_score = 0.2

        location_score = 1.0 if candidate.verified or request.location.lower() == "remote" else 0.75
        verification_score = 1.0 if (not request.requires_verified_badge or candidate.verified) else 0.0

        proof_text = " ".join(candidate.proof).lower()
        proof_matches = sum(term in proof_text for term in proof_terms)
        proof_score = proof_matches / len(proof_terms) if proof_terms else 0.8

        score = (
            skill_score * 0.4
            + budget_score * 0.2
            + location_score * 0.05
            + verification_score * 0.1
            + candidate.trust_score * 0.15
            + proof_score * 0.1
        )

        explanation = (
            f"Matched {len(matched_skills)} required skills, trust {candidate.trust_score:.2f}, "
            f"budget score {budget_score:.2f}, proof score {proof_score:.2f}."
        )

        if verification_score > 0:
            results.append(
                MatchExplanation(
                    freelancer_id=candidate.freelancer_id,
                    score=round(score, 4),
                    explanation=explanation,
                    matched_skills=matched_skills,
                )
            )

    ranked = sorted(results, key=lambda item: item.score, reverse=True)
    return MatchResponse(model="rerank_heuristic_v1", results=ranked)
