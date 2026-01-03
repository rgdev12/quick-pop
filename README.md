# Quick-Pop 🚀

**Quick-Pop** es un traductor de texto rápido e inteligente basado en IA que utiliza los modelos de Gemini AI para proporcionar traducciones instantáneas entre inglés y español. La aplicación está diseñada como una ventana emergente (pop-up) que se integra perfectamente con tu flujo de trabajo. (La aplicación es de uso personal, puedes modificar el código para adaptarlo a tus necesidades)

## 🎯 Características

- ✨ Traducción instantánea con IA (Gemini AI)
- 🎨 Interfaz moderna y minimalista con Tailwind CSS
- ⚡ Atajos de teclado (Enter para traducir, Esc para cerrar)
- 📋 Soporte para múltiples modelos de IA con fallback automático
- 📦 Comando para ocultar/mostrar la aplicación (Ctrl/Command + Shift + X)

## 🛠️ Tecnologías

Esta aplicación está construida con:

- **[Electron](https://www.electronjs.org/)** - Framework para aplicaciones de escritorio multiplataforma
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progresivo para la interfaz de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Vite](https://vitejs.dev/)** - Herramienta de construcción y desarrollo ultrarrápida
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS de utilidades
- **[Google Generative AI](https://ai.google.dev/)** - SDK de Gemini AI para traducciones inteligentes
- **[Lucide Vue](https://lucide.dev/)** - Iconos SVG para Vue
- **[Markdown-it](https://github.com/markdown-it/markdown-it)** - Parser de Markdown para renderizar respuestas

## 📦 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/quick-pop.git
cd quick-pop
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:

```env
VITE_GEMINI_API_KEY=tu_api_key_de_gemini_aquí
```

> **Nota:** Puedes obtener tu API key de Gemini en [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Ejecutar en modo desarrollo

```bash
pnpm dev
```

## 🏗️ Build (Compilación)

Para crear un ejecutable de la aplicación para tu plataforma:

```bash
# Para Windows
pnpm build:win

# Para macOS
pnpm build:mac

# Para Linux
pnpm build:linux
```

Los archivos compilados se generarán en la carpeta `dist/`.

## 💻 IDE Recomendado

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 📝 Uso

1. Inicia la aplicación
2. Ocultar o mostrar la aplicación con la tecla con la combinación **Ctrl/Command + Shift + X**
3. Escribe o pega el texto que deseas traducir
4. Presiona **Enter** para obtener la traducción
5. Presiona **Esc** para cerrar la ventana

---

Desarrollado con ❤️ usando Electron, Vue y Gemini AI
