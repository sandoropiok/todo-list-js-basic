let main = document.querySelector("main");
let form = document.querySelector("form");
let input = document.querySelector("input");
let div = document.querySelector(`div`);
let section = document.querySelector("section");
let todoHeader = document.querySelector(`h2`);

let checkedSection = document.createElement("section");
checkedSection.classList.add("checked-section");
main.appendChild(checkedSection);

let errorMessage = document.createElement("p");
errorMessage.textContent = "Please enter your text 🗒";
errorMessage.style.cssText = `
  background: rgba(0, 0, 0, 0.5);
  padding: 0px 175px;
  margin: 30px auto;
  color: red;
  font-size: 1.4rem;
  text-transform: uppercase;
  display: none;
  margin-top: 10px;
  text-align: center;
`;
div.appendChild(errorMessage);

section.style.display = "none";
todoHeader.style.display = "none";
checkedSection.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = input.value.trim();
  if (inputText === "") {
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";
  createTodoItem(inputText);
  input.value = "";
});

function createTodoItem(text) {
  section.style.display = "block";

  let paragraph = document.createElement("p");
  paragraph.className = "todo-item";

  let spanText = document.createElement("span");
  spanText.innerText = text;

  let iconEdit = document.createElement("span");
  iconEdit.innerHTML = `<i class="fa fa-edit"></i>`;
  iconEdit.className = "icon-edit";

  let iconCheck = document.createElement("span");
  iconCheck.innerHTML = `<i class="fa fa-check"></i>`;
  iconCheck.className = "icon-check";

  let iconDelete = document.createElement("span");
  iconDelete.innerHTML = `<i class="fa fa-trash"></i>`;
  iconDelete.className = "icon-delete";

  let spanIcons = document.createElement("span");
  spanIcons.append(iconEdit, iconCheck, iconDelete);

  paragraph.append(spanText);
  paragraph.append(spanIcons);
  section.appendChild(paragraph);

  iconEdit.addEventListener("click", () => {
    editTodoItem(spanText, iconEdit);
  });

  iconCheck.addEventListener("click", () => {
    moveToChecked(paragraph);
  });

  iconDelete.addEventListener("click", () => {
    paragraph.remove();
    checkEmptySections();
  });
}

function moveToChecked(todoItem) {
  todoItem.classList.add("completed");
  checkedSection.appendChild(todoItem);
  todoHeader.style.display = "block";
  checkedSection.style.display = "block";

  checkEmptySections();
}
function checkEmptySections() {
  if (section.children.length === 0) {
    section.style.display = "none";
  }
  if (checkedSection.children.length === 0) {
    todoHeader.style.display = "none";
    checkedSection.style.display = "none";
  }
}

function editTodoItem(spanText, iconEdit) {
  // Create an input field and set its value to the current to-do text
  let editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = spanText.innerText;
  editInput.className = "edit-input";

  // Replace the span with the input field
  spanText.replaceWith(editInput);

  // Change the edit icon to a save icon
  iconEdit.innerHTML = `<i class="fa fa-save"></i>`;

  // Save the edited text when the save icon is clicked
  iconEdit.onclick = () => {
    spanText.innerText = editInput.value; // Update the to-do text
    editInput.replaceWith(spanText); // Replace input field with updated span
    iconEdit.innerHTML = `<i class="fa fa-edit"></i>`; // Change icon back to edit
    iconEdit.onclick = () => editTodoItem(spanText, iconEdit); // Re-enable editing
  };
}
