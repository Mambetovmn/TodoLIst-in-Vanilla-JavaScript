//Selectors
const $todoInput = document.querySelector('.todo--input')
const $todoButton = document.querySelector('.todo--button')
const $todoList = document.querySelector('.todo--list')
const $filterOption = document.querySelector('.filter-todo')
// Listener
document.addEventListener('DOMContentLoaded', getTodos)
$todoButton.addEventListener('click', addTodo)
$todoList.addEventListener('click', deleteCheck)
$filterOption.addEventListener('click', filterTodo)
// Functions
function addTodo(event) {
  event.preventDefault()

  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  const newTodo = document.createElement('li')
  newTodo.textContent = $todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)
  // Add to localeStorrage
  saveToLocaleStorrage($todoInput.value)

  const completeButton = document.createElement('button')
  completeButton.innerHTML = '<i class="fas fa-check"></i>'
  completeButton.classList.add('complete-btn')
  todoDiv.appendChild(completeButton)

  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)

  // Append List
  $todoList.appendChild(todoDiv)

  // Clear input Value
  $todoInput.value = ''
}

function deleteCheck(e) {
  const item = e.target
  if (item.classList[0] === 'trash-btn'){
    const todo = item.parentElement
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement
    todo.classList.toggle('complited')
  }
}

function filterTodo(e) {
 const todos = $todoList.childNodes
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'complited':
        if (todo.classList.contains('complited')){
          todo.style.display = 'flex'
        }else{
          todo.style.display = 'none'
        }
        break
      case 'uncomplited':
        if (!todo.classList.contains('complited')){
          todo.style.display = 'flex'
        }else{
          todo.style.display = 'none'
        }
        break
    }
  })
}

function saveToLocaleStorrage(todo){
  let todos
  if (localStorage.getItem('todos') === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos() {
  let todos
  if (localStorage.getItem('todos') === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo = document.createElement('li')
    newTodo.textContent = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')
    todoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // Append List
    $todoList.appendChild(todoDiv)
  })
}


function removeLocalTodos(todo) {
  let todos
  if (localStorage.getItem('todos') === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}