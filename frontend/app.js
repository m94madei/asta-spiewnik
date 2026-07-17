let allSongs = [];

function renderSongs(songs) {
    const container = document.getElementById("songs");

    container.innerHTML = "";

    if (songs.length === 0) {
        container.innerHTML = "<p>Nie znaleziono piosenek.</p>";
        return;
    }

    songs.forEach(song => {
        const article = document.createElement("article");

        article.className = "song";

        const videoButton = song.video_url
            ? `
                <button onclick="toggleVideo(this)">
                    ▶ Pokaż film
                </button>
            `
            : "";

        const videoPlayer = song.video_url
            ? `
                <div class="video-container hidden">
                    <video controls preload="metadata" class="song-video">
                        <source src="${song.video_url}" type="video/mp4">
                        Twoja przeglądarka nie obsługuje filmu.
                    </video>
                </div>
            `
            : "";

        article.innerHTML = `
            <h2>${song.title}</h2>

            <div class="song-actions">
                <button onclick="toggleSong(this)">
                    Pokaż tekst
                </button>

                ${videoButton}
            </div>

            <pre class="lyrics hidden">${song.lyrics}</pre>

            ${videoPlayer}
        `;

        container.appendChild(article);
    });
}

async function loadSongs() {
    const container = document.getElementById("songs");

    try {
        const response = await fetch("/api/songs");

        if (!response.ok) {
            throw new Error("Błąd API");
        }

        allSongs = await response.json();

        renderSongs(allSongs);
    } catch (error) {
        container.innerHTML =
            "<p>Nie udało się pobrać śpiewnika.</p>";

        console.error(error);
    }
}

function toggleSong(button) {
    const article = button.closest(".song");
    const lyrics = article.querySelector(".lyrics");

    lyrics.classList.toggle("hidden");

    button.innerText = lyrics.classList.contains("hidden")
        ? "Pokaż tekst"
        : "Ukryj tekst";
}

function toggleVideo(button) {
    const article = button.closest(".song");
    const videoContainer = article.querySelector(".video-container");
    const video = videoContainer.querySelector("video");

    videoContainer.classList.toggle("hidden");

    if (videoContainer.classList.contains("hidden")) {
        button.innerText = "▶ Pokaż film";
        video.pause();
    } else {
        button.innerText = "▼ Ukryj film";
    }
}

const search = document.getElementById("search");

search.addEventListener("input", function () {
    const query = search.value.toLowerCase().trim();

    const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.lyrics.toLowerCase().includes(query)
    );

    renderSongs(filteredSongs);
});

loadSongs();
