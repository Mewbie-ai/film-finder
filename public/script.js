const tmdbKey = "05dd11d19f28344e864c39000bfb940c";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  let genreRequestEndpoint = "/genre/movie/list";
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch, { type: "GET" });
    if (response.ok) {
      let jsonResponse = await response.json();
      let genres = jsonResponse.genres;
      return genres;
    }
  } catch (err) {
    console.log(err);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  let discoverMovieEndpoint = "/discover/movie";
  let page = Math.random() * 1000;
  let requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&include_adult=true&page=${page}`;
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  console.log(urlToFetch);
  try {
    let response = await fetch(urlToFetch, { type: "GET" });
    if (response.ok) {
      let jsonResponse = await response.json();
      let movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch (err) {
    console.log(err);
  }
};

const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  let movieEndpoint = `/movie/${movieId}`;
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch, { type: "GET" });
    if (response.ok) {
      let movieInfo = await response.json();
      console.log(movieInfo);
      return movieInfo;
    }
  } catch (err) {
    console.log(err);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  let movies = await getMovies();
  let randomMovie = await getRandomMovie(movies);
  let info = await getMovieInfo(randomMovie);
  displayMovie(info);
};
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
