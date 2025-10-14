import React, { useState } from "react";
import NestedTableNiveles from "./NestedTableNiveles";
import NestedDepartamentos from "./NestedDepartamentos";
import { NestedPeriodos } from "./NestedPeriodos";

const Tabulador = ({ubigeo=0}) => {

  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`px-4 py-2 font-medium rounded-tl-lg bg-gray-200 rounded-tr-lg ${
            activeTab === "tab1"
              ? "border-b-2 cabecera-cenepred border-blue-500 text-white"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          FASES POR DEPARTAMENTO
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-tl-lg bg-gray-200 rounded-tr-lg ${
            activeTab === "tab2"
              ? "border-b-2 cabecera-cenepred border-blue-500 text-white-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          FASES POR PERIODOS
        </button>
      
      </div>

      {/* Content */}
      <div>
        {activeTab === "tab1" && <div className="p-6">
            <h1 className="mb-4 text-lg font-bold text-center">ENTIDADES ASISTIDAS - FASES POR DEPARTAMENTO </h1>
            <NestedDepartamentos ubigeo={ubigeo}/>
            </div>}
        {activeTab === "tab2" && <div className="P-6">
            <h1 className="mb-4 text-lg font-bold text-center">ENTIDADES ASISTIDAS - FASES POR PERIODO</h1>
            <NestedPeriodos ubigeo={ubigeo}/>
            </div>}
      </div>
    </div>
  );
};

export default Tabulador;
