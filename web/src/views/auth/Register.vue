<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/auth/useAuth'
import { useFormValidation } from '@/composables/validation/useFormValidation'
import CustomInput from '@/components/CustomInput.vue'

const { register, isSubmitting, errorMsg: authError } = useAuth()

const { cpfError, validateCPFField } = useFormValidation()
// Computed para validar o formulário como um todo
const isFormInvalid = computed(() => {
    return (
        !form.value.nome ||
        !form.value.email ||
        !form.value.cpf ||
        !!cpfError.value || // Se houver erro de CPF, o form é inválido
        form.value.senha.length < 6
    )
})

const form = ref({
    nome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    cpf: '',
    senha: ''
})

async function handleRegister() {
    if (!validateCPFField(form.value.cpf)) return
    try {
        await register(form.value)
        console.log('Sucesso! Igor cadastrado no db_mfe.')
    } catch (error) {}
}
</script>

<template>
    <div class="register-container">
        <form @submit.prevent="handleRegister" class="register-form">
            <header>
                <h1>Criar Conta</h1>
                <p>Preencha os dados para acessar o sistema</p>
            </header>

            <main>
                <custom-input
                    v-model="form.nome"
                    label="Nome Completo"
                    type="text"
                    required
                    placeholder="Digite seu nome"
                />

                <custom-input
                    v-model="form.email"
                    label="E-mail"
                    type="email"
                    required
                    placeholder="seu@email.com"
                />

                <div class="form-row">
                    <custom-input
                        v-model="form.dataNascimento"
                        label="Data de Nascimento"
                        type="date"
                        required
                    />
                    <custom-input
                        v-model="form.telefone"
                        label="Telefone"
                        type="tel"
                        required
                        placeholder="(21) 99999-9999"
                    />
                </div>

                <custom-input
                    v-model="form.cpf"
                    label="CPF"
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    :error="!!cpfError"
                    @blur="validateCPFField(form.cpf)"
                />

                <custom-input
                    v-model="form.senha"
                    label="Senha"
                    type="password"
                    required
                    placeholder="********"
                />

                <div v-if="errorMsg" class="error-banner">
                    {{ errorMsg }}
                </div>
            </main>

            <footer>
                <button type="submit" :disabled="isSubmitting" class="btn-submit">
                    {{ isSubmitting ? 'Processando...' : 'Cadastrar' }}
                </button>

                <div class="footer-links">
                    <span>Já tem uma conta?</span>
                    <router-link to="/login">Fazer Login</router-link>
                </div>

                <div v-if="authError || cpfError" class="error-banner">
                    {{ authError || cpfError }}
                </div>
            </footer>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--bg-page); // Ajustado para bater com o _base.scss

    .register-form {
        background: var(--bg-card); // Ajustado para bater com o _base.scss
        padding: 2.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        width: 100%;
        max-width: 450px;

        header {
            margin-bottom: 1.5rem;

            h1 {
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
                color: var(--text-primary);
            }

            p {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
        }

        main {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .error-banner {
                background-color: rgba(220, 38, 38, 0.2); // Pode manter (cor de alerta específica)
                color: #f87171;
                padding: 0.75rem;
                border-radius: 6px;
                border: 1px solid rgba(220, 38, 38, 0.4);
                text-align: center;
                font-size: 0.85rem;
            }
        }

        footer {
            margin-top: 2rem;

            .btn-submit {
                width: 100%;
                padding: 0.8rem;
                background-color: var(--accent-color); // Ajustado para bater com o _base.scss
                color: white;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
                transition: filter 0.2s;

                &:hover:not(:disabled) {
                    filter: brightness(1.2);
                }

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            }

            .footer-links {
                margin-top: 1.5rem;
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;

                a {
                    color: var(--accent-color); // Ajustado para bater com o _base.scss
                    text-decoration: none;
                    font-weight: 500;
                    margin-left: 0.5rem;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>
