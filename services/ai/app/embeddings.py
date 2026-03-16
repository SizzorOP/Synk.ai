from __future__ import annotations

import hashlib


def pseudo_embedding(text: str, dim: int) -> list[float]:
    if dim <= 0:
        raise ValueError("Embedding dimension must be positive.")

    source = text.encode("utf-8")
    values: list[float] = []
    counter = 0

    while len(values) < dim:
        digest = hashlib.sha256(source + counter.to_bytes(4, "little")).digest()
        for byte in digest:
            values.append((byte / 127.5) - 1.0)
            if len(values) == dim:
                break
        counter += 1

    return values
