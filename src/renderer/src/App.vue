<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bot, Copy, ArrowRight } from 'lucide-vue-next'

const sourceText = ref('');
const resultText = ref('');
const isLoading = ref(false);

onMounted(() => {
  window.api.onClipboardUpdate((text: string) => {
    sourceText.value = text;
    resultText.value = '';
  });
})
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl bprder border-slate-700/50 rounded-xl p-6 shadow-2xl overflow-hidden flex flex-col text-slate-200">
      <div class="p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div class="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
          <Copy class="w-4 h-4"/>
          <span>Texto original</span>
        </div>
        <textarea
          v-model="sourceText"
          class="w-full bg-transparent resize-none outline-none text-lg text-slate-100 placeholder-slate-600 h-24 scrollbar-hide"
        ></textarea>
      </div>

      <div class="relative p-4 bg-slate-900/50 min-h-[140px]">
        <div class="flex items-center gap-2 mb-2 text-xs font-medium text-cyan-400 uppercase tracking-wider">
          <Bot class="w-3 h-3" />
          <span>Gemini AI</span>
        </div>

        <div v-if="!resultText && !isLoading" class="text-slate-600 text-sm italic">
          Esperando traducción... Presiona Enter para procesar (próximamente).
        </div>

        <div v-else class="prose prose-invert prose-sm max-w-none text-slate-300">
           {{ resultText }}
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
          <span class="bg-slate-800 px-2 py-1 rounded text-slate-400">Enter: Copiar</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
/* Ocultar scrollbar estándar pero permitir scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
