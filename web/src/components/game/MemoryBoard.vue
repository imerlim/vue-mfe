<template>
    <div class="game-container">
        <div
            v-for="card in cards"
            :key="card.id"
            class="card"
            :class="{ 'is-flipped': card.isFlipped || card.isMatched }"
            @click="flipCard(card)"
        >
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">{{ card.value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemoryGame } from '@/composables/game/useMemoryGame'

// O 'useMemoryGame' encapsula toda a complexidade
const { cards, initializeGame, flipCard } = useMemoryGame()

onMounted(() => {
    // Definimos os valores apenas uma vez, a inicialização cria os IDs e Status
    const emojis = ['🚀', '⚛️', '🌿', '🔥', '💎', '🎨', '❤️', '🦴', '🎶', '👻', '👽', '🤖']
    initializeGame(emojis)
})

const toggleCard = (id: number) => {
    console.log(id)
    // @ts-ignore - apenas para teste rápido
    cardsStatus.value[id] = !cardsStatus.value[id]
}
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as variables;

.game-wrapper {
    @include flex-center;
    min-height: 100vh; // Garante que ocupa a altura toda da tela
    width: 100%;
    background-color: #f4f7f6; // Um fundo neutro para destacar o jogo
}

.game-container {
    display: grid;
    grid-template-columns: repeat(6, 100px);
    gap: 15px;
    padding: 20px;
    @include variables.responsive-grid(4, 4, 6, 0.5rem);

    width: 100%;
    max-width: 800px; // Aumente para caber as 6 colunas no desktop
    margin: 0 auto;
    padding: 10px;
    @media (max-width: 480px) {
        // Forçamos as colunas a serem menores para caberem na largura da tela
        grid-template-columns: repeat(4, minmax(60px, 1fr));
        gap: 8px;
    }
}

.card {
    width: 100%;
    aspect-ratio: 2/3;
    height: 150px;
    perspective: 1000px;
    cursor: pointer;

    // Nesting (Aninhamento): Característica principal do SCSS
    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); // Transição mais suave
        transform-style: preserve-3d;
    }

    // BEM ou Modificadores: Facilita a leitura
    &.is-flipped .card-inner {
        transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 12px;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra para profundidade
        @include flex-center;
    }

    .card-front {
        background-color: #2c3e50;
        color: white;
        border: 2px solid #34495e;
    }

    .card-back {
        background-color: #ffffff;
        color: #2c3e50;
        transform: rotateY(180deg);
        border: 2px solid #ecf0f1;
    }
}
</style>
