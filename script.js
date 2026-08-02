const $=i=>document.getElementById(i);let a=JSON.parse(localStorage.getItem('dramalog')||'[]');function r(){const q=$('searchInput').value.toLowerCase();$('totalSeries').textContent=a.length;$('seriesContainer').innerHTML=a.filter(x=>x.title.toLowerCase().includes(q)).map((s,i)=>`<div class='card'><h3>${s.title}</h3><p>${s.country}</p><p>${s.streaming}</p><p>${s.status}</p><button onclick='d(${i})'>Löschen</button></div>`).join('')}function s(){a.push({title:$('title').value,country:$('country').value,streaming:$('streaming').value,status:$('status').value,rating:$('rating').value});localStorage.setItem('dramalog',JSON.stringify(a));$('seriesModal').classList.add('hidden');r()}function d(i){a.splice(i,1);localStorage.setItem('dramalog',JSON.stringify(a));r()}window.d=d;$('newSeriesBtn').onclick=()=>$('seriesModal').classList.remove('hidden');$('cancelBtn').onclick=()=>$('seriesModal').classList.add('hidden');$('saveBtn').onclick=s;$('searchInput').oninput=r;r();
... letzter vorhandener Code ...

// Hier kommt der neue Code hin
document.getElementById("newSeriesBtn").addEventListener("click", function () {
    const titel = prompt("Titel der Serie:");

    if (!titel) return;

    const container = document.getElementById("seriesContainer");

    const karte = document.createElement("div");
    karte.className = "serie";

    karte.innerHTML = `
        <h3>${titel}</h3>
        <p>Status: Geplant</p>
    `;

    container.appendChild(karte);

    document.getElementById("totalSeries").textContent =
        container.children.length;
});