<template>

    <TransitionGroup tag="div" name="todo-list" class="todo-list" v-if="todosStore.todosArray.length > 0">
        <div class="todo-item" v-for="todo in todosStore.todosArray" :key="todo.id">
            <div class="todo-task">
                <span v-if="!todo.isEditing">{{ todo.task }}</span>
                <textarea @input="autoresize" class="todo-edit-task" v-else v-model="todo.task"></textarea>
            </div>
            <div class="todo-buttons">
                <div>
                    <span v-if="!todo.timerChanging">{{ drawTimer(todo.timer) }}</span>
                    <MainInput v-else v-mask="['##:##', '#:##']" v-model="todo.newTimer" placeholder="timer" />
                    <Button type="primary" :text="todo.timerRunning ? 'Pause' : 'Start'" @click="() => todosStore.startOrPauseTimer(todo.id)" />
                    <Button type="primary" text="Reset timer" @click="() => todosStore.resetTimer(todo.id)" />
                    <Button type="primary" :text="todo.timerChanging ? 'Done editing timer' : 'Edit timer'" @click="() => todosStore.editTimer(todo.id)" />
                    <Button type="primary" text="Delete" @click="() => todosStore.deleteTodo(todo.id)" />
                    <Button type="primary" :text="todo.isEditing ? 'Done' : 'Edit'" @click="() => todosStore.editTodo(todo.id)" />
                </div>
            </div>
        </div>
    </TransitionGroup>
    <h3 v-else>You don't have any todo</h3>

</template>

<script setup lang="ts">

import { onMounted } from "vue"
import { MainInput, Button } from "@/shared/ui/index"
import { useTodosStore } from "@/features/todos/store/todosStore"


const todosStore = useTodosStore()

onMounted(() => {
    todosStore.getTodos()
    todosStore.startTimers()
})

window.addEventListener('beforeunload', todosStore.saveTodos)


function autoresize(event) {
    event.target.style.height ='0px'
    const padding = 2
    const height = Math.round((event.target.scrollHeight - padding) / 20)
    event.target.style.height = (height * 20 + 5) + 'px'
}

function drawTimer(timer:number): string {
    const seconds = timer % 60
    return Math.floor(timer / 60) + ":" + (seconds > 9 ? seconds : "0" + seconds)
}

</script>