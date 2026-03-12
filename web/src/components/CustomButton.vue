<script setup lang="ts">
// Definimos as propriedades que o botão pode receber
interface Props {
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

// Definimos os valores padrão
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    type: 'button'
})

defineOptions({
    inheritAttrs: false
})
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        v-bind="$attrs"
        class="custom-btn"
        :class="{ 'is-disabled': disabled }"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/variables' as *;

.custom-btn {
    // 1. Estrutura Base
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition:
        background-color 0.3s ease,
        transform 0.1s active;

    // 2. Cores (Usando suas variáveis do projeto)
    background-color: $color-primary;
    color: $text-main;

    // 3. Estados (Onde o SCSS brilha com o '&')
    &:hover:not(.is-disabled) {
        background-color: color.scale($color-primary, $lightness: -10%);
    }

    &:active:not(.is-disabled) {
        transform: translateY(1px);
    }

    &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>
