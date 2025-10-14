import DashboardStats from './components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/ContextProvider'
import Mapa from '../../mapa/Mapa'
import NestedTable from './components/NestedTable';
import MyBarChartpprrs from './components/MyBarChartpprrd'
import DashboardTableResumenpprrd from './components/DashboardTableResumenpprrd';
import NestedTableNiveles from './components/NestedTableNiveles'
import Tabulador from './components/tabs'
import { useExpande, useNumeros } from '../../../hooks/useExpande';

const statsData = [
    { title: "PPRRD Aprobados", value: "0", icon: <CreditCardIcon className='w-8 h-8' />, description: "↗︎ asistencias" },
    { title: "PPRRD Vigentes", value: "0", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ asistencias" },
    { title: "Entidades Asistidas", value: "0", icon: <CircleStackIcon className='w-8 h-8' />, description: "↗︎ asistencias" },


]

const Pprrd = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [asistenciasdetalles, setAsistenciasdetalles] = useState([]);
    const [depSeleccionado, setDepseleccionado] = useState('');

    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0');
    const [nombreDep, setNombreDep] = useState('');

    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        //console.log('Dentro del componente PPRRD : ', event.target.value); // Do something with the selected value
    };
    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue);
        setNombreDep('');
        //console.log('Dentro del componente PPRRD handleUbigeoReset : ', newValue); // Do something with the selected value
    };



    const { data: dr, isLoading: isLoadingConteo } = useExpande(ubigodepartamento, 1, 'resumen-at');
    useEffect(() => {
        if (!isLoadingConteo && dr) {
            const { dpto, pprrd_a, pprrd_v, entidades_asistidas } = dr[0];




            setDepseleccionado(dpto)

            setAsistencias([
                {
                    title: "PPRRD Aprobados", value: useNumeros(pprrd_a),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Aprobados",
                },
                {
                    title: "PPRRD Vigentes", value: useNumeros(pprrd_v),
                    icon: <UserGroupIcon className="w-8 h-8" />,
                    description: "↗︎ Vigentes",
                },
                {
                    title: "Entidades asistidas", value: useNumeros(entidades_asistidas),
                    icon: <CircleStackIcon className="w-8 h-8" />,
                    description: "↗︎ Entidades",
                }

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
                        PLAN DE PREVENCIÓN Y REDUCCIÓN DEL RIESGO DE DESASTRES (PPRRD)  {(depSeleccionado) ? '- REGIÓN ' + depSeleccionado : ' - NIVEL NACIONAL'}  </p>

                    <div className="flex flex-col lg:flex-row">
                        {/** ---------------------- Different stats content 1 ------------------------- */}
                        <div className="grid w-full gap-3 pt-2 lg:grid-cols-3">
                            {
                                asistencias.map((d, k) => {
                                    return (
                                        <DashboardStats key={k} {...d} colorIndex={k} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/*<div className="grid w-full gap-3 pt-2 grid-cols-1  lg:grid-cols-2  2xl:grid-cols-3 mt-8"> */}
                    <div className="grid w-full gap-3 pt-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mt-8">

                        <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[500px_1fr]">
                            <div className="border-2 shadow-md stats bg-base-200/50">
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                                    <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset} />
                                </div>
                            </div>
                            <div className="border-2 shadow-md stats bg-base-200/100">
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">PPRRD APROBADOS Y VIGENTES {nombreDep}</h1>
                                    <MyBarChartpprrs ubigeo={ubigodepartamento} instrumento='PPRRD' />
                                    <hr className='mt-8 mb-8' />
                                    <h1 className="mb-4 text-lg font-bold text-center">PPRRD POR PERIODO {nombreDep}</h1>
                                    <DashboardTableResumenpprrd ubigeo={ubigodepartamento} instrumento={'PPRRD'} />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="grid gap-6 pt-8 mt-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1">
                        <div className="border-2 shadow-md rounded-xl">
                            <Tabulador ubigeo={ubigodepartamento} />


                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Pprrd;
