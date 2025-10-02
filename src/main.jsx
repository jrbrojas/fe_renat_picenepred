import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import router from "./router.jsx";
import { ContextProvider } from './context/ContextProvider.jsx'

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 12, // 12 horas frescos
      cacheTime: 1000 * 60 * 60 * 12  // 12 horas en caché aunque no haya listeners
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />        
    {/* <App /> */}
    </ContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
)
