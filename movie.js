
(function () {
  const imdbID = document.getElementById("imdbID")
  imdbID.innerHTML = localStorage.getItem("movieID");
  const title = document.getElementById("title");
  const year = document.getElementById("year");
  const runtime = document.getElementById("runtime");
  const rating = document.getElementById("rating");
  const poster = document.getElementById("poster");
  const plot = document.getElementById("plot");
  const directorsName = document.getElementById("director-names");
  const castName = document.getElementById("cast-names");
  const genre = document.getElementById("genre");

  fetchMovieData(imdbID.innerHTML);


  // Function to fetch movie data from OMDB API based on IMDb ID
async function fetchMovieData(search) {

  const apiKey = 'b76c20da'; //  API key
  const url = `https://www.omdbapi.com/?i=${search}&apikey=${apiKey}`; //omdb used imdbID in the i parameter of the omdb url

    try {
      const response = await fetch(url);
      const data = await response.json();
        
      title.innerHTML=data.Title;
      year.innerHTML = data.Year;
      runtime.innerHTML = data.Runtime;
      rating.innerHTML = `${data.imdbRating}/10`;
      poster.setAttribute("src", `${data.Poster}`);
      plot.innerHTML = data.Plot;
      directorsName.innerHTML = data.Director;
      castName.innerHTML = data.Actors;
      genre.innerHTML = data.Genre;
  
    } catch (error) {
      console.log('Error fetching movie data:', error.message);
      // return null;
    }
  }
  
})();