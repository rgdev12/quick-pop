<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, X } from 'lucide-vue-next'

const emit = defineEmits<{
  complete: []
  close: []
}>()

const closeWindow = () => {
  emit('close')
}

const apiKey = ref('')
const isLoading = ref(false)
const error = ref('')

const saveAndContinue = async () => {
  if (!apiKey.value.trim()) {
    error.value = 'Por favor ingresa una API key válida'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await window.api.setSetting('apiKey', apiKey.value.trim())
    emit('complete')
  } catch (e) {
    error.value = 'Error al guardar la configuración'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 p-6 relative">
    <!-- Botón de cerrar -->
    <button
      @click="closeWindow"
      class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all"
      title="Cerrar"
    >
      <X class="w-5 h-5" />
    </button>
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-slate-100 mb-2">Configura tu API Key</h1>
        <p class="text-slate-400 text-sm">
          Para usar Quick-Pop necesitas una API key de Google Gemini AI
        </p>
      </div>

      <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-300 mb-2">
            Gemini API Key
          </label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="AIza..."
            @keydown.enter="saveAndContinue"
            class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
        </div>

        <div v-if="error" class="mb-4 text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button
          @click="saveAndContinue"
          :disabled="isLoading || !apiKey.trim()"
          class="w-full flex items-center justify-center gap-2 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:shadow-none"
        >
          <span>{{ isLoading ? 'Guardando...' : 'Continuar' }}</span>
          <ArrowRight v-if="!isLoading" class="w-4 h-4" />
        </button>

        <p class="mt-4 text-center text-xs text-slate-500">
          ¿No tienes una API key? Consíguela en
          <a 
            href="https://aistudio.google.com/apikey" 
            target="_blank"
            class="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Google AI Studio
          </a>
        </p>
      </div>

      <p class="mt-6 text-center text-xs text-slate-600">
        Tu API key se guarda localmente y nunca se comparte
      </p>
    </div>
  </div>
</template>
