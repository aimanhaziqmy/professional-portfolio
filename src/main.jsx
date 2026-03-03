import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');

// Because Firebase loads dynamic content asynchronously, hydration will always mismatch 
// and cause duplicate elements in React 18. We clear the SEO DOM and mount normally.
rootElement.innerHTML = '';
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
