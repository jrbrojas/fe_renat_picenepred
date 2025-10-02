import Header from './Header'
import { Outlet, Route, Routes } from 'react-router-dom/dist';
import routes from '../routes';
import React, { Suspense, lazy, useEffect, useRef } from 'react'
import SuspenseContent from './SuspenseContent'
import Dashboard from '../features/dashboard/index'

const Page404 = lazy(() => import('../views/protected/404'))

const PageContent = () => {
    const mainContentRef = useRef(null);
    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
          });
      }, [])    

    return (
        <div className="flex flex-col drawer-content">
            <Header />
            <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200" ref={mainContentRef}>
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

                        {/* Redirecting unknown url to 404 page */}
                        <Route path="*" element={<Page404 />} />
                        {/* <Route path="*" element={<Dashboard />} /> */}
                    </Routes>
                   
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
    )
}

export default PageContent