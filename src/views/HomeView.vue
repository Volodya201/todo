<template>
    <div>
        <br>

        <h1 class="title">TODO LIST</h1>

        <br>

        <hr class="hr">

        <br>

        <form class="create-todo" @submit.prevent="addTodo">

            <MainInput placeholder="add task..." v-model="newTask" />

            <AddButton />

        </form>

        <br>
        <br>

        <div class="todo-list">

            <div class="todo-item" v-if="todosArray.length > 0" v-for="todo in todosArray" :key="todo.id">
                <div class="todo-task">
                    <span v-if="!todo.isEditing">{{ todo.task }}</span>
                    <textarea @input="autoresize" class="todo-edit-task" v-else v-model="todo.task"></textarea>
                </div>

                <div class="todo-buttons">
                    <div>
                        <DeleteButton @click="() => deleteTodo(todo.id)" />

                        <EditButton :isEditing="todo.isEditing" @click="() => editTodo(todo.id)" />
                    </div>
                </div>
            </div>

            <h3 v-else>You don't have any todo</h3>

        </div>

    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, watchEffect } from "vue"
    import MainInput from "@/shared/ui/MainInput/MainInput.vue"
    import AddButton from "@/shared/ui/AddButton/AddButton.vue"
    import DeleteButton from "@/shared/ui/DeleteButton/DeleteButton.vue"
    import EditButton from "@/shared/ui/EditButton/EditButton.vue"
    import { vElementMounted } from "@/shared/directives/elementMounted"

    interface ITodo {
        id: number,
        task: string,
        isEditing: boolean
    }

    const todosArray = ref<ITodo[]>([])


    onMounted(() => {
        const savedTodosString = localStorage.getItem("todos")

        if (!savedTodosString) return
        
        const savedTodos = JSON.parse(savedTodosString)

        savedTodos.forEach((savedTodo:string, index: number) => {
            todosArray.value.push({
                id: index,
                task: savedTodo,
                isEditing: false
            })
        })
    })

    window.addEventListener('beforeunload', event => {
        let counter = 0

        const savingTodosArray = todosArray.value.map(todo => {
            return todo.task
        })

        localStorage.setItem("todos", JSON.stringify(savingTodosArray))
    })




    const newTask = ref<string>("")

    function addTodo() {
        const newTodo = {
            id: Date.now(),
            task: newTask.value,
            isEditing: false
        }

        todosArray.value.push({ ...newTodo })

        newTask.value = ""
    }

    function deleteTodo(id: number) {
        todosArray.value = todosArray.value.filter(todo => todo.id !== id)
    }

    function editTodo(id: number) {
        todosArray.value.map(todo => {
            if (todo.id === id) todo.isEditing = (!todo.isEditing)
            return todo
        })
    }



    function autoresize(event: InputEvent) {
        event.target.style.height ='0px'
        const padding = 2
        const height = Math.round((event.target.scrollHeight - padding) / 20)
        event.target.style.height = (height * 20 + 5) + 'px'
        console.log(height * 20)
    }

</script>


<style scoped>

    .title {
        font-size: 60px;
        font-weight: bold;
        margin: 0;
    }

    .hr {
        color: #d2d2d2;
        background-color: #d2d2d2;
    }

    .create-todo {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
    }

    .todo-item {
        background-color: #cdd4da;
        border: 1px solid #acb3bb;
        padding: 16px;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 30px;
    }

    .todo-task {
        color: #647076;
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        text-align: left;
        word-wrap: break-word;
        word-break: break-all;
    }

    .todo-edit-task {
        background: transparent;
        color: #647076;
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        text-align: left;
        word-wrap: break-word;
        word-break: break-all;
        width: 100%;
        resize: none;
        height: 100%;
        border-radius: 6px;
        padding: 2px;
    }

    .todo-edit-task:focus {
        outline: none;
    }

    .todo-buttons {
        display: flex;
        align-items: center;
    }

    .todo-buttons div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>