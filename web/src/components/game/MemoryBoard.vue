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

    <!-- <Modal
        :model-value="true"
        size="sm"
        mode="modal"
        title="Vitória!"
        action-title="Recomeçar"
        :action-handler="resetGame"
    >
        <p>Você terminou em {{ moves }} movimentos!</p>
    </Modal> -->

    <Modal
        v-model="isGameOver"
        mode="modal"
        size="sm"
        title="Vitória!"
        action-title="Recomeçar"
        :action-handler="resetGame"
    >
        <p>Você terminou em {{ moves }} movimentos!</p>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemoryGame } from '@/composables/game/useMemoryGame'
import Modal from '@/components/Modal.vue'

// O 'useMemoryGame' encapsula toda a complexidade
const { cards, initializeGame, flipCard, isGameOver, moves, resetGame } = useMemoryGame()

onMounted(() => {
    // Definimos os valores apenas uma vez, a inicialização cria os IDs e Status
    const emojis = ['🚀', '⚛️', '🌿', '🔥', '💎', '🎨', '❤️', '🦴', '🎶', '👻', '👽', '🤖']
    initializeGame(emojis)
})
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
    // No desktop 6 colunas, no mobile 4
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 15px;
    box-sizing: border-box; // Garante que o padding não "estique" o container

    @media (max-width: 600px) {
        grid-template-columns: repeat(4, 1fr); // 4 colunas no mobile
        gap: 8px;
        padding: 10px;
    }
}

.card {
    width: 100%;
    aspect-ratio: 2/3; // Deixe o aspect-ratio definir a altura baseado na largura
    height: auto; // REMOVA o height: 150px fixo
    perspective: 1000px;
    cursor: pointer;

    // Nesting (Aninhamento): Característica principal do SCSS
    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
