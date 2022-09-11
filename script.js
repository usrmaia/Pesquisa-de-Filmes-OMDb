import callAPI from "./callAPI.js";
import translate from "./translate.js"

const form = document.getElementById("form")
const title = document.getElementById("ftitle")
const year = document.getElementById("fyear")
const details = document.querySelector("#details")
const poster = document.querySelector("#poster")
const plot = document.querySelector("#plot")

form.addEventListener("submit", (ev) => {
  ev.preventDefault() // Cancela recarregamento do form
  checkInputs()
  SearchMovie()
})

function checkInputs(){
  if (!title.value) {
    setErrorFor(title, "Informe um título válido!")
  } else {
    setSucessFor(title)
  }

  if (year.value && (year.value >= 1890 || year.value <= 2022)) {
    setSucessFor(year)
  } else if (year.value && (year.value < 1890 || year.value > 2022)) {
    setErrorFor(year, "Informe um ano válido!")
  }
}

function setSucessFor(input){
  const formControl = input.parentElement

  formControl.className = "form_control sucess"
}

function setErrorFor(input, message){
  const formControl = input.parentElement
  const small = formControl.querySelector("small")

  formControl.className = "form_control error"
  small.innerHTML(message)
}

async function SearchMovie(){
  const titleValue = title.value
  const yearValue = year.value
  const filmRequisition = await callAPI(titleValue, yearValue)

  ShowInHTML(filmRequisition)
}

function ShowInHTML(filmRequisition){
  if(filmRequisition.response){
    poster.innerHTML = `
      <img src=${filmRequisition.poster} id="poster">
    `
    details.innerHTML = `
    <h2>${filmRequisition.title}</h2>
    <h3><strong>Lançamento: </strong> ${filmRequisition.released}</h3>
    <h3><strong>Duração: </strong>${filmRequisition.runtime}</h3>
    <h3><strong>Gênero: </strong>${filmRequisition.genre}</h3>
    <h3><strong>Diretor: </strong>${filmRequisition.director}</h3>
    <h3><strong>Escritor: </strong>${filmRequisition.writer}</h3>
    <h3><strong>Atores: </strong>${filmRequisition.actors}</h3>
    <h3><strong>Notas: </strong></h3>
    <h4><strong>Internet Movie Database: <strong>${filmRequisition.imdb}</h4>
    <h4><strong>Rotten Tomatoes: <strong>${filmRequisition.rotten_tomatoes}</h4>
    <h4><strong>Metacritic: <strong>${filmRequisition.metacritic}</h4>
    `
    plot.innerHTML = `
    <h3><strong>Sinops: </strong></h3>
      <p>${filmRequisition.plot}</p>
    `
  } else {
    details.innerHTML = `<h2>${filmRequisition.error}<h2>`
  }
}

/*
const translateText = translate(filmRequisition.plot.slice(0, 499))
translateText = translateText.responseData.translatedText
console.log("aaaa " + translateText)
*/