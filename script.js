let todoInput // miejsce gdzie użytownik dodaje treść
let errorInfo
let addBtn
let ulList // lista zadań
let newTodo //nowy task, nowe li

let popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn

let sortBtn

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

	sortBtn = document.querySelector('.btn-sort')
	infoSort = document.querySelector('.info-sort')
	infoSortText = document.querySelector('.info-sort p')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
	popupInput.addEventListener('keyup', enterKeyCheckPopup)
	sortBtn.addEventListener('click', sort)

	sortBtn.addEventListener('mouseenter', showInfoSort)
	sortBtn.addEventListener('mouseleave', hideInfoSort)
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

	const priorityBtn = document.createElement('button')
	priorityBtn.classList.add('priority')
	priorityBtn.innerHTML = '<i class="fa-solid fa-exclamation"></i>'

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(priorityBtn, completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed') // closest pokazuje swoje najbliższe li
		e.target.closest('li').classList.remove('prioritized')
	} else if (e.target.matches('.edit')) {
		editToDo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	} else if (e.target.matches('.priority')) {
		e.target.closest('li').classList.toggle('prioritized')
		e.target.closest('li').classList.remove('completed')
	}
}

const editToDo = e => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent
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
	e.target.closest('li').remove()

	const allTodos = ulList.querySelectorAll('li')

	closePopup()

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

const enterKeyCheckPopup = e => {
	if (e.key === 'Enter') {
		changeTodoText()
	}
}

const sort = () => {
	const allTodos = ulList.querySelectorAll('li')
	let check = false

	allTodos.forEach(todo => {
		if (todo.matches('.completed')) {
			check = true
			if (sortBtn.textContent === 'Pokaż') {
				todo.style.display = ''
			} else {
				todo.style.display = 'none'
			}
		} else if (todo.matches(!'.completed')) {
			check = false
		}
	})
	if (check === true) {
		if (sortBtn.textContent === 'Pokaż') {
			sortBtn.textContent = 'Ukryj'
		} else {
			sortBtn.textContent = 'Pokaż'
		}
		showInfoSort()
	} else {
		infoSortText.textContent = 'Brak wykonanych zadań na liście'
	}
}

const showInfoSort = () => {
	if (sortBtn.textContent === 'Pokaż') {
		infoSortText.textContent = 'Pokaż wykonane zadania'
	} else {
		infoSortText.textContent = 'Ukryj wykonane zadania'
	}
	infoSort.classList.add('display')
}

const hideInfoSort = () => {
	infoSort.classList.remove('display')
}

document.addEventListener('DOMContentLoaded', main)
