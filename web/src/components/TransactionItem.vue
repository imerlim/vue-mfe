<template>
    <div class="transaction-item">
        <div class="info">
            <p class="description">{{ transaction.description }}</p>
            <small>{{ transaction.type }}</small>
        </div>
        <span :class="['amount', transaction.type.toLowerCase()]">
            {{ formatValue(transaction.amount, transaction.type) }}
        </span>
    </div>
</template>

<script setup lang="ts">
// Props tipadas com TS (Obrigatório para Sênior)
import type { Transaction } from '@/types/transaction'

defineProps<{
    transaction: Transaction
}>()

const formatValue = (amount: number, type: string) => {
    const value = amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return type === 'INCOME' ? `+ ${value}` : `- ${value}`
}
</script>

<style lang="scss" scoped>
@use 'sass:color'; // Importante: isso carrega as funções modernas de cor

.transaction-item {
    display: flex;
    justify-content: space-between;
    padding: $spacing-base;

    // Em vez de lighten($bg-primary, 5%), use:
    background: color.adjust($bg-primary, $lightness: 5%);

    border-radius: 8px;
    margin-bottom: 0.5rem;

    .info {
        .description {
            color: $text-main;
            font-weight: 500;
        }
        small {
            color: $text-muted;
        }
    }

    .amount {
        font-weight: 700;
        &.income {
            color: $color-income;
        }
        &.expense {
            color: $color-expense;
        }
    }
}
</style>
