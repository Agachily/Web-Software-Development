const incrementCount = () => {
  let count = document.querySelector("#count").innerHTML;
  count = Number(count) + 1;
  document.querySelector("#count").innerHTML = count;
};
