import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css';
import App from './App.tsx'
import { UsuarioProvider } from './contexts/UsuarioContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </StrictMode>,
)
