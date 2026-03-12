import { ref, onMounted } from 'vue'
import type { Transaction } from '../types/transaction'
import { fetchTransactions } from '../services/transactionService'

export function useTransactions() {
    const transactions = ref<Transaction[]>([])
    const loading = ref(false)

    const error = ref<string | null>(null)

    const loadTransactions = async () => {
        loading.value = true
        error.value = null
        try {
            transactions.value = await fetchTransactions()
        } catch (e) {
            error.value = 'Failed to load financial data. Please try again.'
        } finally {
            loading.value = false
        }
    }

    onMounted(loadTransactions)

    return {
        transactions,
        loading,
        loadTransactions
    }
}
