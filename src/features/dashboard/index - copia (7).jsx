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
import Dash from "./components/DashboardLine";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";

const statsData = [
  {
    title: "PPRRD",
    value: "0",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "↗︎ En proceso",
  },
  {
    title: "EVAR",
    value: "0",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ En proceso",
  },
  {
    title: "OTROS",
    value: "0",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "↗︎ En proceso",
  },
];

const people = [
  { id: 1, name: "2024" },
  { id: 2, name: "2023" },
  { id: 3, name: "2022" },
  { id: 4, name: "2021" },
  { id: 5, name: "2020" },
  { id: 6, name: "2019" },
  { id: 6, name: "2018" },
  { id: 6, name: "2017" },
];

const Dashboard = () => {
  const [instrumentos, setInstrumentos] = useState(statsData);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axiosClient
      .get("/resumen-at/2024")
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

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    //dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      {/* <DashboardTopBar /> */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        
        {/* <div className="fixed top-16 w-72">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                  displayValue={(person) => person.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {filteredPeople.length === 0 && query !== "" ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div> */}

      </div>

      {/* labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateType, updateFormValue */}
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
        {instrumentos.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>
      <Dash></Dash>
    </>
  );
};

export default Dashboard;
