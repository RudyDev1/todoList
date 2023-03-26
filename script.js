let todoInput // miejsce gdzie użytownik dodaje treść
let errorInfo
let addBtn
let ulList // lista zadań
let newTodo //nowy task, nowe li

let popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)

		createToolsArea()

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania'
	}
}

const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodo.append(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed') // closest pokazuje swoje najbliższe li
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editToDo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editToDo = e => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent
	// todoToEdit.firstChild
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = e => {
    // todoToDelete = e.target.closest('li')
    // todoToDelete.remove()
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if(allTodos.length === 0){
        errorInfo.textContent = 'Brak zadań na liście.'
    }
}

const enterKeyCheck = (e) => {
    if(e.key === 'Enter'){
        addNewTodo()
    }
}



document.addEventListener('DOMContentLoaded', main)
