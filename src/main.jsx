import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { ChatProvider } from "./context/chatContext";
import { FinancialRecommendationsProvider } from './context/recommendationsContext.jsx'
import { FinancialLessonsProvider } from './context/LessonContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <FinancialRecommendationsProvider>
      <FinancialLessonsProvider>
      <ChatProvider>
      <App />
      </ChatProvider>
      </FinancialLessonsProvider> 
      </FinancialRecommendationsProvider>
      </AuthProvider>
   
  </React.StrictMode>,
)
