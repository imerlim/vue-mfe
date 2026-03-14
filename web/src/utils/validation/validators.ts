export const isValidCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '') // Remove pontos e traços

    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false

    let soma = 0
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cleanCPF.charAt(9))) return false

    soma = 0
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0

    return resto === parseInt(cleanCPF.charAt(10))
}
