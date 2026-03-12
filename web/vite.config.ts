/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // Isso resolve o erro da imagem 2 para o Vite
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Injeta as variáveis em todos os arquivos .vue automaticamente
                additionalData: `@use "@/styles/_variables.scss" as *;`
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom'
    }
})
