const retrieveContentFromApi = async () => {
  const response = await fetch("/api/magic");
  const json = await response.json();
  const magic = json.magic

  const element = document.createElement("p");
  const text = document.createTextNode(magic);
  element.appendChild(text);

  document.querySelector("#magic").appendChild(element)
};
