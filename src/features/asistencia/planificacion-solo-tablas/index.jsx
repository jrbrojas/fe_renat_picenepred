import DashboardStats from './components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { useEffect, useState } from 'react'
import Mapa from '../../mapa/Mapa'
import { useResumen } from '../../../hooks/useResumen';
import { useNumeros } from '../../../hooks/useExpande';
import NestedPeriodoPlanificacion from './components/NestedPeriodoPlanificacion'
import NestedDepartamentoPlanificacion from './components/NestedDepartamentoPlanificacion'
import MyBarChartPlanificacion from './components/MyBarChartPlanificacion'

const statsData = [
    { title: "PRDC", value: "0", icon: <CreditCardIcon className='w-8 h-8' />, description: "↗︎ Asistencias" },
    { title: "POT", value: "0", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ Asistencias" },
    { title: "PAT", value: "0", icon: <CircleStackIcon className='w-8 h-8' />, description: "↗︎ Asistencias" },
    { title: "PDU", value: "0", icon: <CircleStackIcon className='w-8 h-8' />, description: "↗︎ Asistencias" },
]

const Index = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [nombreDep, setNombreDep] = useState('');
    const [loading, setLoading] = useState(false);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0');

    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue);
    };

    const { data: dr, isLoading: isLoadingConteo } = useResumen(ubigodepartamento, 'departamentos_planificacion');

    useEffect(() => {
        if (!isLoadingConteo && dr && dr.length > 0) {
            const total_prdc = dr.reduce((sum, d) => sum + (parseInt(d.prdc) || 0), 0);
            const total_pot = dr.reduce((sum, d) => sum + (parseInt(d.pot) || 0), 0);
            const total_pat = dr.reduce((sum, d) => sum + (parseInt(d.pat) || 0), 0);
            const total_pdu = dr.reduce((sum, d) => sum + (parseInt(d.pdu) || 0), 0);

            setNombreDep(ubigodepartamento === '0' ? '' : dr[0]?.dpto || '');

            setAsistencias([
                {
                    title: "PDC", value: useNumeros(total_prdc),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Asistencias",
                },
                {
                    title: "POT", value: useNumeros(total_pot),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Asistencias",
                },
                {
                    title: "PAT", value: useNumeros(total_pat),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Asistencias",
                },
                {
                    title: "PDU", value: useNumeros(total_pdu),
                    icon: <CircleStackIcon className='w-8 h-8' />,
                    description: "↗︎ Asistencias"
                },
            ]);
        }
    }, [dr, isLoadingConteo, ubigodepartamento]);

    return (
        <>
            <div className="grid m-4 font-sans">
                <div className="m-4">
                    <p className="mb-8 text-3xl font-bold">
                        PLANIFICACIÓN TERRITORIAL Y ESTRATÉGICA {(nombreDep) ? '- REGIÓN ' + nombreDep : ' - NIVEL NACIONAL'}
                    </p>

                    {/*
                    <div className="flex flex-col lg:flex-row">
                        <div className="grid w-full gap-3 pt-2 lg:grid-cols-4">
                            {asistencias.map((d, k) => (
                                <DashboardStats key={k} {...d} colorIndex={k} />
                            ))}
                        </div>
                    </div>
                            */}

                    <div className="grid w-full gap-3 pt-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mt-8">
                        <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
                            {/*
                            <div className="border-2 shadow-md stats bg-base-200/50">
                                <div className="py-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                                    <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset} />
                                </div>
                            </div>
                            */}
                            <div className="w-full border-2 shadow-md stats bg-base-200/100">
                                <div className="py-6 pl-2 pr-2 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">ASISTENCIAS TECNICAS POR DEPARTAMENTO</h1>
                                    <NestedDepartamentoPlanificacion ubigeo={ubigodepartamento} />
                                </div>
                            </div>
                            <div className="border-2 shadow-md stats bg-base-200/100">
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                    {/*
                                    <h1 className="mb-4 text-lg font-bold text-center">ASISTENCIAS TECNICAS POR PERIODO</h1>
                                    <MyBarChartPlanificacion ubigeo={ubigodepartamento} />
                                    <br />
                                    */}
                                    <NestedPeriodoPlanificacion ubigeo={ubigodepartamento} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
