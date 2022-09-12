async function translate(text){
  let queryMM = `https://api.mymemory.translated.net/get?q=${text.slice(0, 499)}&langpair=en|pt-br`
  const resp = await fetch(queryMM)
  const data = await resp.json()

  if (data.responseStatus != 429) {
    return data.responseData.translatedText
  } else {
    return text
  }
}

export default translate