export type TransactionType = 'EXPENSE' | 'INCOME'

export interface Transaction {
  id: number
  description: string
  amount: number
  type: TransactionType
  month: string
  year: number
}