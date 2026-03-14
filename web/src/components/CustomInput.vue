<script setup lang="ts">
import { ref, computed } from 'vue'

// PONTO 2: Usando Interface para definir o "contrato" das Props
interface Props {
    modelValue: string | number | null
    label?: string
    id?: string
    type?: string
    placeholder?: string
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    disabled?: boolean
    error?: boolean
    errorMessage?: string
    formata?: boolean // Lógica de moeda
    textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
    // Botões opcionais
    showSearch?: boolean
    showClear?: boolean
    required?: boolean
}

// Definindo valores padrão (Boas práticas Sênior)
const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    textSize: 'text-base',
    error: false,
    formata: false,
    required: false
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
    (e: 'on-search'): void
    (e: 'on-clear'): void
}>()

// PONTO 1: Encapsulamento da lógica de formatação
function formatarMoeda(valor: any): string {
    if (valor === null || valor === undefined || valor === '') return '0,00'

    const numericValue =
        typeof valor === 'number' ? valor : parseFloat(String(valor).replace(/\D/g, '')) / 100

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericValue || 0)
}

function updateValue(e: Event) {
    const target = e.target as HTMLInputElement
    let inputVal = target.value

    if (props.formata) {
        const onlyNumbers = inputVal.replace(/\D/g, '')
        const numericValue = onlyNumbers ? parseInt(onlyNumbers, 10) / 100 : 0

        emit('update:modelValue', numericValue)
        // Truque visual: mantém o input bonito enquanto o usuário digita
        target.value = formatarMoeda(numericValue)
    } else {
        emit('update:modelValue', inputVal)
    }
}

// PONTO 1: Abstração (Expondo apenas o necessário)
const inputRef = ref<HTMLInputElement | null>(null)
defineExpose({
    focus: () => inputRef.value?.focus()
})
</script>

<template>
    <div class="custom-input-group">
        <label v-if="label" :for="id" class="label" :class="textSize">
            {{ label }}
        </label>

        <div class="input-container" :class="{ 'is-invalid': error }">
            <div v-if="$slots.prepend" class="input-prepend">
                <slot name="prepend"></slot>
            </div>
            <input
                lang="pt-BR"
                ref="inputRef"
                :id="id"
                :type="type"
                :value="formata ? formatarMoeda(modelValue) : modelValue"
                :placeholder="placeholder"
                :inputmode="formata ? 'numeric' : inputmode"
                :disabled="disabled"
                @input="updateValue"
                class="input-field"
                :class="textSize"
                :required="required"
            />
            <div v-if="$slots.append" class="input-append">
                <slot name="append"></slot>
            </div>

            <div v-if="showSearch" class="append-icon" @click="emit('on-search')">🔍</div>
        </div>

        <p v-if="error" class="error-text">{{ errorMessage }}</p>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use 'sass:color';

.custom-input-group {
    width: 100%;
    margin-bottom: 1rem;

    .label {
        display: block;
        color: $text-main;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .input-container {
        display: flex;
        align-items: center;
        // Substituído color.adjust por variável global ou cor fixa
        background: var(--bg-input);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 0 0.75rem;
        transition:
            border-color 0.2s,
            box-shadow 0.2s;

        &:focus-within {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }

        &.is-invalid {
            border-color: $color-expense;
        }

        :slotted(.input-prepend),
        :slotted(.input-append) {
            color: var(--text-secondary);
            display: flex;
            align-items: center;
        }
    }

    .input-field {
        flex: 1;
        background: transparent;
        border: none;
        color: $text-main;
        padding: 0.75rem 0;
        outline: none;

        &::placeholder {
            color: $text-muted;
        }
    }

    .error-text {
        color: $color-expense;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    input {
        background-color: var(--bg-input);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.8rem;
        border-radius: 8px;
        width: 100%;

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
            // Força o texto a ser branco (sua variável)
            -webkit-text-fill-color: var(--text-primary) !important;

            // Cria uma sombra interna da cor do seu input para cobrir o azul do Chrome
            box-shadow: 0 0 0px 1000px var(--bg-input) inset !important;
            -webkit-box-shadow: 0 0 0px 1000px var(--bg-input) inset !important;

            // Impede que a cor mude depois de 1 segundo
            transition: background-color 5000s ease-in-out 0s;
        }
    }
}
</style>
