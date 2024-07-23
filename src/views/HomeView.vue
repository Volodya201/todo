<template>
    <div>
        <br>
        <h1 class="title">TODO LIST</h1>
        <br>
        <hr class="hr">
        <br>
        <CreateTodo />
        <br>
        <AllTodosActions />
        <br>
        <br>
        <GetTodos />
    </div>
</template>

<script lang="ts" setup>
import CreateTodo from "@/features/todos/components/CreateTodo.vue"
import AllTodosActions from "@/features/todos/components/AllTodosActions.vue"
import GetTodos from "@/features/todos/components/GetTodos.vue"
import { MainInput, Button } from "@/shared/ui/index"
import { useTodosStore } from "@/features/todos/store/todosStore"

const todosStore = useTodosStore()
</script>


<style src="@/styles/todo.scss" lang="scss"></style>