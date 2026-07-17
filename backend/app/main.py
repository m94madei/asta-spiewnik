from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine, SessionLocal
from schemas import SongCreate, SongResponse

models.Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Asta Śpiewnik API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@app.get("/")
def root():

    return {
        "message": "Asta Śpiewnik API działa"
    }



@app.get("/songs")
def get_songs(
    db: Session = Depends(get_db)
):

    songs = db.query(
        models.Song
    ).all()

    return songs

@app.post("/songs", response_model=SongResponse)
def create_song(
    song: SongCreate,
    db: Session = Depends(get_db)
):

    new_song = models.Song(
        title=song.title,
        lyrics=song.lyrics
    )

    db.add(new_song)
    db.commit()
    db.refresh(new_song)

    return new_song
