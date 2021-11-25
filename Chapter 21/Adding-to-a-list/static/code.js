// no code so far!
const addToList = () => {
    let value = document.querySelector("#text").value

    const element = document.createElement("li");
    const text = document.createTextNode(value);
    element.appendChild(text);
  
    document.querySelector("#list").appendChild(element);

    document.querySelector("#text").value = ""
};
