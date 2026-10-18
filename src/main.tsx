import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import interno.
import './index.css';
import App from './app/App.tsx';

// tanstack-query
import { QueryProvider } from '@/app/providers/QueryClientProvider.tsx';

// shadcn/ui.
import { TooltipProvider } from '@/shared/components/ui/tooltip.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </QueryProvider>
  </StrictMode>
);
