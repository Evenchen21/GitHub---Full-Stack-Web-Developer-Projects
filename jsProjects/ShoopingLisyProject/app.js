document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const button = document.getElementById("myButton");
  const itemList = document.getElementById("itemList");

  button.addEventListener("click", () => {
    let textValue = textInput.value;
    itemList.innerHTML += `<li class='list-group-item'>${textValue}</li> <button class="removeButton" id="removeButton"></button>
 `;
    textInput.value = "";
  });
});
localStorage.setItem("textInput", textInput.value);

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("removeButton")) {
    const listItem = event.target.parentElement;
    listItem.remove();
  }
});
