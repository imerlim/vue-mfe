import { describe, it, expect } from 'vitest'
import { useTransactions } from '../useTransactions'

describe('useTransactions Composable', () => {
    it('deve iniciar com uma lista de transações vazia', () => {
        // Executamos o composable
        const { transactions } = useTransactions()

        // Verificamos se ele começa vazio (estado inicial correto)
        expect(transactions.value).toEqual([])
    })

    it('deve iniciar com o estado de loading em falso', () => {
        const { loading } = useTransactions()
        expect(loading.value).toBe(false)
    })
})
