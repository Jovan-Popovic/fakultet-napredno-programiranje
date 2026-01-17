from __future__ import annotations

from pydantic import BaseModel


# TODO: Find right place for this
class PageData(BaseModel):
    category_enum: str
    about: str
    picture: str
    cover_photo: str
    website: str


class GoogleServiceAccountConfig(BaseModel):
    type: str
    project_id: str
    private_key_id: str
    private_key: str
    client_email: str
    client_id: str
    auth_uri: str
    token_uri: str
    auth_provider_x509_cert_url: str
    client_x509_cert_url: str
    universe_domain: str
