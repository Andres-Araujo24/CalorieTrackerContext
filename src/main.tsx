import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActivityProvider } from './Context/ActivityContext.tsx'

//Para que funcione el Context, rodeamos el App con las etiquetas de ActivityProvider. Ahora los datos que vayamos teniendo en el provider, estaran disponibles en toda la aplicacion, incluyendo state y dispatch.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </StrictMode>,
)
