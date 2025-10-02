import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ContextProvider } from './context/ContextProvider.jsx'

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./views/Login'))

function App() {
  // const { user, token, setUser, setToken, notification } = useStateContext();

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }
  {/* <Route path="*" element={<Dashboard />} /> */}

  return (
    <>
      {/* <ContextProvider> */}
      <Router>
        <Routes>

          <Route path="/renat/login" element={<Login />} />
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          {/* <Route path="*" element={<Navigate to={token ? "/app/dashboard" : "/login"} replace />}/> */}
        </Routes>
      </Router>
      {/* </ContextProvider> */}
    </>
  )
}

export default App
