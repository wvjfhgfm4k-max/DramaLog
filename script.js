const modal = document.getElementById("seriesModal");
const newBtn = document.getElementById("newSeriesBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const container = document.getElementById("seriesContainer");
const searchInput = document.getElementById("searchInput");

let series = JSON.parse(localStorage.getItem("dramalog") || "[]");

newBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

saveBtn.addEventListener("click", () => {

    const serie = {
        title: document.getElementById("title").value,
        country: document.getElementById("country").value,
        streaming: document.getElementById("streaming").value,
        rating: document.getElementById("rating").value,
        status: document.getElementById("status").value,
        episodes: document.getElementById("episodes").value,
        watched: document.getElementById("watchedEpisodes").value,
        favorite: document.getElementById("favorite").checked,
        notes: document.getElementById("notes").value
    };

    if (serie.title.trim() === "") {
        alert("Bitte einen Titel eingeben.");
        return;
    }

    series.push(serie);

    localStorage.setItem("dramalog", JSON.stringify(series));

    modal.classList.add("hidden");

    document.getElementById("title").value = "";
    document.getElementById("streaming").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("episodes").value = "";
    document.getElementById("watchedEpisodes").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("favorite").checked = false;

    renderSeries();
});

searchInput.addEventListener("input", renderSeries);

function renderSeries() {

    const search = searchInput.value.toLowerCase();

    const filtered = series.filter(s =>
        s.title.toLowerCase().includes(search)
    );

    document.getElementById("totalSeries").textContent = series.length;
    document.getElementById("watchingSeries").textContent =
        series.filter(s => s.status === "Schaue ich gerade").length;

    document.getElementById("finishedSeries").textContent =
        series.filter(s => s.status === "Abgeschlossen").length;

    document.getElementById("favoriteSeries").textContent =
        series.filter(s => s.favorite).length;

    if (filtered.length === 0) {

        container.innerHTML = `
        <div class="emptyState">
            <h2>Keine Serien gefunden</h2>
        </div>
        `;

        return;
    }

    container.innerHTML = "";

    filtered.forEach((serie, index) => {

        const card = document.createElement("div");

        card.className = "seriesCard";

        card.innerHTML = `
            <h2>${serie.title}</h2>

            <p><strong>Land:</strong> ${serie.country}</p>

            <p><strong>Streaming:</strong> ${serie.streaming}</p>

            <p><strong>Status:</strong> ${serie.status}</p>

            <p><strong>Bewertung:</strong> ⭐ ${serie.rating}</p>

            <p><strong>Folgen:</strong> ${serie.watched}/${serie.episodes}</p>

            <p>${serie.favorite ? "❤️ Favorit" : ""}</p>

            <button onclick="deleteSeries(${index})">
                🗑 Löschen
            </button>
        `;

        container.appendChild(card);

    });

}

function deleteSeries(index) {

    if (!confirm("Serie wirklich löschen?"))
        return;

    series.splice(index, 1);

    localStorage.setItem("dramalog", JSON.stringify(series));

    renderSeries();

}

renderSeries();