# Quick-Pop 🚀

**Quick-Pop** es un traductor de texto rápido e inteligente basado en IA que utiliza los modelos de Gemini AI para proporcionar traducciones instantáneas entre inglés y español. La aplicación está diseñada como una ventana emergente (pop-up) que se integra perfectamente con tu flujo de trabajo. (La aplicación fue creada para uso personal, pero puedes hacer un fork y modificar el código para adaptarlo a tus necesidades)

## 🎯 Características

- ✨ Traducción instantánea con IA (Gemini AI)
- 🎨 Interfaz moderna y minimalista con Tailwind CSS
- ⚡ Atajos de teclado (Enter para traducir, Esc para cerrar)
- 📋 Soporte para múltiples modelos de IA con fallback automático
- 📦 Comando para ocultar/mostrar la aplicación (Ctrl/Command + Shift + X)
- ⚙️ Configuración de API key directamente desde la aplicación
- 🔧 Gestión de modelos de IA (agregar, eliminar, reordenar)
- ⌨️ Configuración del atajo de teclado para ocultar/mostrar la aplicación

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

### 3. Ejecutar en modo desarrollo

```bash
pnpm dev
```

> **Nota:** Al iniciar la aplicación por primera vez, se te pedirá que configures tu API key de Gemini. Puedes obtener tu API key en [Google AI Studio](https://makersuite.google.com/app/apikey)

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
2. Configurar la API key de Gemini en la configuración
3. Ocultar o mostrar la aplicación con la combinación de teclas **Ctrl/Command + Shift + X** (puedes cambiarlo en la configuración)
4. Escribe o pega el texto que deseas traducir
5. Presiona **Enter** para obtener la traducción
6. Presiona **Esc** para cerrar la ventana

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas agregar una nueva característica o mejorar la aplicación, sigue estos pasos:

1. **Fork el repositorio** - Crea una copia del proyecto en tu cuenta de GitHub
2. **Clona tu fork** - `git clone https://github.com/tu-usuario/quick-pop.git`
3. **Crea una rama** - `git checkout -b feature/nueva-caracteristica`
4. **Realiza tus cambios** - Implementa tu nueva característica o mejora
5. **Prueba tus cambios** - Asegúrate de que todo funcione correctamente con `pnpm dev`
6. **Haz commit** - `git commit -m "feat: descripción de tu característica"`
7. **Push a tu fork** - `git push origin feature/nueva-caracteristica`
8. **Abre un Pull Request** - Describe los cambios realizados y su propósito

### Guías de estilo

- Usa TypeScript para todo el código nuevo
- Sigue las convenciones de código existentes
- Incluye comentarios descriptivos cuando sea necesario
- Asegúrate de que el código pase el linter (`pnpm lint`)

---

Desarrollado con ❤️ usando Electron, Vue y Gemini AI
