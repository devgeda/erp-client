import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './app/App.tsx';
import { ToastContextProvider } from '@/app/providers/ToastContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </FluentProvider>
  </StrictMode>
);
