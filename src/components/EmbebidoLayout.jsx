import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function EmbebidoLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const [fetching, setFetching] = useState(true);


    if (!token) {
    }
    async function boot() {
        setFetching(true);
        try {
            if (
                !import.meta.env.VITE_USER_EMAIL
                || !import.meta.env.VITE_USER_PASSWORD
            ) {
                throw new Error('Falta configurar las variables de entorno (VITE_USER_EMAIL y VITE_USER_PASSWORD)');
            }
            const payload = {
                email: import.meta.env.VITE_USER_EMAIL,
                password: import.meta.env.VITE_USER_PASSWORD,
            };
            const { data } = await axiosClient.post("/login", payload);
            setUser(data.user);
            setToken(data.token);
        } catch (err) {
            if (err.response) {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            }
            return <Navigate to="/tablero" />;
        } finally {
            setFetching(false);
        }
    }

    useEffect(() => {
        boot();
    }, [])

    if (fetching) return (
        <div className="flex w-vw h-dvh justify-center items-center">
            <div className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="drawer lg:drawer-open">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <div className="flex flex-col drawer-content">
                <main className="flex-1 px-6 pt-4 overflow-y-auto bg-opacity-100 md:pt-4 bg-base-200">
                    <Outlet />
                </main>
                {notification && <div className="notification">{notification}</div>}
            </div>
        </div>
    );
}
