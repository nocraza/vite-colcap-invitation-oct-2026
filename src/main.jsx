import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthInvitation from './Auth__Invitation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AuthInvitation />
  </StrictMode>,
)
