import '@/App.css';
import { AppRoutes } from '@/routes/AppRoutes.tsx';
import { FluentProvider } from '@fluentui/react-components';

function App() {
  return (
    <FluentProvider>
      <AppRoutes />
    </FluentProvider>
  );
}

export default App;
