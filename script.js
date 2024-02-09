
(function () {
    const searchInput = document.getElementById("search");
    const suggestionsContainer = document.getElementById("card-container");
    const addToFav = document.getElementById('fav-btn')
  
    let suggestionList = [];

    searchInput.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          event.preventDefault();
        }
      });

        // Event listner on search
  searchInput.addEventListener("keyup", function () {
    let search = searchInput.value;
    if (search === "") {
      suggestionsContainer.innerHTML = "";
      // clears the previous movies from array
      suggestionList = [];
    } else {
      (async () => {
        let data = await fetchMovies(search);
        showSuggestions(data);
      })();

      suggestionsContainer.style.display = "grid";
    }
  });

  async function fetchID(search) {
    const url = `https://www.omdbapi.com/?i=${search}&apikey=b76c20da`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

   // Fetches data from api and calls function to add it in
   async function fetchMovies(search) {
    const url = `https://www.omdbapi.com/?t=${search}&apikey=b76c20da`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

   // Shows in suggestions
   function showSuggestions(data) {
    
    let isPresent = false;

    // to check if the movie is already present in the suggestionList array
    suggestionList.forEach((movie) => {
      if (movie.Title == data.Title) {
        isPresent = true;
      }
    });

    if (!isPresent && data.Title != undefined) {
      if (data.Poster == "N/A") {
        data.Poster = "./images/not-found.png";
      }
      suggestionList.push(data);
      const movieCard = document.createElement("div");
      // movieCard.setAttribute("class", "text-decoration");

      movieCard.innerHTML = `
        <div class="card my-2" data-id = " ${data.imdbID} ">
          <a href="movie.html" >
            <img
            src="${data.Poster} "
            class="card-img-top"
            alt="..."
            height="350px"
            data-id = "${data.imdbID} "
            />
          </a>
          <div class="card-body text-star
            <h5 class="card-title" >
              <a href="movie.html" data-id = "${data.imdbID} "> ${data.Title}  </a>
            </h5>

            <p class="card-text">
              <i class="fa-solid fa-star">
                <span id="rating">&nbsp;${data.imdbRating}</span>
              </i>

              <button id="fav-btn" class="fav-btn">
                <i class="fa-solid fa-heart add-fav" data-id="${data.imdbID}"></i>
              </button>
            </p>
          </div>
      </div>
    `;
      suggestionsContainer.prepend(movieCard);
    }
  }

  let favMovieArray = [];

   // Add to favourite of localStorage
   async function handleFavBtn(e) {
    const target = e.target;

    let data = await fetchID(target.dataset.id);

    let favMoviesLocal = localStorage.getItem("favMoviesList");

    if (favMoviesLocal) {
      favMovieArray = Array.from(JSON.parse(favMoviesLocal));
    } else {
      localStorage.setItem("favMoviesList", JSON.stringify(data));
    }

    // to check if movie is already present in the fav list
    let isPresent = false;
    favMovieArray.forEach((movie) => {
      if (data.imdbID == movie.imdbID) {
        notify("already added to fav list");
        isPresent = true;
      }
    });

    if (!isPresent) {
      favMovieArray.push(data);
    }

    localStorage.setItem("favMoviesList", JSON.stringify(favMovieArray));
    isPresent = !isPresent;
   
  }

  // To notify
  function notify(text) {
    window.alert(text);
  }

  

   // Handles click events
   async function handleClickListner(e) {
    const target = e.target;

    if (target.classList.contains("add-fav")) {
      e.preventDefault();
      handleFavBtn(e);
    }
  
    localStorage.setItem("movieID", target.dataset.id);
  }

  // Event listner on whole document
  document.addEventListener("click", handleClickListner);
})();