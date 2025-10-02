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

const statsData = [
  {title: "PPRRD", value: "0", icon: <CreditCardIcon className="w-8 h-8" />, description: "↗︎ En proceso",},
  {title: "EVAR", value: "0", icon: <UserGroupIcon className="w-8 h-8" />, description: "↗︎ En proceso",},
  {title: "OTROS", value: "0", icon: <CircleStackIcon className="w-8 h-8" />, description: "↗︎ En proceso",},
];

const Dashboard = () => {
    const [instrumentos, setInstrumentos] = useState(statsData);
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const options = ['2024', '2023', '2022', '2021', '2020'];
    const [selectedValue, setSelectedValue] = useState(options[0]);
    
    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState();

    const handleOptionChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('Selected value:', selectedValue); // Do something with the selected value
    };

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
                await axiosClient
                    .get('/departamento')
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
            //console.log('Departamento:', departamento );
            //axiosClient
            //    .get('/departamento')
            //    .then((response) => {
            //        setDepartamento(response.data)
            //})
            //console.log('Departamento:', departamento);
        }        
        getDepartamento();
    }, []);

    const getData = () => {
        setLoading(true);    
        axiosClient
        //.get("/resumen-at/2020")
        .get(`/resumen-at/${selectedValue}`)
        .then(({ data }) => {
            setLoading(false);
            //setAsistencias(data.data);
            const nextAsistencias = [
            {
                title: "PPRRD",
                value: data.data[0].pprrd.toString(),
                icon: <CreditCardIcon className="w-8 h-8" />,
                description: "↗︎ En proceso",
            },
            {
                title: "EVAR",
                value: data.data[0].evar.toString(),
                icon: <UserGroupIcon className="w-8 h-8" />,
                description: "↗︎ En proceso",
            },
            {
                title: "OTROS",
                value: data.data[0].otros.toString(),
                icon: <CircleStackIcon className="w-8 h-8" />,
                description: "↗︎ En proceso",
            },
            ];
            setInstrumentos(nextAsistencias);
        })
        .catch(() => {
            setLoading(false);
        });
    };
        
    useEffect(() => {
        getData();
    }, [selectedValue]);

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        //dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      {/* <DashboardTopBar /> */}
      <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
        <select className="w-full max-w-xs select select-ghost" value={selectedValue} onChange={handleOptionChange}>
            <option value="0">Todos los años</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <select className="w-full max-w-xs select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
            <option value="0">Todos los departamentos</option>
            {departamento.map((data) => (
                <option key={data.id} value={data.ubigeo}>
                    {data.name}
                </option>
            ))}
        </select>
      </div>

      {/* labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateType, updateFormValue */}
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
        {instrumentos.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
            <div>
                <div>01</div>
                <div>02</div>
            </div>
            <div>
                <DashboardLine></DashboardLine>
            </div>
        </div>      
    </>
  );
};

export default Dashboard;
