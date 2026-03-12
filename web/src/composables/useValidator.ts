import { ref } from 'vue'

export function useValidator() {
    const errors = ref<Record<string, string>>({})

    const validateRequired = (key: string, value: any, message = 'Este campo é obrigatório') => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            errors.value[key] = message
            return false
        }
        delete errors.value[key]
        return true
    }

    const validateMinLength = (key: string, value: string, min: number) => {
        if (value.length < min) {
            errors.value[key] = `Mínimo de ${min} caracteres`
            return false
        }
        delete errors.value[key]
        return true
    }

    const cleanCaracteresEspeciais = (parametro: string) => {
        return parametro.replace(/\D/g, '')
    }
    // No seu useValidator.ts

    const validateCpf = (key: string, cpf: string) => {
        // 1. Limpa o que não é número

        const cleanCpf = cleanCaracteresEspeciais(cpf)

        // 2. Bloqueia CPFs conhecidos ou com tamanho errado
        if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) {
            errors.value[key] = 'CPF inválido'
            return false
        }

        // 3. Algoritmo de validação dos dígitos (O "Cálculo Sênior")
        const calculateDigit = (slice: string, factor: number) => {
            let total = 0
            for (const digit of slice) {
                total += parseInt(digit) * factor--
            }
            const result = (total * 10) % 11
            return result === 10 ? 0 : result
        }

        const digit1 = calculateDigit(cleanCpf.slice(0, 9), 10)
        const digit2 = calculateDigit(cleanCpf.slice(0, 10), 11)

        if (digit1 !== parseInt(String(cleanCpf[9])) || digit2 !== parseInt(String(cleanCpf[10]))) {
            errors.value[key] = 'CPF inválido'
            return false
        }

        // Se passou em tudo, remove o erro
        delete errors.value[key]
        return true
    }

    const clearErrors = () => (errors.value = {})

    return {
        errors,
        validateRequired,
        validateMinLength,
        clearErrors
    }
}
