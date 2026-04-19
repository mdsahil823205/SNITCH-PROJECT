import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import './app/App.css'
import { Provider } from 'react-redux'
import stores from './app/App.store'
createRoot(document.getElementById('root')).render(
  <Provider store={stores}>
    <App />
  </Provider>

)
