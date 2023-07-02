const list = document.getElementById("list");
const addBtn = document.querySelector(".field button");
const form = document.querySelector(".field");
const inputBox = document.getElementById("inputBox");
const todoApp = document.querySelector(".todo-app");
const logo = document.querySelector(".logo");
// const del = document.querySelector(".del");

const output = document.createElement("div");
output.classList.add("alert");
const outputText = document.createElement("p");
output.appendChild(outputText);

form.addEventListener("submit", addTodo);
// del.addEventListener("click", deleteTodo());

//function to toggle buttons
function ToggleBtn() {
  list.addEventListener("click", (event) => {
    const targetElement = event.target;

    if (targetElement.matches("li svg") || targetElement.matches("li span")) {
      const listItem = targetElement.closest("li");
      const svg = listItem.querySelector("svg");
      const replacementSVG = `<svg class="ticked" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"></path></svg>`;
      const originalSVG = `<svg class="circle" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"></path></svg>`;

      //toggling items if they contain certain classnames
      if (svg.classList.contains("circle")) {
        //make strikethrough line when ticked
        listItem.lastElementChild.previousElementSibling.style.textDecoration =
          "line-through";
        svg.outerHTML = replacementSVG;
      } else if (svg.classList.contains("ticked")) {
        //remove strikethrough line when ticked
        listItem.lastElementChild.previousElementSibling.style.textDecoration =
          "";
        svg.outerHTML = originalSVG;
      }
      saveTodo();
    }
  });
}

//function to load message into output content
function loadMessage(message) {
  outputText.textContent = `${message}`;
  todoApp.insertBefore(output, form);
}

function addTodo(e) {
  e.preventDefault();
  let todoItem = inputBox.value;

  if (inputBox.value === "") {
    let outputMessage = "Enter Something!";
    loadMessage(outputMessage); //calling loadMessage function
    setTimeout(() => {
      todoApp.removeChild(output);
    }, 2500);
  } else {
    let li = document.createElement("li");
    li.innerHTML = `
      <svg class="circle" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"></path></svg>
      <span>${inputBox.value}</span>
      <svg class="del" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z"></path><path d="M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z"></path><path d="M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z"></path></svg>
    `;
    list.appendChild(li);

    ToggleBtn();
    setupEventListeners(); // Add this line to set up event listeners for newly added items
  }
  form.reset();
  saveTodo(); //Saving all todo items to ls inlcuuding new entry.
}

//for when we use del btn
list.addEventListener("click", function (e) {
  if (e.target.matches(".del")) {
    e.target.parentElement.remove();
    saveTodo();
  }
});

function saveTodo() {
  localStorage.setItem("todos", list.innerHTML);
}

function showTodos() {
  list.innerHTML = localStorage.getItem("todos");
}

function setupEventListeners() {
  // Add event listeners for deleting a todo item and toggling the strikethrough effect
  list.addEventListener("click", function (e) {
    if (e.target.matches(".del")) {
      e.target.parentElement.remove();
      saveTodo();
    } else if (e.target.matches("li svg") || e.target.matches("li span")) {
      const listItem = e.target.closest("li");
      const svg = listItem.querySelector("svg");
      const replacementSVG = `<svg class="ticked" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"></path></svg>`;
      const originalSVG = `<svg class="circle" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"></path></svg>`;

      if (svg.classList.contains("circle")) {
        listItem.lastElementChild.previousElementSibling.style.textDecoration =
          "line-through";
        svg.outerHTML = replacementSVG;
      } else if (svg.classList.contains("ticked")) {
        listItem.lastElementChild.previousElementSibling.style.textDecoration =
          "";
        svg.outerHTML = originalSVG;
      }

      saveTodo();
    }
  });
}

setupEventListeners(); // Call the function to set up event listeners initially
showTodos();
