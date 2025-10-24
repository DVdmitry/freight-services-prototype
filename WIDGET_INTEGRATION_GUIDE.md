# AI Form Copilot - Интеграция в React

## 1. `index.html`

```html
<body>
  <div id="root"></div>

  <script>
    window.aiFormCopilotConfig = {
      position: { bottom: 20, right: 20 },
      zIndex: 999999
    };
  </script>

  <script type="module" src="http://127.0.0.1:5004/widget-build/index.js"></script>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

## 2. `src/web-components.d.ts` (новый файл)

```typescript
import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ai-form-copilot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
```

## 3. `src/App.tsx` (в начало файла)

```typescript
import type {} from './web-components.d.ts';
import React from 'react';
// ... остальное
```

## 4. В JSX главного компонента

```tsx
<ai-form-copilot></ai-form-copilot>
```

Всё. Виджет работает на всех страницах.
