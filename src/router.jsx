import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Dashboard from "./views/protected/Dashboard";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import NotFound from "./views/NotFound";

import Pprrd from "./views/protected/asistencia/Pprrd";
import Fortalecimiento from "./views/protected/asistencia/Fortalecimiento";
import Paa from "./views/protected/asistencia/Paa";
import Evaluadores from "./views/protected/asistencia/Evaluadores";
import Buenaspracticas from "./views/protected/Buenaspracticas";
import Evar from "./views/protected/asistencia/Evar";
import Otros from "./views/protected/asistencia/Otros";
import EmbebidoLayout from "./components/EmbebidoLayout";
import PlanificacionSoloTablas from "./views/protected/asistencia/PlanificacionSoloTabla"
import FeaturePprrdRa from './features/asistencia/pprrdra/index';
import FeatureFasesPprd from './features/asistencia/entidadesasistidas/index';
import FeatureEntidadesAsistidas from './features/asistencia/fasespprd/index';

// ⚠️ Planificación por lazy import con RUTA RELATIVA (no "src/..."):
const Planificacion = lazy(() => import("./views/protected/asistencia/Planificacion"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/tablero/inicio",
                element: <Dashboard />,
            },
            {
                path: "/tablero/cursos",
                element: <Fortalecimiento />,
            },
            {
                path: "/tablero/pprrd",
                element: <Pprrd />,
            },
            {
                path: "/tablero/paa",
                element: <Paa />,
            },
            {
                path: "/tablero/evar",
                element: <Evar />,
            },
            {
                path: "/tablero/planificacion",
                element: (
                    <Suspense fallback={<div>Cargando planificación…</div>}>
                        <Planificacion />
                    </Suspense>
                ),
            },

            {
                path: "/tablero/otros",
                element: <Otros />,
            },
            {
                path: "/tablero/evaluadores",
                element: <Evaluadores />,
            },
            {
                path: "/tablero/buenaspracticas",
                element: <Buenaspracticas />,
            },
        ],
    },
    {
        path: '/',
        element: <EmbebidoLayout />,
        children: [
            {
                path: "/tablero/inicio/pi",
                element: <Dashboard />,
            },
            {
                path: '/tablero/pprrdra/pi',
                element: <FeaturePprrdRa />
            },
            {
                path: '/tablero/pprrd/pi',
                element: <Pprrd />
            },
            {
                path: '/tablero/entidadesasistidas/pi',
                element: <FeatureEntidadesAsistidas />
            },
            {
                path: '/tablero/fasespprd/pi',
                element: <FeatureFasesPprd />
            },
            {
                path: "/tablero/otros/pi",
                element: <Otros />,
            },
            {
                path: "/tablero/paa/pi",
                element: <Paa />,
            },
            {
                path: "/tablero/cursos/pi",
                element: <Fortalecimiento />,
            },
            {
                path: "/tablero/evaluadores/pi",
                element: <Evaluadores />,
            },
            {
                path: "/tablero/evar/pi",
                element: <Evar />,
            },
            {
                path: "/tablero/planificacion-instrumentos/pi",
                element: <PlanificacionSoloTablas />
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/tablero",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
