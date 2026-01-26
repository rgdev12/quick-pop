<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Settings, ChevronRight, Key, Cpu, Plus, GripVertical, Trash2, X, Save, Keyboard } from 'lucide-vue-next'

const emit = defineEmits<{
  close: []
  settingsUpdated: []
}>()

// Settings data
const apiKey = ref('')
const models = ref<string[]>([])
const shortcut = ref('')
const newModel = ref('')
const activeSection = ref<string | null>(null)
const isSaving = ref(false)
const isRecording = ref(false)
const recordedKeys = ref('')

// Drag and drop state
const draggedIndex = ref<number | null>(null)

// Settings sections configuration - easily extensible
const sections = [
  { id: 'apikey', title: 'API Key', description: 'Configura tu clave de API de Gemini', icon: Key },
  { id: 'models', title: 'Modelos', description: 'Gestiona el orden y disponibilidad de modelos', icon: Cpu },
  { id: 'shortcut', title: 'Atajo de Teclado', description: 'Personaliza el atajo para activar Quick-Pop', icon: Keyboard },
]

onMounted(async () => {
  const settings = await window.api.getSettings()
  apiKey.value = settings.apiKey
  models.value = [...settings.models]
  shortcut.value = settings.shortcut
})

const toggleSection = (sectionId: string) => {
  activeSection.value = activeSection.value === sectionId ? null : sectionId
}

const saveApiKey = async () => {
  isSaving.value = true
  await window.api.setSetting('apiKey', apiKey.value)
  isSaving.value = false
  emit('settingsUpdated')
}

const saveModels = async () => {
  isSaving.value = true
  await window.api.setSetting('models', models.value)
  isSaving.value = false
  emit('settingsUpdated')
}

const addModel = () => {
  if (newModel.value.trim() && !models.value.includes(newModel.value.trim())) {
    models.value.push(newModel.value.trim())
    newModel.value = ''
    saveModels()
  }
}

const removeModel = (index: number) => {
  models.value.splice(index, 1)
  saveModels()
}

// Drag and drop handlers
const onDragStart = (index: number) => {
  draggedIndex.value = index
}

const onDragOver = (e: DragEvent, index: number) => {
  e.preventDefault()
  if (draggedIndex.value === null || draggedIndex.value === index) return
  
  const items = [...models.value]
  const draggedItem = items[draggedIndex.value]
  items.splice(draggedIndex.value, 1)
  items.splice(index, 0, draggedItem)
  models.value = items
  draggedIndex.value = index
}

const onDragEnd = () => {
  draggedIndex.value = null
  saveModels()
}

// Registro de atajo
const startRecording = () => {
  isRecording.value = true
  recordedKeys.value = 'Presiona las teclas...'
}

const handleShortcutKeydown = (e: KeyboardEvent) => {
  if (!isRecording.value) return
  
  e.preventDefault()
  e.stopPropagation()
  
  const parts: string[] = []
  
  if (e.ctrlKey || e.metaKey) parts.push('CommandOrControl')
  if (e.altKey) parts.push('Alt')
  if (e.shiftKey) parts.push('Shift')
  
  // Obtenemos la tecla real (ignoramos teclas de modificador solas)
  const key = e.key
  if (!['Control', 'Alt', 'Shift', 'Meta'].includes(key)) {
    parts.push(key.toUpperCase())
    
    if (parts.length >= 2) {
      const newShortcut = parts.join('+')
      recordedKeys.value = newShortcut
      isRecording.value = false
    }
  } else {
    recordedKeys.value = parts.join('+') + '+...'
  }
}

const saveShortcut = async () => {
  if (!recordedKeys.value || recordedKeys.value.includes('...')) return
  
  isSaving.value = true
  const success = await window.api.setSetting('shortcut', recordedKeys.value)
  if (success) {
    shortcut.value = recordedKeys.value
    emit('settingsUpdated')
  }
  isSaving.value = false
}

const cancelRecording = () => {
  isRecording.value = false
  recordedKeys.value = ''
}

// Predefined shortcuts
const presetShortcuts = [
  'CommandOrControl+Shift+X',
  'CommandOrControl+Shift+T',
  'CommandOrControl+Alt+T',
  'CommandOrControl+Shift+Q',
]
</script>

