(function () {

const favContainer=document.getElementById("fav-movies-container");


// Add to favourite list
function favMovies() {
    favContainer.innerHTML ="";
    // let favMovieArray = [];

    let favList = JSON.parse(localStorage.getItem("favMoviesList"));
    if (favList) {
      favList.forEach((movie) => {
        const favCard = document.createElement("div");
        favCard.classList.add(
          "fav-movie-card",
          "d-flex",
          "justify-content-between",
          "align-content-center",
          "my-2"
        );
        favCard.innerHTML = `
   
      <img
      src="${movie.Poster}"
      alt=""
      class="fav-movie-poster"
      />
     <div class="movie-card-details">
      <p class="movie-name mt-3 mb-0">
       <a href = "index.html" class="fav-movie-name" data-id="${movie.Title}">${movie.Title}</a> 
      </p>
      <small class="text-muted">${movie.Year}</small>
     </div>

     <div class="delete-btn">
        <i class="fa-solid fa-trash-can" data-id="${movie.Title}"></i>
     </div>
    
    `;
    favContainer.prepend(favCard);

      });
    }
  }

  // Delete from favourite list
  function deleteMovie(name) {
    let favList = JSON.parse(localStorage.getItem("favMoviesList"));
    let updatedList = Array.from(favList).filter((movie) => {
      return movie.Title != name;
    });

    localStorage.setItem("favMoviesList", JSON.stringify(updatedList));

    favMovies();
  }

  // Handles click events
  async function handleClickListner(e) {
    const target = e.target;
    
    if (target.classList.contains("fa-trash-can")) {
      deleteMovie(target.dataset.id);
    } 
}

// Event listner on whole document
favContainer.addEventListener("click", handleClickListner);

favMovies();

})();
