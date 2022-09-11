import { APIkey } from "./APIkey.js";

async function callAPI(title, year){
  let queryOMDB = `https://www.omdbapi.com/?apikey=${APIkey}&t=${title}&plot=full`

  if (year) {
    queryOMDB += `&y=${year}`
  }

  // REMOVE
  //console.log("minha query para a api " + queryOMDB)

  const resp = await fetch(queryOMDB)
  const data = await resp.json()

  return formatData(data)
}

function formatData(data){
  if (data.Response) {
    const movieData = {
      title: data.Title,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      plot: data.Plot,
      poster: data.Poster,
      ratings: data.Ratings,
      imdb: data.Ratings[0].Value,
      rotten_tomatoes: data.Ratings[1].Value,
      metacritic: data.Ratings[2].Value,
      response: true,
      error: ""
    }

    return movieData;
  } else {
    const fetchData = {
      response: false,
      error: data.error
    }

    return fetchData
  }
}
export default callAPI
