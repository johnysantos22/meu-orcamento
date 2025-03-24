import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Orcamento from './Components/Orcamentos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Orcamento />
 
  </StrictMode>,
)
