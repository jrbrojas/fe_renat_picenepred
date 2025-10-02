import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
//import routes from '../routes';
import { useStateContext } from "../context/ContextProvider";
import { Suspense, lazy, useEffect, useRef } from "react";

import LeftSidebar from '../containers/LeftSidebar'
import Header from "../containers/Header";
//import SuspenseContent from "../containers/SuspenseContent.jsx";

//const Page404 = lazy(() => import('../views/protected/404'))

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/tablero" />;
  }

  const mainContentRef = useRef(null);
  // Scroll back to top on new page load
  useEffect(() => {
      mainContentRef.current.scroll({
          top: 0,
          behavior: "smooth"
        });
    }, []) 
      
  return (
    <div id="defaultLayout" className="drawer lg:drawer-open">
      <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <Header />
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200" ref={mainContentRef}> */}
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200 bg-gradient-to-r from-cenepred-100 via-cenepred-100 to-cenepred-500" ref={mainContentRef}> */}
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200 bg-opacity-100 bg-[linear-gradient(to_right_bottom,rgba(255,255,255,0.609),rgba(0,131,155,0.4)),url('/assets/img/cenepred/cenepred-mapa.png')]" ref={mainContentRef}> */}
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200 bg-opacity-100 bg-[url('/src/assets/img/cenepred/cenepred-mapa.png')]" ref={mainContentRef}> */}
        <main className="flex-1 px-6 pt-4 overflow-y-auto bg-opacity-100 md:pt-4 bg-base-200" ref={mainContentRef}>
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto bg-opacity-100 md:pt-4 bg-base-200 bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.8),rgba(16,71,52,0.8)),url('/src/assets/img/cenepred/cenepred-mapa.png')]" ref={mainContentRef}> */}
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200 bg-mapa-fondo" ref={mainContentRef}> */}
          {/* <div class="bg-cover bg-center h-screen" 
          style="background-image: url('/assets/img/cenepred/cenepred-mapa.png');">              
          </div>    */}
            <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
        {/* <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200" ref={mainContentRef}>
            <Suspense fallback={ <SuspenseContent /> }>
                <Routes>
                    {
                        routes.map((route, key) => {
                            return (
                                <Route
                                    key={key}
                                    exact={true}
                                    path={`${route.path}`}
                                    element={<route.component />}
                                    // element={<Outlet />}
                                />
                            )
                        })
                    }
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Suspense>
            <div className="h-16"></div>
        </main> */}
      </div>
      <LeftSidebar />
    </div>
  );
}
