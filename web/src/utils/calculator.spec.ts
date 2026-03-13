import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from './calculator'

describe('Calculadora de Juros Compostos', () => {
    it('deve calcular corretamente com taxa Mensal e período em Meses', () => {
        // 1000 iniciais, 0 mensais, 10% Mensal, 1 Mês
        const result = calculateCompoundInterest(1000, 0, 10, 'Mensal', 1, 'Meses')

        expect(result.montanteFinal).toBe(1100)
        expect(result.totalInvestido).toBe(1000)
        expect(result.totalJuros).toBe(100)
    })

    it('deve converter corretamente taxa Anual para Mensal no cálculo', () => {
        // Cenário: 1000 iniciais, 0 mensais, 12.68% Anual (equivale a ~1% mensal), 12 Meses
        // 1000 * (1.01)^12 ≈ 1126.83
        const result = calculateCompoundInterest(1000, 0, 12.6825, 'Anual', 12, 'Meses')

        expect(result.montanteFinal).toBeCloseTo(1126.83, 1)
    })

    it('deve converter período de Anos para Meses corretamente', () => {
        // 1000 iniciais, 100 mensais, 1% Mensal, 1 Ano (12 meses)
        const result = calculateCompoundInterest(1000, 100, 1, 'Mensal', 1, 'Anos')

        expect(result.totalInvestido).toBe(2200) // 1000 + (100 * 12)
        expect(result.montanteFinal).toBeGreaterThan(2200)
    })
})
