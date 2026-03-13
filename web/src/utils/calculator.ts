export interface CalculationResult {
    montanteFinal: number
    totalInvestido: number
    totalJuros: number
}

export const calculateCompoundInterest = (
    valorInicial: number,
    valorMensal: number,
    taxa: number,
    taxaTipo: 'Mensal' | 'Anual',
    periodo: number,
    periodoTipo: 'Meses' | 'Anos'
): CalculationResult => {
    // 1. Normaliza o Tempo (Tudo para Meses)
    const t = periodoTipo === 'Anos' ? periodo * 12 : periodo

    // 2. Normaliza a Taxa (Tudo para taxa mensal decimal)
    const i = taxaTipo === 'Mensal' ? taxa / 100 : Math.pow(1 + taxa / 100, 1 / 12) - 1

    // 3. Cálculo Final
    const montanteFinal =
        valorInicial * Math.pow(1 + i, t) + valorMensal * ((Math.pow(1 + i, t) - 1) / i)

    const totalInvestido = valorInicial + valorMensal * t

    return {
        montanteFinal: Number(montanteFinal.toFixed(2)),
        totalInvestido: Number(totalInvestido.toFixed(2)),
        totalJuros: Number((montanteFinal - totalInvestido).toFixed(2))
    }
}
