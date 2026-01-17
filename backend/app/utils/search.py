from __future__ import annotations

import re
import secrets
import string
from typing import Any

from sqlalchemy import ColumnElement, or_


def query_with_search(
    model: Any,
    query: Any,
    searchable_fields: list[str],
    search: str | None = None,
) -> Any:

    if not search or not search.strip():
        return query

    search_terms = _parse_search_terms(search.strip())

    for term in search_terms:
        search_clauses = _build_search_clauses(model, searchable_fields, term)
        if search_clauses:
            query = query.where(or_(*search_clauses))

    return query


def _parse_search_terms(search: str) -> list[str]:
    # Find all quoted phrases (both single and double quotes)
    quoted_phrases = re.findall(r'"([^"]*?)"|\'([^\']*?)\'', search)

    # Generate unique placeholder for quoted phrases
    placeholder = _generate_placeholder()

    # Replace quoted phrases with placeholder
    search_without_quotes = re.sub(r'"[^"]*?"|\'[^\']*?\'', placeholder, search)

    # Split by whitespace to get individual words
    terms = search_without_quotes.split()

    # Replace placeholders with actual quoted phrases
    quoted_index = 0
    final_terms = []

    for term in terms:
        if term == placeholder and quoted_index < len(quoted_phrases):
            phrase = quoted_phrases[quoted_index][0] or quoted_phrases[quoted_index][1]
            if phrase.strip():  # Only add non-empty phrases
                final_terms.append(phrase.strip())
            quoted_index += 1
        elif term.strip():  # Only add non-empty terms
            final_terms.append(term.strip())

    return final_terms


def _generate_placeholder() -> str:
    """Generate a unique placeholder string."""
    characters = string.ascii_letters + string.digits
    return "".join(secrets.choice(characters) for _ in range(12))


def _build_search_clauses(
    model: Any, searchable_fields: list[str], term: str  # SQLAlchemy model class
) -> list[ColumnElement[bool]]:

    clauses: list[ColumnElement[bool]] = []

    # Add text search clauses for each searchable field
    for field in searchable_fields:
        if hasattr(model, field):
            field_attr = getattr(model, field)
            clauses.append(field_attr.contains(term))

    # Add ID search if term is numeric and model has id field
    if term.isdigit() and hasattr(model, "id"):
        clauses.append(model.id == int(term))

    return clauses
