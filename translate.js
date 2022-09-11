async function translate(text){
  let queryMM = `https://api.mymemory.translated.net/get?q=${text}&langpair=en|pt-br`
  await fetch(queryMM)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.responseData.translatedText)
      return data.responseData.translatedText
    })
    .catch((reason) => {
      
    })
}

export default translate