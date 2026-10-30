let defaultMovies = [
{title:"Avengers Endgame",genre:"Action",year:"2019",rating:"9",status:"Watched",image:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"},
{title:"Black Panther",genre:"Action",year:"2018",rating:"8",status:"Watched",image:"https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMot9rwxF4.jpg"},
{title:"Spider-Man",genre:"Action",year:"2021",rating:"9",status:"Watched",image:"https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"},
{title:"Lion King",genre:"Animation",year:"2019",rating:"7",status:"To Watch",image:"https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg"},
{title:"Inception",genre:"Sci-Fi",year:"2010",rating:"9",status:"Watched",image:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"},
{title:"Interstellar",genre:"Sci-Fi",year:"2014",rating:"10",status:"Watched",image:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"},
{title:"Joker",genre:"Drama",year:"2019",rating:"8",status:"To Watch",image:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"},
{title:"Avatar",genre:"Sci-Fi",year:"2009",rating:"8",status:"To Watch",image:"https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg"},
{title:"Titanic",genre:"Romance",year:"1997",rating:"9",status:"Watched",image:"https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"}
];
let movies = JSON.parse(localStorage.getItem("movies")) || defaultMovies;
if(!localStorage.getItem("movies")) localStorage.setItem("movies",JSON.stringify(movies));

document.getElementById("movieForm").addEventListener("submit",function(e){
e.preventDefault();
movies.push({title:document.getElementById("title").value,genre:document.getElementById("genre").value,year:document.getElementById("year").value,rating:document.getElementById("rating").value,status:document.getElementById("status").value,image:document.getElementById("image").value || "https://via.placeholder.com/200x300?text=No+Image"});
localStorage.setItem("movies",JSON.stringify(movies)); displayMovies(); this.reset();
});
function displayMovies(){
let list=document.getElementById("movieList");
let search=document.getElementById("search").value.toLowerCase();
let filter=document.getElementById("filter").value;
list.innerHTML="";
movies.filter(m=>m.title.toLowerCase().includes(search)&&(filter==="All"||m.status===filter)).forEach((m,i)=>{
list.innerHTML+=`<div class="card"><img src="${m.image}"><div class="card-info"><h3>${m.title}</h3><p>${m.year} | ${m.genre} | ⭐${m.rating}/10</p><p>${m.status}</p><button onclick="deleteMovie(${i})">Delete</button></div></div>`;
});
document.getElementById("total").textContent=movies.length;
document.getElementById("watchedCount").textContent=movies.filter(m=>m.status==="Watched").length;
let avg=movies.reduce((s,m)=>s+Number(m.rating),0)/movies.length;
document.getElementById("avgRating").textContent=avg.toFixed(1);
}
function deleteMovie(i){movies.splice(i,1);localStorage.setItem("movies",JSON.stringify(movies));displayMovies();}
document.getElementById("search").addEventListener("input",displayMovies);
document.getElementById("filter").addEventListener("change",displayMovies);
displayMovies();