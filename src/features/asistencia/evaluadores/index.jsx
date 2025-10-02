import DashboardStats from "./components/DashboardStats";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/ContextProvider";
import Mapa from "../../mapa/Mapa";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import CircularDos from "../../dashboard/components/CircularDos";
import NestedTable from "./components/NestedTable";
import LineChartComponent from "./components/LineChartComponent";
import DashboardTablaPeriodo from "./components/DashboardTablaPeriodo";
import CircularEvaluadores from "./components/CircularEvaluadores";
import { useResumen } from "../../../hooks/useResumen";
import { useNumeros } from "../../../hooks/useExpande";


const statsData = [
    {
        title: "Evaluadores",
        value: "0",
        icon: <CreditCardIcon className="w-8 h-8" />,
        description: "↗︎ Acreditados",
    },

    // {title : "PPRRD", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
];

const Index = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [asistenciasdetalles, setAsistenciasdetalles] = useState([]);

    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState("0");

    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        //console.log('Dentro del componente PPRRD : ', event.target.value); // Do something with the selected value
    };
    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue);
        //console.log('Dentro del componente PPRRD handleUbigeoReset : ', newValue); // Do something with the selected value
    };






    //console.log("asistenciasdetalles: ", asistenciasdetalles);
    const cardDetails = [
        {
            title: "total income",
            amount: "$1200",
        },
        {
            title: "total expense",
            amount: "8.50K",
        },
        {
            title: "total credit",
            amount: "$250",
        },
        {
            title: "total bonus",
            amount: "8.10K",
        },
    ];
    const renderCard = () => {
        return cardDetails.map((card, index) => {
            return (
                <div key={index}>
                    <Card title={card.title} amount={card.amount} />
                </div>
            );
        });
    };
    const { data: d, isLoading: isLoadingX } = useResumen(ubigodepartamento, 'fortalecimiento_conteo');

    useEffect(() => {
        if (!isLoadingX) {
            const { departamento } = d.data[0];
            setDepartamento(departamento);
        }
    }, [d, isLoadingX]);

    const { data: dr, isLoading: isLoadingConteo } = useResumen(ubigodepartamento, 'periodos_pprrd_inicio');


    useEffect(() => {
        if (!isLoadingConteo && dr) {
            const { total_evaluadores } = dr[0];
            //setDepartamento(departamento);
            setAsistencias([
                {
                    title: "Evaluadores",
                    value: useNumeros(total_evaluadores),
                    icon: <CreditCardIcon className="w-8 h-8" />,
                    description: "↗︎ Acreditados",
                },

            ]

            )
        }
    }, [dr, isLoadingConteo]);

    const nextAsistencias = [
        {
            title: "En Proceso",
            value: "101",
            icon: <CreditCardIcon className="w-8 h-8" />,
            description: "↗︎ En proceso",
        },
        {
            title: "Aprobados",
            value: "7",
            icon: <UserGroupIcon className="w-8 h-8" />,
            description: "↗︎ En proceso",
        },
    ];
    return (
        <>
            <div className="grid m-4 font-sans">
                <div className="m-4">
                    {/* <div className="p-8 pl-0 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold"> Dashboard </h1>
        </div> */}
                    <p className="text-3xl font-bold mb-8">
                        EVALUADORES ACREDITADOS {(departamento != 'TODOS') ? '- REGIÓN ' + departamento : ' - NIVEL NACIONAL'}
                    </p>
                    <div className="flex flex-col lg:flex-row">
                        {renderCard}

                        <div className="grid w-full gap-3 pt-2 lg:grid-cols-3">
                            {asistencias.map((d, k) => {
                                return <DashboardStats key={k} {...d} colorIndex={k} />;
                            })}
                        </div>
                    </div>


                    <div className="grid w-full gap-3 pt-2 grid-cols-1 lg:grid-cols-2 mt-8">
                        <div className="grid w-full gap-3 grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2">
                            <div className="border-2 shadow-md stats bg-base-200/50">
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                                    <Mapa
                                        ubigeo={ubigodepartamento}
                                        resetUbigeo={handleUbigeoReset}
                                    />

                                </div>
                            </div>
                            <div className="border-2 shadow-md stats bg-base-200/100">
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                    <h1 className="mb-4 text-lg font-bold text-center">
                                        EVALUADORES POR AÑO
                                    </h1>

                                    <LineChartComponent ubigeo={ubigodepartamento} />
                                    <hr className="mt-8 mb-8" />
                                    <h1 className="mb-4 text-lg font-bold text-center">
                                        EVALUADORES POR PERIODO
                                    </h1>
                                    <DashboardTablaPeriodo ubigeo={ubigodepartamento} />
                                </div>
                            </div>
                        </div>

                        <div className="grid w-full gap-3 grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2">
                            <div className="w-full p-6  border-2 shadow-md stats bg-base-200/50">
                                <div>
                                    <h1 className="mb-4 text-lg font-bold text-center">
                                        EVALUADORES POR DEPARTAMENTO/PROVINCIAS/DISTRITOS
                                    </h1>
                                    <NestedTable ubigeo={ubigodepartamento} />
                                </div>
                            </div>
                            <div className="w-full border-2 shadow-md stats bg-base-200/50">
                                <div>
                                    <CircularEvaluadores ubigeo={ubigodepartamento} title="ACREDITADOS EN EL ESTADO" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
