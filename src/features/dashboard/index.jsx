import DashboardStats from "./components/DashboardStats";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";



import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import Mapa from "../mapa/Mapa";
import MyBarChart from "./components/MyBarChart";
import LineChartComponent from "./components/LineChartComponent";
import NestedTableInicio from "./components/NestedTableInicio";
import NestedPeriodoInicio from "./components/NestedPeriodoInicio";
import { useExpande, useNumeros } from "../../hooks/useExpande";


const statsData = [
    { title: "PPRRD Aprobados", value: "0", icon: <CreditCardIcon className="w-8 h-8" />, description: "↗︎ Aprobados", },
    { title: "PPRRD Vigentes", value: "0", icon: <CreditCardIcon className="w-8 h-8" />, description: "↗︎ Vigentes", },
    { title: "EVAR Entidades asistidas", value: "0", icon: <UserGroupIcon className="w-8 h-8" />, description: "↗︎ Entidades", },
    { title: "OTROS Planes Aprobados", value: "0", icon: <CircleStackIcon className="w-8 h-8" />, description: "↗︎ Aprobados", },
];

const Dashboard = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0');
    const [resumen, setResumen] = useState('0');
    const [tituloDep, setTitulodep] = useState('RESUMEN GENERAL');
    const [depSeleccionado, setDepseleccionado] = useState('');

    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        //console.log('Dentro del componente Dash : ', event.target.value); // Do something with the selected value
    };
    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue);
        //console.log('Dentro del componente Dash handleUbigeoReset : ', newValue); // Do something with the selected value
    };
    //useEffect(getDepartamento, [])
    useEffect(() => {
        const getResumen = async () => {
            setLoading(true);
            try {
                //const dptos = await axiosClient.get('/departamento');
                //setDepartamento(dptos.data)
                await axiosClient.get('/resumen')
                    .then((response) => {
                        //setDepartamento(JSON.stringify(response, null, 2))
                        // setResumen(response.data.data);
                        setLoading(false);
                    })
                //console.log('Departamento:', departamento);
            } catch (error) {
                setError(error.message); // More specific error message
            } finally {
                //setIsLoading(false);
            }
        }


        const getDepartamento = async () => {
            try {
                //const dptos = await axiosClient.get('/departamento');
                //setDepartamento(dptos.data)
                await axiosClient.get('/departamento')
                    .then((response) => {

                        //setDepartamento(JSON.stringify(response, null, 2))
                        setDepartamento(response.data)
                    })
                //console.log('Departamento:', departamento);
            } catch (error) {
                setError(error.message); // More specific error message
            } finally {
                //setIsLoading(false);
            }
        }
        //  getDepartamento();
        // getResumen();

    }, []);

    //hook de conexion al api utilizando react-query
    const { data: dr, isLoading: isLoadingConteo } = useExpande(ubigodepartamento, 1, 'resumen-at');

    useEffect(() => {
        if (!isLoadingConteo && dr) {
            const { dpto, pprrd_a, pprrd_v, evar_e, otros_e } = dr[0];

            setTitulodep('RESUMEN POR PERIODO ' + dpto);
            setDepseleccionado(dpto)

            setAsistencias([
                {
                    title: "PPRRD Aprobados", value: useNumeros(pprrd_a),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Aprobados",
                },
                {
                    title: "PPRRD Vigentes", value: useNumeros(pprrd_v),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Vigentes",
                },
                {
                    title: "EVAR Entidades Asistidas", value: useNumeros(evar_e),
                    icon: <UserGroupIcon className="w-8 h-8" />,
                    description: "↗︎ Entidades",
                },
                {
                    title: "OTROS Planes Aprobados", value: useNumeros(otros_e),
                    icon: <CircleStackIcon className="w-8 h-8" />,
                    description: "↗︎ Aprobados",
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
                        RESUMEN  {(depSeleccionado) ? '- REGIÓN ' + depSeleccionado : ' - NIVEL NACIONAL'}</p>
                    {/* <div className="grid grid-cols-1 gap-6 pt-8 mt-2 lg:grid-cols-2 md:grid-cols-2">
                <select className="w-full select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                    <option value="0">TODOS LOS DEPARTAMENTOS</option>
                    {departamento.map((data) => (
                        <option key={data.departamentos_id+1} value={data.departamentos_id}>
                            {"DEPARTAMENTO DE "+data.dpto}
                        </option>
                    ))}
                </select>
            </div>  */}
                    <div className="flex flex-col lg:flex-row">
                        {/** ---------------------- Different stats content 1 ------------------------- */}
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

                    <div className="grid w-full gap-3 pt-2 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-8">
                        <div className="border-2 shadow-md stats bg-base-200/50">
                            <div className="p-6 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                                <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset} />

                            </div>
                        </div>
                        <div className="border-2 shadow-md stats bg-base-200/50">
                            <div className="p-6 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold text-center">CURSOS BÁSICOS Y ESPECIALIZADOS {depSeleccionado}</h1>
                                <MyBarChart ubigeo={ubigodepartamento} />
                            </div>
                        </div>
                        <div className="border-2 shadow-md stats bg-base-200/50">
                            <div className="p-6 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold text-center">CURSOS Y PERSONAS CAPACITADAS {depSeleccionado}</h1>
                                <LineChartComponent ubigeo={ubigodepartamento} />
                            </div>
                        </div>
                        <div className=" bg-base-200/50">
                            {/*   <div className="p-8 bg-base-200/50 rounded-xl">
                   
                 <CircularBrecha size={280} ubigeo={ubigodepartamento} title={depSeleccionado}/>
                
                    </div>
                    */}
                        </div>
                    </div>
                    <div className="mt-8 mb-8 divide-y-4 divide-black divide-opacity-25">
                        <hr />
                    </div>
                    <div className="grid w-full gap-3 pt-2 grid-cols-1  2xl:grid-cols-2">
                        <div className="stats bg-base-200/50">
                            <div className="p-2 border-2 bg-base-200/50 rounded-xl">


                                <h1 className="mb-4 text-lg font-bold text-center">RESUMEN POR DEPARTAMENTOS</h1>
                                <NestedTableInicio ubigeo={ubigodepartamento} />

                            </div>
                        </div>
                        <div className="stats bg-base-200/50">
                            <div className="p-2 border-2 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold text-center">RESUMEN POR PERIODOS</h1>
                                <NestedPeriodoInicio ubigeo={ubigodepartamento} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
