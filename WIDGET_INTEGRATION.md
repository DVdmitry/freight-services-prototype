# Подключение стороннего виджета в React

## Быстрый старт

### 1. Добавьте скрипт в index.html

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  
  <!-- Конфигурация виджета (опционально) -->
  <script>
    window.aiFormCopilotConfig = {
      position: { bottom: 20, right: 20 },
      zIndex: 999999
    };
  </script>
  
  <!-- Виджет ДО React -->
  <!-- Production -->
  <script type="module" src="https://ai-form-copilot-eu.web.app/widget-build/index.js"></script>
  <!-- Development -->
  <!-- <script type="module" src="http://127.0.0.1:5004/widget-build/index.js"></script> -->
  
  <!-- React приложение -->
  <script type="module" src="/src/main.tsx"></script>
</body>
```

### 2. Создайте типы для TypeScript

```typescript
// src/web-components.d.ts
import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ai-form-copilot': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
```

### 3. Используйте в компоненте

```tsx
// src/App.tsx
import type {} from './web-components.d.ts'; // В НАЧАЛЕ файла

function App() {
  return (
    <div>
      {/* В конце, перед закрывающим </div> */}
      <ai-form-copilot></ai-form-copilot>
    </div>
  );
}
```