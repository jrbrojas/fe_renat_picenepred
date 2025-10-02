import { ContextProvider } from './context/ContextProvider.jsx'
import Default from './components/DefaultLayout.jsx'
function App() {

  return (
    <>
 
      <ContextProvider>
        <Default />
      </ContextProvider>
   
    </>
  )
}

export default App
