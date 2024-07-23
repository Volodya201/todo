<template>
    <div class="actions">
        <Button text="Delete all" type="secondary" :fullwidth="true" @click="() => todosStore.deleteAll()" />
        <Button text="Start every timer" type="secondary" :fullwidth="true" @click="() => todosStore.startEveryTimer()" />
        <Button text="Pause every timer" type="secondary" :fullwidth="true" @click="() => todosStore.pauseEveryTimer()" />
        <Button text="Reset every timer" type="secondary" :fullwidth="true" @click="() => todosStore.resetEveryTimer()" />
    </div>
</template>

<script lang="ts" setup>
import { Button } from "@/shared/ui"
import { useTodosStore } from "../store/todosStore"

const todosStore = useTodosStore()

</script>

<style scoped lang="scss">

.actions {
    width: 100%;
    display: flex;
    gap: 10px;
}

</style>