<template>

    <button :class="['button', type, fullwidth ? 'fullwidth' : null]">{{ text }}</button>

</template>

<script lang="ts" setup>
interface IProps {
    text: string,
    type: "primary" | "secondary",
    fullwidth?: boolean
}

const props = defineProps<IProps>()
</script>

<style scoped lang="scss">
.button {
    border-radius: 8px;
    font-size: 18px;
    padding: 10px;
}

.primary {
    color: var(--black);
    background-color: var(--ligth-grey);
    border: none;
    min-width: 66px;
}


.secondary {
    color: var(--white);
    background-color: var(--black);
}

.fullwidth {
    width: 100%;
}
</style>