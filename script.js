const key='dramalog';
let data=JSON.parse(localStorage.getItem(key)||'[]');
function save(){localStorage.setItem(key,JSON.stringify(data));render();}
function addSeries(){
 const t=title.value.trim(); if(!t){alert('Titel fehlt');return;}
 data.push({title:t,service:service.value,rating:rating.value});
 title.value='';service.value='';rating.value='';
 save();
}
function del(i){data.splice(i,1);save();}
function render(){
 const q=search.value.toLowerCase();
 list.innerHTML='';
 data.filter(s=>s.title.toLowerCase().includes(q)).forEach((s,i)=>{
  const g='https://www.google.com/search?q='+encodeURIComponent(s.title+' korean drama');
  list.innerHTML+=`<div class="item"><b>${s.title}</b><br>⭐ ${s.rating||'-'}/10<br>📺 ${s.service||'-'}<br><a target="_blank" href="${g}">Google</a><br><button onclick="del(${i})">Löschen</button></div>`;
 });
}
render();