// Document is the DOM and can be accessed in the console with document.window.
// Tree is from the top, html, body, p, etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task') // Add a new task.
const addButton = document.getElementsByTagName('button')[0] // First button
const incompleteTaskHolder = document.getElementById('incompleteTasks') // ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks') // completed-tasks

// New task list item
const createNewTaskElement = taskString => {
	const listItem = document.createElement('li')

	// Input (checkbox)
	const checkBox = document.createElement('input') // Checkbox
	// Label
	const label = document.createElement('label') // Label
	// Input (text)
	const editInput = document.createElement('input') // Text
	// Button.edit
	const editButton = document.createElement('button') // Edit button

	// Button.delete
	const deleteButton = document.createElement('button') // Delete button
	const deleteButtonImg = document.createElement('img') // Delete button image

	label.innerText = taskString
	label.className = 'task'

	// Each element needs appending
	checkBox.type = 'checkbox'
	editInput.type = 'text'
	editInput.className = 'task'

	editButton.innerText = 'Edit' // innerText encodes special characters, HTML does not.
	editButton.className = 'edit'

	deleteButton.className = 'delete'
	deleteButtonImg.src = './remove.svg'
	deleteButton.appendChild(deleteButtonImg)

	// Appending
	listItem.appendChild(checkBox)
	listItem.appendChild(label)
	listItem.appendChild(editInput)
	listItem.appendChild(editButton)
	listItem.appendChild(deleteButton)
	return listItem
}

const addTask = () => {
	console.log('Add Task...')
	// Create a new list item with the text from the #new-task:
	if (!taskInput.value) return
	const listItem = createNewTaskElement(taskInput.value)

	// Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)

	taskInput.value = ''
}

// Edit an existing task.
const editTask = function () {
	console.log('Edit Task...')
	console.log("Change 'edit' to 'save'")

	const listItem = this.parentNode

	const editInput = listItem.querySelector('input[type="text"]')
	const label = listItem.querySelector('label')
	const editBtn = listItem.querySelector('.edit')
	const containsClass = listItem.classList.contains('editMode')
	// If class of the parent is .editmode
	if (containsClass) {
		// Switch to .editmode
		// Label becomes the input's value.
		label.innerText = editInput.value
		editBtn.innerText = 'Edit'
	} else {
		editInput.value = label.innerText
		editBtn.innerText = 'Save'
	}

	// Toggle .editmode on the parent.
	listItem.classList.toggle('editMode')
}

// Delete task.
const deleteTask = function () {
	console.log('Delete Task...')

	const listItem = this.parentNode
	const ul = listItem.parentNode
	// Remove the parent list item from the ul.
	ul.removeChild(listItem)
}

// Mark task completed.
const taskCompleted = function () {
	console.log('Complete Task...')

	// Append the task list item to the #completed-tasks
	const listItem = this.parentNode
	completedTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskIncomplete)
}

const taskIncomplete = function () {
	console.log('Incomplete Task...')
	// Mark task as incomplete.
	// When the checkbox is unchecked.
	// Append the task list item to the #incompleteTasks.
	const listItem = this.parentNode
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
}

const ajaxRequest = function () {
	console.log('AJAX Request')
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask
addButton.addEventListener('click', addTask)
addButton.addEventListener('click', ajaxRequest)

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
	console.log('Bind list item events')
	// Select ListItems children
	const checkBox = taskListItem.querySelector('input[type="checkbox"]')
	const editButton = taskListItem.querySelector('button.edit')
	const deleteButton = taskListItem.querySelector('button.delete')

	// Bind editTask to edit button.
	editButton.onclick = editTask
	// Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask
	// Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler
}

// Cycle over incompleteTaskHolder ul list items
// For each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	// Bind events to list items children (tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)
}

// Cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	// Bind events to list items children (tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
}

// Issues with usability don't get seen until they are in front of a human tester.

// Prevent creation of empty tasks.

// Change edit to save when you are in edit mode.
