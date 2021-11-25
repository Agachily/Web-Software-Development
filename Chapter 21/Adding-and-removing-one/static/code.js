// no code so far!
const incrementCount = () => {
    let count = Number(document.querySelector("#count").innerHTML);
    count = count + 1;
    document.querySelector("#count").innerHTML = `${count}`;
}

const decreaseCount = () => {
    let count = Number(document.querySelector("#count").innerHTML);
    count = count - 1;
    document.querySelector("#count").innerHTML = `${count}`;
}