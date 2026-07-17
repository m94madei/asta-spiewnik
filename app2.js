let allSongs = [];

async function loadSongs() {
    const container = document.getElementById("songs");

    try {
        const response = await fetch("/api/songs");

        if (!response.ok) {
            throw new Error("Błąd API");
        }

        const songs = await response.json();

        allSongs = songs;

	renderSongs(allSongs);

    } catch (error) {
        container.innerHTML =
            "<p>Nie udało się pobrać śpiewnika</p>";

        console.error(error);
    }
}

function toggleSong(button) {
    const lyrics = button.nextElementSibling;

    lyrics.classList.toggle("hidden");

    if (lyrics.classList.contains("hidden")) {
        button.innerText = "Pokaż tekst";
    } else {
        button.innerText = "Ukryj tekst";
    }
}

function renderSongs(songs) {
    const container = document.getElementById("songs");

    container.innerHTML = "";

    songs.forEach(song => {
        const article = document.createElement("article");

        article.className = "song";

        article.innerHTML = `
            <h2>${song.title}</h2>

            <button onclick="toggleSong(this)">
                Pokaż tekst
            </button>

            <pre class="lyrics hidden">${song.lyrics}</pre>
        `;

        container.appendChild(article);
    });
}

loadSongs();

const search = document.getElementById("search");
search.addEventListener("input", function () {
    const query = search.value.toLowerCase();

    const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(query) || song.lyrics.toLowerCase().includes(query)
    );

    renderSongs(filteredSongs);
});
