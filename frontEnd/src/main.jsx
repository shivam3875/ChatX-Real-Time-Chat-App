import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Components/Context/AuthContext'
import { SocketContextProvider } from './Components/Context/SocketCoontext.jsx'
import { UsersContextProvider } from './Components/Context/UsersContext.jsx'
import { SelectedUserContextProvider } from './Components/Context/SelectedUserContext.jsx'
import { ConversationContextProvider } from './Components/Context/ConversationContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <UsersContextProvider>
            <SelectedUserContextProvider>
              <ConversationContextProvider>
                  <App/>
              </ConversationContextProvider>
            </SelectedUserContextProvider>
          </UsersContextProvider>          
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
)

