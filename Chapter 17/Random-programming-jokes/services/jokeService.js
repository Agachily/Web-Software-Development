const fetchRandomJoke = async () => {
  const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random", {
    method: "GET",
  })
  const content = await response.text()
  const obj = JSON.parse(content)
  return obj
}
export { fetchRandomJoke };
