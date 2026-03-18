<template>
    <div class="view-container">
        <h1>Jogo da Memória</h1>
        <MemoryBoard />
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/_variables' as variables;

.view-container {
    @include variables.flex-center;
    flex-direction: column;
    padding: 20px;
    gap: 30px;
}
</style>

<script setup lang="ts">
import MemoryBoard from '@/components/game/MemoryBoard.vue'
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as variables;

.view-container {
    @include variables.flex-center;
    flex-direction: column;
    padding: 20px;
    gap: 30px;
}
</style>
