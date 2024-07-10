<template>

    <button class="edit-button">{{ isEditing ? "Done" : "Edit" }}</button>

</template>

<script lang="ts" setup>
    interface IProps {
        isEditing: boolean
    }

    const props = defineProps<IProps>()
</script>

<style scoped>

    .edit-button {
        color: #000;
        background-color: #fafbff;
        border-radius: 8px;
        font-size: 18px;
        padding: 10px;
        border: 1px solid #e2e5e5;
        width: 66px;
        min-width: 66px;
    }

</style>