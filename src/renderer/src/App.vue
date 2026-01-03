<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Bot, Copy, GripHorizontal, X } from 'lucide-vue-next'
import { GoogleGenerativeAI } from '@google/generative-ai'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

const SYSTEM_PROMPT = `
Eres un tutor experto de inglés llamado "Quick-Pop". 
Tu objetivo es traducir el texto que te envíe el usuario y explicar brevemente puntos clave de gramática o vocabulario si es necesario, no te presentes
ve directamente al punto.
Formato de respuesta deseado (usa Markdown):
1. **Traducción**: La traducción directa y natural al español.
2. **Notas**: (Opcional) Si hay modismos, phrasal verbs o estructuras complejas, explícalas muy brevemente en viñetas.
Mantén un tono conciso, útil y amigable. No te extiendas demasiado, es una app rápida.
`

const sourceText = ref('');
const resultText = ref('');
const isLoading = ref(false);
const inputRef = ref<HTMLTextAreaElement | null>(null)

onMounted(() => {
  window.api.onClipboardUpdate((text: string) => {
    sourceText.value = text;
    resultText.value = '';
  });

  window.addEventListener('focus', focusInput)
})

const closeApp = () => {
  window.api.hideWindow()
}

const translate = async () => {
  if (!sourceText.value.trim()) return;

  isLoading.value = true;
  resultText.value = '';

  try {
    const prompt = `${SYSTEM_PROMPT}\n\nTexto a traducir:\n"${sourceText.value}"`
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    resultText.value = md.render(text);
  } catch (error) {
    console.error(error)
    resultText.value = `<span class="text-red-400">Error: No se pudo conectar con Gemini. Verifica tu API Key.</span>`
  } finally {
    isLoading.value = false;
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  // Enter sin Shift = Traducir
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault() // Evitar salto de línea
    translate()
  }
  // Esc = Cerrar
  if (e.key === 'Escape') {
    closeApp()
  }
}

const focusInput = () => {
  nextTick(() => {
    if (inputRef.value) {
      // Un pequeño retraso asegura que la animación de la ventana terminó
      setTimeout(() => {
        inputRef.value?.focus()
        inputRef.value?.select()
      }, 50) 
    }
  })
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center overflow-y-auto custom-scrollbar max-h-[calc(100vh-8px)]">
    <div class="rounded-t-xl h-8 w-full bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-3 border-b border-slate-700/50 drag-region cursor-move select-none">
      <div class="flex items-center gap-2 text-xs font-bold text-slate-400">
        <GripHorizontal class="w-3 h-3" />
        <span>Quick-Pop</span>
      </div>
      <button @click="closeApp" class="text-slate-500 hover:text-red-400 transition-colors no-drag p-1 rounded-md hover:bg-white/5">
        <X class="w-3 h-3" />
      </button>
    </div>

    <div class="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl bprder border-slate-700/50 rounded-b-xl p-6 shadow-2xl overflow-hidden flex flex-col text-slate-200">
      <div class="p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div class="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
          <Copy class="w-4 h-4"/>
          <span>Texto original</span>
        </div>
        <textarea
          ref="inputRef"
          v-model="sourceText"
          @keydown="handleKeydown"
          class="w-full bg-transparent resize-none outline-none text-lg text-slate-100 placeholder-slate-600 h-24 custom-scrollbar"
        ></textarea>
      </div>

      <div class="relative p-4 bg-slate-900/50 overflow-y-auto min-h-32 max-h-52 custom-scrollbar">
        <div class="flex items-center gap-2 mb-2 text-xs font-medium text-cyan-400 uppercase tracking-wider">
          <Bot class="w-3 h-3" />
          <span>Gemini AI</span>
        </div>

        <div v-if="!resultText && !isLoading" class="text-slate-600 text-sm italic">
          Esperando comando...
        </div>

        <div
          v-else
          class="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed"
          v-html="resultText">
        </div>

        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
          <div class="flex gap-1">
            <div class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style="animation-delay: 0s;"></div>
            <div class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style="animation-delay: 0.2s;"></div>
            <div class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style="animation-delay: 0.4s;"></div>
          </div>
        </div>
      </div>

      <div class="px-4 py-2 bg-slate-950/30 border-t bortder-slate-800/50 flex justify-between items-center text-xs text-slate-500">
        <span>Traducido por Gemini AI</span>
        <div class="flex gap-2">
          <span class="bg-slate-800 px-2 py-1 rounded text-slate-400">Esc: Cerrar</span>
          <span class="bg-slate-800 px-2 py-1 rounded text-slate-400">Enter: Traducir</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.drag-region {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}

/* CUSTOM SCROLLBAR (Minimalista) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #334155; /* Slate-700 */
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #475569; /* Slate-600 */
}
</style>
