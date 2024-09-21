let todoList = [];

// Retrieve data from local storage on page load
const storedTodoList = localStorage.getItem('todoList');
if (storedTodoList) {
    todoList = JSON.parse(storedTodoList);
}

displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value;
    let todoDate = dateElement.value;

    // Check if the due date is in the future
    const currentDate = new Date();
    const dueDate = new Date(todoDate);
    if (dueDate <= currentDate) {
        alert("Please enter a future due date.");
        return;
    }

    todoList.push({ item: todoItem, dueDate: todoDate });
    inputElement.value = '';
    dateElement.value = '';
    localStorage.setItem('todoList', JSON.stringify(todoList));
    displayItems();
}

function displayItems() {
    let containerElement = document.querySelector('.todo-container');
    let newHtml = '';
    for (let i = 0; i < todoList.length; i++) {
        let { item, dueDate } = todoList[i];
        newHtml += `
            <span>${item}</span>
            <span>${dueDate}</span>
            <button class='btn-delete' onclick="todoList.splice(${i}, 1); localStorage.setItem('todoList', JSON.stringify(todoList)); displayItems();">Delete</button>
        `;
    }
    newHtml += `<button class='btn-reset' onclick="resetTodoList();">Reset</button>`;
    containerElement.innerHTML = newHtml;
}

function resetTodoList() {
    todoList = [];
    localStorage.removeItem('todoList');
    displayItems();
}