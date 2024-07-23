import { defineStore } from "pinia"
import { ref } from "vue"
import { ITodo } from "@/features/todos/store/types"

export const useTodosStore = defineStore('todos', () => {
  
    const todosArray = ref<ITodo[]>([])
    const newTask = ref<string>("")


    function getTodos() {
        const savedTodosString = localStorage.getItem("todos")
        if (!savedTodosString) return
        const savedTodos = JSON.parse(savedTodosString)
        savedTodos.forEach((savedTodo:string, index: number) => {
            todosArray.value.push({
                id: index,
                task: savedTodo,
                isEditing: false,
                timer: 0,
                timerRunning: false,
                timerChanging: false,
                newTimer: ""
            })
        })
    }

    function startTimers() {
        setInterval(() => {
            todosArray.value = todosArray.value.map((todo:ITodo) => {
                if (todo.timerRunning && todo.timer < 6000) ++todo.timer
    
                return todo
            })
        }, 1000)
    }

    function saveTodos() {
        const savedTodos = todosArray.value.map((todo:ITodo) => todo.task)
        localStorage.setItem("todos", JSON.stringify(savedTodos))
    }
    
    function addTodo() {
        if (newTask.value.length <= 0) return
        const newTodo:ITodo = {
            id: Date.now(),
            task: newTask.value,
            isEditing: false,
            timer: 0,
            timerRunning: false,
            timerChanging: false,
            newTimer: ""
        }
        todosArray.value.push({ ...newTodo })
        newTask.value = ""
    }
    
    
    function deleteTodo(id: number) {
        todosArray.value = todosArray.value.filter(todo => todo.id !== id)
    }
    
    function editTodo(id: number) {
        todosArray.value.map(todo => {
            if (todo.id === id) {
                if (todo.task.length <= 0) return todo
                todo.isEditing = (!todo.isEditing)
            }
            return todo
        })
    }

    function startOrPauseTimer(id: number) {
        todosArray.value.map((todo:ITodo) => {
            if (todo.id !== id) return todo
            if(todo.timer >= 6000) return todo
            if (todo.timerChanging) return todo
            todo.timerRunning = !todo.timerRunning
            return todo
        })
    }
    
    function resetTimer(id: number) {
        todosArray.value.map((todo:ITodo) => {
            if (todo.id === id) todo.timer = 0
            return todo
        })
    }
    
    function editTimer(id: number) {
        todosArray.value.map((todo:ITodo) => {
            if (todo.id === id) {
                todo.timerChanging = !todo.timerChanging
                todo.timerRunning = false
                if (todo.timerChanging) {
                    const seconds = todo.timer % 60
                    todo.newTimer = Math.floor(todo.timer / 60) + ":" + (seconds > 9 ? seconds : "0" + seconds)
                } else {
                    const timerRegexp = /\d{1,2}:\d{2}/i
                    if (!timerRegexp.test(todo.newTimer)) {
                        todo.timer = 0
                        return
                    }
                    let newTimer = (Number(todo.newTimer.substring(0, 2)) * 60) + Number(todo.newTimer.substring(3, 5))
                    todo.timer = newTimer < 6000 ? newTimer : 6000
                }
            }
            return todo
        })
    }

    function deleteAll() {
        todosArray.value = []
    }

    function startEveryTimer() {
        todosArray.value = todosArray.value.map(todo => {
            if(todo.timer >= 6000) return todo
            todo.timerChanging = false
            todo.timerRunning = true
            return todo
        })
    }

    function pauseEveryTimer() {
        todosArray.value = todosArray.value.map(todo => {
            todo.timerRunning = false
            return todo
        })
    }

    function resetEveryTimer() {
        todosArray.value = todosArray.value.map(todo => {
            todo.timer = 0
            return todo
        })
    }

    return {
        todosArray,
        newTask,
        getTodos,
        startTimers,
        saveTodos,
        addTodo,
        editTodo,
        deleteTodo,
        startOrPauseTimer,
        resetTimer,
        editTimer,
        deleteAll,
        startEveryTimer,
        pauseEveryTimer,
        resetEveryTimer
    }

})