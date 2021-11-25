document.querySelector("#title").innerHTML = "Hello World!";
const strings = ["hello", "world", "this", "is", "nice"];

strings.forEach((s) => {
    const element = document.createElement("li");
    const text = document.createTextNode(s);
    element.appendChild(text);

    document.querySelector("#list").appendChild(element)
});
