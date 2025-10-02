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

const statsData = [
  {title: "PPRRD", value: "0", icon: <CreditCardIcon className="w-8 h-8" />, description: "↗︎ Aprobados",},
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
        console.log('departamento value: ', event.target.value); // Do something with the selected value
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
                console.log('Departamento:', departamento);
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
            <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
                <select className="w-full max-w-xs select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                    <option value="0">Todos los departamentos</option>
                    {departamento.map((data) => (
                        <option key={data.id} value={data.ubigeo}>
                            {data.name}
                        </option>
                    ))}
                </select>            
            </div>         
            <div className="flex flex-col lg:flex-row">
                <div className="mr-0 basis-3/5 md:mr-8">       
                    {/** ---------------------- Different stats content 1 ------------------------- */}
                    <div className="grid gap-3 pt-8 lg:grid-cols-3">
                        {
                            asistencias.map((d, k) => {
                                return (
                                    <DashboardStats key={k} {...d} colorIndex={k}/>
                                )
                            })
                        }
                    </div>

                    <div className="pt-8">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <DashboardLine asistenciasdetalles={asistenciasdetalles} ></DashboardLine>
                        </div>
                    </div>
                    <div className="pt-8">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                            <h1 className="mb-4 text-lg font-bold">Instrumentos aprobados</h1>
                                <DashboardTable asistenciasdetalles={asistenciasdetalles}></DashboardTable>
                            </div>                            
                        </div>
                    </div>
                </div>
           
                <div className="pt-8 mr-4 basis-2/5">
                    <div>MAPA</div>
                </div>
            </div>
        </div>
    </div>  
    </>
  );
};

export default Dashboard;
