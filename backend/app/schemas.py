from pydantic import BaseModel, ConfigDict


class SongCreate(BaseModel):
    title: str
    lyrics: str
    video_url: str | None = None


class SongResponse(BaseModel):
    id: int
    title: str
    lyrics: str
    video_url: str | None = None

    model_config = ConfigDict(from_attributes=True)
