<template>
    <main class="dashboard">
        <section class="transactions">
            <h3>Últimas Transações</h3>

            <div v-if="loading" class="loader">Carregando...</div>

            <div v-else class="transaction-list">
                <TransactionItem v-for="t in transactions" :key="t.id" :transaction="t" />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import TransactionItem from '@/components/TransactionItem.vue'

const { transactions, loading } = useTransactions()
// ... resto da lógica
</script>

<style scoped lang="scss">
.dashboard {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
}

.transactions {
    background: #1f1f1f;
    border-radius: 10px;
    padding: 20px;
    h3 {
        color: $text-main;
        margin-bottom: 1.5rem;
    }
}

.transaction-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
