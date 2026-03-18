<script setup lang="ts">
import { ref, nextTick } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { calculateCompoundInterest } from '@/utils/calculator' // Importa a lógica testada

const valorInicial = ref(0)
const valorMensal = ref(0)
const taxaJuros = ref(0)
const periodo = ref(0)
const taxaJurosSelect = ref<'Mensal' | 'Anual'>('Mensal')
const periodoSelect = ref<'Meses' | 'Anos'>('Anos')
const montanteFinal = ref('R$ 0,00')
const valorTotalInvestido = ref('R$ 0,00')
const totalEmJuros = ref('R$ 0,00')

const calculaJuros = () => {
    // 1. Validações de Interface (Mantém o que já tinha)
    if (!valorInicial.value && !valorMensal.value) return
    if (!taxaJuros.value || !periodo.value) return

    // 3. O "Pulo do Gato": Chama a função que o Vitest já validou
    const resultado = calculateCompoundInterest(
        valorInicial.value || 0,
        valorMensal.value || 0,
        taxaJuros.value,
        taxaJurosSelect.value,
        periodo.value,
        periodoSelect.value
    )

    // 4. Atribuição para a tela (Formatação)
    montanteFinal.value = resultado.montanteFinal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    valorTotalInvestido.value = resultado.totalInvestido.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    totalEmJuros.value = resultado.totalJuros.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    // 5. Scroll suave
    nextTick(() => {
        const el = document.getElementById('montanteDiv')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
}
</script>

<template>
    <header class="header-calculadora">
        <div class="container-header">
            <h1 class="title">Calculadora de Juros Compostos</h1>
            <p class="subtitle">Planeje seus investimentos com precisão</p>
        </div>
    </header>

    <main class="main-calculadora">
        <section class="calculadora-card">
            <form @submit.prevent>
                <div class="grid-inputs">
                    <CustomInput label="Capital Inicial" v-model="valorInicial" :formata="true">
                        <template #prepend>
                            <span class="text-base">R$</span>
                        </template>
                    </CustomInput>
                    <CustomInput label="Aporte mensal" v-model="valorMensal" :formata="true">
                        <template #prepend>
                            <span class="text-base">R$</span>
                        </template>
                    </CustomInput>
                    <CustomInput label="Taxa juros mensal" v-model="taxaJuros" :formata="true">
                        <template #prepend>
                            <span class="text-base">R$</span>
                        </template>
                    </CustomInput>
                    <CustomInput label="Período" v-model="periodo" type="number">
                        <template #append>
                            <span class="text-base">Ano(s)</span>
                        </template>
                    </CustomInput>
                </div>

                <div class="actions">
                    <CustomButton @click="calculaJuros()">Calcular</CustomButton>
                </div>

                <div
                    id="montanteDiv"
                    class="resultados-container"
                    v-if="montanteFinal !== 'R$ 0,00'"
                >
                    <article class="totalizador-item">
                        <h3>Total acumulado</h3>
                        <output class="valor-destaque">{{ montanteFinal }}</output>
                    </article>

                    <article class="totalizador-item">
                        <h3>Total investido</h3>
                        <output>{{ valorTotalInvestido }}</output>
                    </article>

                    <article class="totalizador-item">
                        <h3>Total em juros</h3>
                        <output>{{ totalEmJuros }}</output>
                    </article>
                </div>
            </form>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@use '../styles/_variables' as variables;

.header-calculadora {
    background-color: variables.$bg-card; // Usando sua variável de fundo de card
    padding: 2rem variables.$spacing-base;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .title {
        color: variables.$text-main;
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    .subtitle {
        color: variables.$text-muted;
        font-size: 1rem;
    }

    .container-header {
        max-width: 800px;
        margin: 0 auto;

        @include variables.flex-center;
        flex-direction: column;
    }
}

.main-calculadora {
    max-width: 800px;
    margin: 0 auto;

    .calculadora-card {
        background-color: variables.$bg-card; // Garante que o fundo do card é diferente do fundo da página
        padding: 2rem;
        border-radius: 12px;
        margin-top: 2rem;

        .grid-inputs {
            @include variables.responsive-grid(1, 2, 2, 2rem);
        }
        .actions {
            display: flex;
            justify-content: flex-end; // Empurra o conteúdo para o fim (direita)
            width: 100%; // Garante que o container ocupe toda a largura
            margin-top: 1rem; // Espaçamento do grid acima
        }

        .resultados-container {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);

            // Ajustado para 2 colunas no desktop para manter o padrão do grid-inputs
            @include variables.responsive-grid(1, 2, 2, 1.5rem);
        }

        .totalizador-item {
            background-color: variables.$bg-card;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.05);

            h3 {
                color: variables.$text-muted;
                font-size: 0.85rem;
                text-transform: uppercase;
                margin-bottom: 0.5rem;
            }

            output {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
                color: variables.$text-main;
            }

            // Classe específica para o destaque de sucesso/lucro
            &.valor-destaque {
                output {
                    color: variables.$color-income;
                }
            }

            // Destaque para o primeiro item ocupar a linha toda
            &:first-child {
                grid-column: 1 / -1;
                background-color: variables.$color-primary;

                output {
                    font-size: 2.2rem;
                }
            }
        }
    }
}
</style>
