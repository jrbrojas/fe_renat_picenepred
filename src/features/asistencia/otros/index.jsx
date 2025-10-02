import DashboardStats from './components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { useEffect, useState } from 'react'
import Mapa from '../../mapa/Mapa'
import NestedTable from '../pprrd/components/NestedTable'

import MyBarChartpprrs from './components/MyBarChartpprrd'
import DashboardTableResumenpprrd from './components/DashboardTableResumenpprrd'
//*import NestedTableNiveles from '../pprrd/components/NestedTableNiveles'
import { useResumen } from '../../../hooks/useResumen';
import { useNumeros } from '../../../hooks/useExpande';
import NestedPeriodoInicio from './components/NestedPeriodoInicio'
import NestedDepartamentoInicio from './components/NestedDepartamentoInicio'

const statsData = [
    { title: "PEC", value: "0", icon: <CreditCardIcon className='w-8 h-8' />, description: "↗︎ Sesiones" },
    { title: "REAS_POB", value: "0", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ Sesiones" },
    { title: "OTROS", value: "0", icon: <CircleStackIcon className='w-8 h-8' />, description: "↗︎ Sesiones" },
    { title: "ACT. REPRESENTACIÓN", value: "0", icon: <CircleStackIcon className='w-8 h-8' />, description: "↗︎ Sesiones" },
    // {title : "PPRRD", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
]

const Index = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [nombreDep, setNombreDep] = useState('');
    const [loading, setLoading] = useState(false);


    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0');

    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        //console.log('Dentro del componente PPRRD : ', event.target.value); // Do something with the selected value
    };
    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue);
        //console.log('Dentro del componente PPRRD handleUbigeoReset : ', newValue); // Do something with the selected value
    };



    const { data: dr, isLoading: isLoadingConteo } = useResumen(ubigodepartamento, 'at_periodos_otros');

    useEffect(() => {
        if (!isLoadingConteo && dr) {
            const { total_pec, total_reas_pob, total_otros, total_act_rep, departamento } = dr[0];


            setNombreDep(departamento)

            setAsistencias([
                {
                    title: "PEC", value: useNumeros(total_pec),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Sesiones",
                },
                {
                    title: "REAS_POB", value: useNumeros(total_reas_pob),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Sesiones",
                },
                {
                    title: "OTROS", value: useNumeros(total_otros),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Sesiones",
                },
                {
                    title: "ACT. REPRESENTACIÓN", value: useNumeros(total_act_rep),
                    icon: <CircleStackIcon className='w-8 h-8' />,
                    description: "↗︎ Sesiones"
                },

            ]);
        }
    }, [dr, isLoadingConteo]);

    return (
        <>
            <div className="grid m-4 font-sans">
                <div className="m-4">
                    {/* <div className="p-8 pl-0 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold"> Dashboard </h1>
        </div> */}
                    <p className="text-3xl font-bold mb-8">
                        OTRAS ASISTENCIAS TÉCNICAS Y ACTIVIDADES DE REPRESENTACIÓN {(nombreDep) ? '- REGIÓN ' + nombreDep : ' - NIVEL NACIONAL'}</p>

                    <div className="flex flex-col lg:flex-row">

                        <div className="grid w-full gap-3 pt-2 lg:grid-cols-4">
                            {
                                asistencias.map((d, k) => {
                                    return (
                                        <DashboardStats key={k} {...d} colorIndex={k} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="grid w-full gap-3 pt-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-[65%_35%] mt-8">
                        <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[40%_60%] 2xl:grid-cols-2">

                            <div className="border-2 shadow-md stats bg-base-200/50">
                                <div className="py-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                                    <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset} />

                                </div>
                            </div>
                            <div className="border-2 shadow-md stats bg-base-200/100">
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">OTRAS ASISTENCIAS POR PERIODO</h1>
                                    <MyBarChartpprrs ubigeo={ubigodepartamento} instrumento='PPRRD' />
                                    <br />
                                    <NestedPeriodoInicio ubigeo={ubigodepartamento} />
                                </div>

                            </div>
                        </div>
                        <div className="w-full border-2 shadow-md stats bg-base-200/100">
                            <div className="py-6 pr-2 pl-2 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold text-center">OTRAS ASISTENCIAS POR DEPARTAMENTO</h1>

                                <NestedDepartamentoInicio ubigeo={ubigodepartamento} />
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-6 pt-8 mt-2 lg:grid-cols-2 md:grid-cols-2">
                        {/*<select className="w-full select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                    <option value="0">TODOS LOS DEPARTAMENTOS</option>
                    {departamento.map((data) => (
                        <option key={data.id} value={data.ubigeo}>
                            {"DEPARTAMENTO DE "+data.name}
                        </option>
                    ))}
                </select>
                <div className="border-2 p-6 shadow-md rounded-xl">
                <h1 className="mb-4 text-lg font-bold text-center">PAA POR NIVELES DE GOBIERNO</h1>
                    <NestedTableNiveles ubigeo={ubigodepartamento} instrumento='PAA' departamento={nombreDep}/>
                         
                 </div>*/}
                    </div>



                </div>
            </div>
        </>
    )
}

export default Index
