let todoItem = [];

function remenderTodo(todo) {
    localStorage.setItem("todoItem", JSON. stringify(todoItem));
    const list = document.querySelector(".js-todo-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        if (todoItem.length === 0) list.innerHTML = "";
        return;
    }

    const isChecked = todo.checked ? "done" : "";
    const listItemElement = document.createElement("li");
    listItemElement.setAttribute("class", `todo-item ${isChecked}`);
    listItemElement.setAttribute("data-key", todo.id);
    listItemElement.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.item}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    &times;
    </button>`;
    if (item) {
        list.replaceChild(listItemElement, item);
    } else {
        list.append(listItemElement);
    }
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    todoItem.push(todo);
    remenderTodo(todo);
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const input = document.querySelector(".js-todo-input");

const text = input.value.trim();
if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
}
});
function toggleDone(key) {
    const index = todoItem.findIndex((item) => item.id === Number(key));
    todoItem[index].checked = !todoItem[index].checked;
    remenderTodo(todoItem[index]);

}
function deleteTodo(key) {
    const index = todoItem.findIndex((item) => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItem[index],
    };
    todoItem = todoItem.filter((item) => item.id !== Number(key));
    remenderTodo(todo);
}


const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-tick")) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains("js-delete-todo")){
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ref = localStorage.getItem("todoItems");
    if (ref) {
        todoItems = JSON.parse(ref);
        todoItems.foreach((t)=>{
            remenderTodo(t);
        });
    }
});

