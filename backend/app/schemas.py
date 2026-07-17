from pydantic import BaseModel


class SongBase(BaseModel):
    title: str
    lyrics: str


class SongCreate(SongBase):
    pass


class SongResponse(SongBase):
    id: int

    class Config:
        from_attributes = True
