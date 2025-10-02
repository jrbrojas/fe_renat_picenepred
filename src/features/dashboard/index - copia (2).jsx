import DashboardStats from './components/DashboardStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'

import {useEffect, useState} from 'react'
import axiosClient from '../../axios-client'
import {Link} from 'react-router-dom'
import {useStateContext} from '../../context/ContextProvider'

const statsData = [
    {title : "PPRRD", value : "986", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    {title : "EVAR", value : "493", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    {title : "OTROS", value : "305", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},    
]

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true)
        axiosClient.get('/asistencias')
            .then(({ data }) => {
              setLoading(false)
              setAsistencias(data.data)              
            })
            .catch(() => {
              setLoading(false)
            })
    }


    //console.log("statsData ", statsData);
    
    const asistencias0 = asistencias[0];
    //console.log("asistencias0", asistencias0);
    
    const asistencias1 = asistencias[0];
    //console.log("asistencias1", asistencias1);
    //const jsObject = JSON.parse(asistencias0);
    //console.log("jsObject", jsObject);
    const obj0 = JSON.stringify(asistencias0);
    //console.log("obj0", obj0);

    //const obj1 = JSON.parse(obj0);
    //console.log("obj1", obj1);
    //// Using Object.assign to create
    
    //let obj1 = Object.assign({}, asistencias);
    //console.log("obj1",obj1);
    //let obj2= JSON.stringify(obj1);
    //console.log('obj2',obj2);
    
    const listItems0 = asistencias.map((item, key) =>
        <li key={key}>
          {item}
        </li>
    );
    //console.log("listItems0 ",listItems0[0]);

    const listItems = asistencias.map(( value, children, index ) =>
        <li key={index}>
          {children}
        </li>
    );
    //console.log("listItems ",listItems[0]);

    const listItems2 = Object.keys(asistencias).map((key, i)=>(
        <dir>{asistencias[key].pprrd}</dir>
    ));
    //console.log("listItems2 ",listItems2[0]);
    
    const listItems3 = Object.entries(asistencias).map((key, value) => (
        <div>{key}</div>
    ));
    //console.log("listItems3 ",listItems3);

    const listItems4 = asistencias.map(props => (
        <div>{props}</div>
    ));
    //console.log("listItems4 ",listItems4[0]);
      
    return (
        <>
        <p>{statsData.title}</p>
        <p>{statsData.value}</p>
        <p>{obj0}</p>
        
            {/** ---------------------- Different stats content 1 ------------------------- */}
                <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
                    {
                        
                        // statsData.map((d, k) => {
                        //     return (
                        //         <DashboardStats key={k} {...d} colorIndex={k}/>
                        //     )
                        // })
                        <div>
                            {/* <ul>
                                {asistencias.map(at => (
                                    <li>{at.pprrd}</li>
                                ))}
                            </ul> */}
                        
                            <div>
                                {/* {Object.keys(asistencias).map((key, index)=>(
                                    <p key={index}>{asistencias[index].pprrd + 
                                        ' - '+ asistencias[index].evar +
                                        ' - '+ asistencias[index].otros}</p>
                                ))} */}
                                
                                {/* {Object.keys(asistencias).map((key, index)=>(
                                    <p key={index}>{asistencias[index].pprrd}</p>
                                ))} */}
                                
                                {/* {Object.keys(asistencias).map((key, i)=>(
                                    <p key={i}>{asistencias[key].pprrd} {asistencias[key].evar} {asistencias[key].otros}</p>
                                ))} */}
                                {Object.keys(asistencias).map((key, i)=>(
                                    
                                        statsData.value=asistencias[key].pprrd                                        
                                    
                                ))}

                                {/* <p>{!asistencias ? "cargando..." : JSON.stringify(asistencias)}</p>                                  */}


                                {/* <li>{statsData2.asistencias[0].pprrd}</li>
                                <li>{asistencias.evar}</li>
                                <li>{asistencias.otros}</li> */}
                                {/* <li>{statsData2.asistencias[0]}</li>
                                <li>{statsData2.asistencias[1]}</li>
                                <li>{statsData2.asistencias[2]}</li> */}
                            </div>
                        </div>
                    }
                </div>    
        </>
    )
}

export default Dashboard