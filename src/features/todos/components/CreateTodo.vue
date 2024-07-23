<template>
    <form class="create-todo" @submit.prevent="todosStore.addTodo()">
        <MainInput placeholder="add task..." v-model="todosStore.newTask" />
        <Button type="secondary" text="Add" />
    </form>
</template>

<script lang="ts" setup>
import { useTodosStore } from '../store/todosStore'
import { MainInput, Button } from '@/shared/ui'

const todosStore = useTodosStore()
</script>