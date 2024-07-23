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

<style scoped lang="scss">

    .main-input {
        color: var(--text-color);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        font-size: 18px;
        padding: 10px;
        font-size: 20px;
        transition: all 0.3s ease;

        &:focus {
            border: 2px solid var(--black);
            outline: none;
        }
    }

</style>