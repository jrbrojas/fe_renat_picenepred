import DashboardStats from "./components/DashboardStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import DashboardTopBar from "./components/DashboardTopBar";

import { useEffect, useState, Fragment } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import DashboardLine from "./components/DashboardLine";
import DashboardTable from "./components/DashboardTable";
import Mapa from "../mapa/Mapa";

const statsData = [
  {title: "PPRRD", value: "0", icon: <CreditCardIcon className="w-8 h-8" />, description: "↗︎ Aprobados",},
  {title: "PPRRD Vigentes", value: "0", icon: <CreditCardIcon className="w-8 h-8" />, description: "↗︎ Vigentes",},
  {title: "EVAR", value: "0", icon: <UserGroupIcon className="w-8 h-8" />, description: "↗︎ Aprobados",},
  {title: "OTROS", value: "0", icon: <CircleStackIcon className="w-8 h-8" />, description: "↗︎ Aprobados",},
];

const Dashboard = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [asistenciasdetalles, setAsistenciasdetalles] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0');  

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
        getDepartamento();
    }, []);

    const getData = () => {
        setLoading(true);
        //atinstrumento/{ubigeo}
        //axiosClient.get("/resumen-at/2020")
        //axiosClient.get("/atinstrumento/0")
        axiosClient.get(`/atinstrumento/${ubigodepartamento}`)
        .then(({ data }) => {
            setLoading(false);
            //setAsistencias(data.data);
            const nextAsistencias = [
            {
                title: "PPRRD", value: data.datatotales.sum_pprrd.toString(),
                icon: <CreditCardIcon className="w-8 h-8" />,
                description: "↗︎ Aprobados",
            },
            {
                title: "PPRRD Vigentes", value: data.datatotales.sum_vigente.toString(),
                icon: <CreditCardIcon className="w-8 h-8" />,
                description: "↗︎ Aprobados",
            },
            {
                title: "EVAR", value: data.datatotales.sum_evar.toString(),
                icon: <UserGroupIcon className="w-8 h-8" />,
                description: "↗︎ Aprobados",
            },
            {
                title: "OTROS", value: data.datatotales.sum_otros.toString(),
                icon: <CircleStackIcon className="w-8 h-8" />,
                description: "↗︎ Aprobados",
            },
            ];
            setAsistencias(nextAsistencias);                 
            setAsistenciasdetalles(data.data);            
        })
        //.catch(() => {setLoading(false);});
        .catch((err) => {console.log(err); setLoading(false);});
    };
        
    useEffect(() => {
        getData();
    }, [ubigodepartamento]);

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        //dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    };

  return (
    <>
    <div className="grid m-4 font-sans">
        <div className="m-4">
        {/* <div className="p-8 pl-0 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold"> Dashboard </h1>
        </div> */}
            <p className="text-2xl font-bold dark:text-whit">
                INSTRUMENTOS APROBADOS</p>         
            <div className="grid grid-cols-1 gap-6 pt-8 mt-2 lg:grid-cols-2 md:grid-cols-2">
                <select className="w-full select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                    <option value="0">TODOS LOS DEPARTAMENTOS</option>
                    {departamento.map((data) => (
                        <option key={data.id} value={data.ubigeo}>
                            {"DEPARTAMENTO DE "+data.name}
                        </option>
                    ))}
                </select>
            </div>         
            <div className="flex flex-col lg:flex-row">
                {/** ---------------------- Different stats content 1 ------------------------- */}
                <div className="grid w-full gap-3 pt-2 lg:grid-cols-4">
                    {
                        asistencias.map((d, k) => {
                            return (
                                <DashboardStats key={k} {...d} colorIndex={k}/>
                            )
                        })
                    }
                </div>
            </div>

            {/* <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="w-full h-96 border border-gray-300">
                    </div>
                </div>
            </div>               */}

            <div className="flex flex-col lg:flex-row">                
                <div className="w-full md:w-1/2 lg:w-1/3 pt-5">
                    <div className="p-8 border-2 bg-base-200/50 rounded-xl">
                        <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-8 mt-2 lg:grid-cols-2 md:grid-cols-2">
                <select className="w-full select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                    <option value="0">TODOS LOS DEPARTAMENTOS</option>
                    {departamento.map((data) => (
                        <option key={data.id} value={data.ubigeo}>
                            {"DEPARTAMENTO DE "+data.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="mr-0 basis-3/5 md:mr-2">       
                    <div className="pt-2">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                            <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                            <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mr-0 basis-2/5 md:mr-2">
                    <div className="pt-2">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                                <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                                <DashboardTable asistenciasdetalles={asistenciasdetalles}></DashboardTable>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="mr-0 basis-3/5 md:mr-2">       
                    <div className="pt-2">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                            <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                            <DashboardLine asistenciasdetalles={asistenciasdetalles} ></DashboardLine>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="mr-0 basis-3/5 md:mr-2">       
                    <div className="pt-2">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                            <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                            <DashboardLine asistenciasdetalles={asistenciasdetalles} ></DashboardLine>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mr-0 basis-2/5 md:mr-2">
                    <div className="pt-2">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                                <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                                <DashboardTable asistenciasdetalles={asistenciasdetalles}></DashboardTable>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col lg:flex-row">
                <div className="mr-0 basis-3/5 md:mr-8">       
                    <div className="pt-8">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                            <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>                        
                            <DashboardLine asistenciasdetalles={asistenciasdetalles} ></DashboardLine>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                                <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                                <DashboardTable asistenciasdetalles={asistenciasdetalles}></DashboardTable>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="pt-8 mr-4 basis-2/5">
                        <Mapa />
                </div>
            </div> */}
        </div>

        <div className="max-w-7xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 shadow rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Mapa de Perú</h2>
                    <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset}/>
                </div>
                <div className="p-4 shadow rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Tabla de Datos</h2>
                    <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                    <DashboardTable asistenciasdetalles={asistenciasdetalles}></DashboardTable>
                </div>
            </div>

            <div className="p-4 shadow rounded-lg w-full">
                <h2 className="text-xl font-bold mb-2">Gráfico de Datos</h2>
                <div className="w-full h-64 flex items-center justify-center text-gray-500">
                <h1 className="mb-4 text-lg font-bold text-center">Instrumentos aprobados</h1>
                <DashboardLine asistenciasdetalles={asistenciasdetalles} ></DashboardLine>
                </div>
            </div>
        </div>

    </div>  
    </>
  );
};

export default Dashboard;
