<template>

    <input class="main-input" :placeholder="placeholder" @input="($event:ChangeEvent<HTMLInputElement>) => onInput($event.target.value)" :value="modelValue"  >

</template>


<script lang="ts" setup>

    interface IProps {
        placeholder: string,
        modelValue: any
    }

    const props = defineProps<IProps>()

    const emit = defineEmits(["update:modelValue"])

    function onInput(text:string) {
        emit("update:modelValue", text)
    }
</script>

<style scoped>

    .main-input {
        color: #616f75;
        border: 2px solid #e2e5e5;
        border-radius: 8px;
        font-size: 18px;
        padding: 10px;
        font-size: 20px;
        transition: all 0.3s ease;
    }

    .main-input:focus {
        border: 2px solid #73838b;
        outline: none;
    }

</style>