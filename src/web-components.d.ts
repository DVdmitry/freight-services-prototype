import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ai-form-copilot': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