<template>
  <div class="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-700/50 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
      <div class="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
        <div class="flex items-center gap-2">
          <Settings class="w-5 h-5 text-cyan-400" />
          <span class="font-semibold text-slate-200">Configuración</span>
        </div>
        <button 
          @click="emit('close')"
          class="text-slate-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-white/5"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <div 
          v-for="section in sections" 
          :key="section.id"
          class="border border-slate-700/50 rounded-lg overflow-hidden"
        >
          <button
            @click="toggleSection(section.id)"
            class="w-full flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <component :is="section.icon" class="w-4 h-4 text-cyan-400" />
              <div class="text-left">
                <div class="text-sm font-medium text-slate-200">{{ section.title }}</div>
                <div class="text-xs text-slate-500">{{ section.description }}</div>
              </div>
            </div>
            <ChevronRight 
              class="w-4 h-4 text-slate-500 transition-transform duration-200"
              :class="{ 'rotate-90': activeSection === section.id }"
            />
          </button>

          <div 
            v-show="activeSection === section.id"
            class="p-4 bg-slate-900/50 border-t border-slate-700/50"
          >
            <!-- Sección de configuración de API Key -->
            <template v-if="section.id === 'apikey'">
              <div class="space-y-3">
                <input
                  v-model="apiKey"
                  type="password"
                  placeholder="Ingresa tu API Key de Gemini"
                  class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  @click="saveApiKey"
                  :disabled="isSaving"
                  class="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Save class="w-4 h-4" />
                  <span>{{ isSaving ? 'Guardando...' : 'Guardar API Key' }}</span>
                </button>
              </div>
            </template>

            <!-- Sección de configuración de Modelos -->
            <template v-else-if="section.id === 'models'">
              <div class="space-y-3">
                <div class="space-y-2">
                  <div
                    v-for="(model, index) in models"
                    :key="model"
                    draggable="true"
                    @dragstart="onDragStart(index)"
                    @dragover="onDragOver($event, index)"
                    @dragend="onDragEnd"
                    class="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 cursor-move hover:border-slate-600 transition-colors"
                    :class="{ 'opacity-50': draggedIndex === index }"
                  >
                    <GripVertical class="w-4 h-4 text-slate-500" />
                    <span class="flex-1 text-sm text-slate-300 truncate">{{ model }}</span>
                    <span class="text-xs text-slate-500 px-2 py-0.5 bg-slate-700 rounded">{{ index + 1 }}</span>
                    <button
                      @click="removeModel(index)"
                      class="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div class="flex gap-2">
                  <input
                    v-model="newModel"
                    type="text"
                    placeholder="Nombre del nuevo modelo"
                    @keydown.enter="addModel"
                    class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    @click="addModel"
                    :disabled="!newModel.trim()"
                    class="flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                  >
                    <Plus class="w-4 h-4" />
                  </button>
                </div>

                <p class="text-xs text-slate-500">
                  Arrastra para reordenar. Los modelos se probarán en orden de prioridad.
                </p>
              </div>
            </template>

            <!-- Sección de configuración de atajo -->
            <template v-else-if="section.id === 'shortcut'">
              <div class="space-y-4">
                <div>
                  <label class="block text-xs text-slate-400 mb-1">Atajo actual</label>
                  <div class="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-400 font-mono">
                    {{ shortcut }}
                  </div>
                </div>

                <div>
                  <label class="block text-xs text-slate-400 mb-1">Nuevo atajo</label>
                  <div 
                    @keydown="handleShortcutKeydown"
                    tabindex="0"
                    class="bg-slate-800 border rounded-lg px-3 py-3 text-sm text-center font-mono transition-colors cursor-pointer"
                    :class="isRecording ? 'border-cyan-500 text-cyan-400 animate-pulse' : 'border-slate-700 text-slate-400'"
                    @click="startRecording"
                  >
                    {{ isRecording ? recordedKeys : 'Haz clic y presiona las teclas' }}
                  </div>
                </div>

                <div>
                  <label class="block text-xs text-slate-400 mb-2">O selecciona uno predefinido</label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="preset in presetShortcuts"
                      :key="preset"
                      @click="recordedKeys = preset; isRecording = false"
                      class="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors font-mono"
                      :class="{ 'border-cyan-500 text-cyan-400': recordedKeys === preset }"
                    >
                      {{ preset.replace('CommandOrControl', 'Ctrl') }}
                    </button>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button
                    v-if="recordedKeys && !recordedKeys.includes('...')"
                    @click="saveShortcut"
                    :disabled="isSaving"
                    class="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <Save class="w-4 h-4" />
                    <span>{{ isSaving ? 'Guardando...' : 'Guardar atajo' }}</span>
                  </button>
                  <button
                    v-if="isRecording || recordedKeys"
                    @click="cancelRecording"
                    class="flex items-center justify-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>

                <p class="text-xs text-slate-500">
                  El atajo se aplicará inmediatamente. Usa Ctrl/Cmd + Shift + otra tecla.
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="px-4 py-3 bg-slate-950/50 border-t border-slate-700/50 text-center text-xs text-slate-500">
        Los cambios se guardan automáticamente
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #334155;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #475569;
}
</style>
