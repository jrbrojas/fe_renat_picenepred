import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useRef } from "react";

export default function EmbebidoLayout() {
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
                <main className="flex-1 px-6 pt-4 overflow-y-auto bg-opacity-100 md:pt-4 bg-base-200" ref={mainContentRef}>
                    <Outlet />
                </main>
                {notification && <div className="notification">{notification}</div>}
            </div>
        </div>
    );
}
