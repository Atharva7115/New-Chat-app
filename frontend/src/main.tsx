import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme ,ThemeProvider  } from '@mui/material'
import { AuthProvider } from './context/AuthContext.tsx'
import {BrowserRouter ,} from "react-router-dom"
import { Toaster } from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;
const theme = createTheme({typography : { fontFamily : "Roboto serif", allVariants :  {color : "White"}} })
createRoot(document.getElementById('root')!).render(
  <StrictMode>
<AuthProvider>
  <BrowserRouter>
   < ThemeProvider theme={theme}>
   <Toaster position="top-right" />
   <App />
   </ThemeProvider>
  </BrowserRouter>
</AuthProvider>
  </StrictMode>,
)
