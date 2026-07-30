import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes.tsx';
import { FluentProvider } from '@fluentui/react-components';

function App() {
  return (
    <BrowserRouter>
      <FluentProvider>
        <AppRoutes />
      </FluentProvider>
    </BrowserRouter>
  );
}

export default App;
