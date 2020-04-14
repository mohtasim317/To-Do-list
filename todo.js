const textField = document.querySelector(".input-field");
const list = document.querySelector(".main-list");
const button = document.querySelector(".button");
let text = "";

textField.addEventListener("input", (event) => {
  if (textField.value !== null) text = textField.value;
});

button.addEventListener("click", (event) => {
  const listItem = document.createElement("li");
  const removeButton = document.createElement("button");
  if (text !== "") {
    listItem.innerText = text;
    removeButton.innerText = "X";
    listItem.appendChild(removeButton);
    list.appendChild(listItem);
    text = "";
  }
});
