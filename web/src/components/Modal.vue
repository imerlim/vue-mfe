<template>
    <Transition name="modal-fade">
        <div v-if="modelValue" class="modal-overlay" @click.self="emitClose">
            <div class="modal-container" :class="[currentMode, size]">
                <div v-if="currentMode === 'sheet'" class="mobile-handle">
                    <div class="handle-bar"></div>
                </div>

                <div class="modal-header">
                    <h3 class="modal-title">
                        <slot name="title">{{ title }}</slot>
                    </h3>
                    <button class="close-btn" @click="emitClose">&times;</button>
                </div>

                <div class="modal-body modal-scroll">
                    <slot />
                </div>

                <div v-if="showCancel || (actionTitle && actionHandler)" class="modal-footer">
                    <CustomButton v-if="showCancel" @click="emitClose"> Cancelar </CustomButton>
                    <CustomButton v-if="actionTitle && actionHandler" @click="actionHandler">
                        {{ actionTitle }}
                    </CustomButton>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import CustomButton from '@/components/CustomButton.vue'

// Props tipadas
const props = defineProps<{
    modelValue: boolean
    title?: string
    mode?: 'auto' | 'modal' | 'sheet'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    actionTitle?: string | null
    actionHandler?: (() => void) | null
    showCancel?: boolean
}>()

// Emits tipados
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'closed'): void
}>()

// State
const isMobile = ref(false)

// Computed
const currentMode = computed(() => {
    if (props.mode && props.mode !== 'auto') return props.mode
    return isMobile.value ? 'sheet' : 'modal'
})

// Methods
function emitClose() {
    emit('update:modelValue', false)
    emit('closed')
}

function checkMobile() {
    isMobile.value = window.innerWidth < 640
}

// Lifecycle
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    z-index: 9999;
    align-items: center; // Centraliza no desktop

    @media (max-width: 640px) {
        align-items: flex-end; // Cola no fundo no mobile (Sheet)
    }
}

.modal-container {
    background: #1f2937; // Dark mode background por padrão
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease-out;

    &.modal {
        border-radius: 1rem;
        margin: 1rem;

        &.xs {
            max-width: 320px;
        }
        &.sm {
            max-width: 480px;
        }
        &.md {
            max-width: 640px;
        }
        &.lg {
            max-width: 900px;
        }
    }

    &.sheet {
        border-radius: 1.5rem 1.5rem 0 0;
        max-height: 90vh;
    }
}

.mobile-handle {
    display: flex;
    justify-content: center;
    padding: 0.75rem 0;
    .handle-bar {
        width: 40px;
        height: 4px;
        background: #4b5563;
        border-radius: 2px;
    }
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
    border-bottom: 1px solid #374151;

    .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }
    .close-btn {
        background: none;
        border: none;
        color: #9ca3af;
        font-size: 1.75rem;
        cursor: pointer;
        &:hover {
            color: white;
        }
    }
}

.modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
}

.modal-footer {
    padding: 1rem 1.25rem;
    border-top: 1px solid #374151;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;

    CustomButton {
        padding: 0.6rem 1.25rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
    }

    .btn-secondary {
        background: transparent;
        color: white;
    }
    .btn-primary {
        background: #4f46e5;
        color: white;
        &:hover {
            background: #4338ca;
        }
    }
}

// ANIMAÇÕES
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
    .modal-container {
        transition: transform 0.3s ease;
    }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    .modal-container {
        transform: translateY(20px);
    } // No modal sobe um pouco
}

@media (max-width: 640px) {
    .modal-fade-enter-from,
    .modal-fade-leave-to {
        .modal-container {
            transform: translateY(100%);
        } // No mobile a gaveta desce toda
    }
}

.modal-scroll {
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: #4b5563;
        border-radius: 10px;
    }
}
</style>
