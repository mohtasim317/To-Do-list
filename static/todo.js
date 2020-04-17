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
    listItem.className = "list-item";
    removeButton.className = "remove-button";
    removeButton.innerText = "x";
    removeButton.addEventListener("click", (event) => {
      listItem.remove();
    });
    listItem.appendChild(removeButton);
    list.appendChild(listItem);
    text = "";
    textField.value = "";
  }
});
