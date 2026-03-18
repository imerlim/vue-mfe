import { ref, computed } from 'vue'
import type { Card } from '@/types/game'

export function useMemoryGame() {
    const cards = ref<Card[]>([])
    const moves = ref(0)
    const isLock = ref(false)

    const shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            // percorre os indices menos o indice zero
            const j = Math.floor(Math.random() * (i + 1)) // gera um numero entre 0 e i
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    const initializeGame = (items: string[]) => {
        const pairList = [...items, ...items]

        const shuffledList = shuffle(pairList)

        cards.value = shuffledList.map((value, index) => ({
            id: index, // Chave única para renderização eficiente (v-for key)
            value,
            isFlipped: false,
            isMatched: false
        }))

        moves.value = 0
        isLock.value = false
    }

    const isGameOver = computed(() => {
        return cards.value.length > 0 && cards.value.every((card) => card.isMatched)
    })

    const flipCard = (card: Card) => {
        // 1. Cláusula de Guarda: Bloqueia cliques inválidos
        if (isLock.value || card.isFlipped || card.isMatched) return

        // 2. Vira a carta atual
        card.isFlipped = true

        // 3. Busca apenas as cartas que o usuário virou nesta jogada
        const flippedCards = cards.value.filter((c) => c.isFlipped && !c.isMatched)

        // 4. Se temos um par (duas cartas viradas)
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards
            moves.value++ // Incrementa o contador de tentativas

            // ESTA LINHA RESOLVE O ERRO:
            if (!card1 || !card2) return

            if (card1.value === card2.value) {
                // SUCESSO: As cartas são iguais!
                card1.isMatched = true
                card2.isMatched = true
                // Resetamos o estado de 'flipped' mas elas ficam visíveis pelo 'isMatched'
                card1.isFlipped = false
                card2.isFlipped = false
            } else {
                // FALHA: As cartas são diferentes
                isLock.value = true // Trava novos cliques durante a animação

                // Dá tempo para o jogador memorizar antes de esconder
                setTimeout(() => {
                    card1.isFlipped = false
                    card2.isFlipped = false
                    isLock.value = false // Libera o jogo novamente
                }, 1000)
            }
        }
    }

    return {
        cards,
        moves,
        isLock,
        flipCard,
        isGameOver,
        initializeGame
    }
}
