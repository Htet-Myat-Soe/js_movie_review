// Menu Toggle

// document.querySelector("#menu-toggle").addEventListener("click",() =>{
//         document.querySelector("#nav-menu").classList.toggle("nav-active");
// });

window.addEventListener("scroll",() => {
    if(window.scrollY > 500){
        document.querySelector("header").style.backgroundColor = "#f4f4f4";
        document.querySelector(".scroll-top").style.bottom = "20px";
    }
    else{
        document.querySelector("header").style.backgroundColor = "#ffd900";
        document.querySelector(".scroll-top").style.bottom = "-100px";

    }
});

document.querySelector(".scroll-top").addEventListener("click",() =>{
    window.scroll(
        {
            top: 100,
            left: 100,
            behavior: 'smooth'
          }
    );
})

// Setting Toggle

document.querySelector("#setting-toggle").addEventListener("click",() =>{
    document.querySelector(".setting-box").classList.toggle("setting-box-active");
});

let images = Array.from(document.querySelectorAll(".setting-box img"));

images.map((image) =>{
    image.addEventListener("click",() =>{
        images.forEach((img) =>{
            img.style.opacity = "1";
        });
        document.querySelector(".landing-image").src = image.src;
        image.style.opacity = "0.5";
    });
});


// Fetch Movie

const url = {
    apiKey : "api_key=f1b0dc700c5788eb3c6ff31f30981996",
    baseUrl : "https://api.themoviedb.org/3/discover/movie?"
}

const imgUrl = "https://image.tmdb.org/t/p/w500/";

const popularUrl = url.baseUrl+"sort_by=popularity.desc&"+url.apiKey;

const searchUrl = "https://api.themoviedb.org/3/search/movie?"+url.apiKey;

function fetchMovie(path){

    fetch(path)
    .then(res => res.json())
    .then(data => showMovie(data))
}

fetchMovie(popularUrl);


function showMovie(data){
    let res = data.results;
    
    document.querySelector(".movie-container").innerHTML = '';

    res.forEach(movie => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
                <div class="img-box">
                    <img src="${imgUrl+movie.poster_path}" alt="">
                </div>
                <div class="details">
                    <h3>${movie.original_title}</h3>
                    <span>${movie.vote_average.toFixed(1)}</span>
                </div>
                <div class="overview">
                    <h5>Overview</h5>
                    <p>
                        ${movie.overview}
                    </p>
                    <p>
                        Released at  <strong>${movie.release_date}</strong>
                    </p>

                </div>

        `;

        document.querySelector(".movie-container").appendChild(div);
    })
}

// Search Movie


document.querySelector("#search").addEventListener("keypress",(e) => {
    if(e.keyCode === 13){
        let val = e.target.value;

        if(val){
            fetchMovie(searchUrl+"&query="+val);
        }
        else{
            fetchMovie(popularUrl);
        }
    }
})

// load

window.addEventListener("load",() => {
    document.querySelector(".loader").style.display = "none";
})