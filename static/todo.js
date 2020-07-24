const textField = document.querySelector(".input-field");
const list = document.querySelector(".main-list");
const button = document.querySelector(".button");
let text = "";

fetch("http://localhost:1738/posts/")
  .then((res) => res.json())
  .then((res) =>
    res.map((object) => {
      const listItem = document.createElement("li");
      const removeButton = document.createElement("button");
      if (object.item !== "") {
        listItem.innerText = object.item;
        listItem.className = "list-item";
        removeButton.className = "remove-button";
        removeButton.innerText = "x";
        removeButton.addEventListener("click", (event) => {
          listItem.remove();
        });
        listItem.appendChild(removeButton);
        list.appendChild(listItem);
      }
    })
  );

textField.addEventListener("input", (event) => {
  if (textField.value !== null) text = textField.value;
});

function adding(event) {
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
    fetch("http://localhost:1738/posts", {
      method: "POST",
      body: JSON.stringify({ item: "hello" }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    text = "";
    textField.value = "";
  }
}

button.addEventListener("click", adding);
