import api from './api' // Importa a instância que você já criou
import type { Transaction } from '../types/transaction'

export async function fetchTransactions(): Promise<Transaction[]> {
    // Usando uma API pública para teste real enquanto seu Laravel não está no ar
    const response = await api.get('https://jsonplaceholder.typicode.com/posts?_limit=5')

    // Mapeando para o seu tipo Transaction (Igual um Resource do Laravel)
    return response.data.map((item: any) => ({
        id: item.id,
        description: item.title.substring(0, 15),
        amount: Math.floor(Math.random() * 5000),
        type: item.id % 2 === 0 ? 'INCOME' : 'EXPENSE',
        month: '03',
        year: 2026
    }))
}
