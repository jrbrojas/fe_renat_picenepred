import React, { useEffect } from 'react'
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import TemaToggle from '../components/TemaToggle'
import { Link } from 'react-router-dom/dist'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'
import DrawerLeftDaisy from '../components/menu/DrawerLeftDaisy'
import imgAvatars21 from '../assets/img/avatars/21.png'

const Header = () => {
    const { user, token, setUser, setToken, notification } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <>
            <div className="sticky top-0 z-10 shadow-md navbar bg-base-100 ">
                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn bg-cenepred-200 drawer-button lg:hidden">
                        <Bars3Icon className="inline-block w-5 h-5" /></label>
                    <h1 className="ml-2 text-2xl font-semibold">PLATAFORMA DIFAT</h1>
                    {/* <DrawerLeftDaisy /> */}
                </div>
                <div className="flex-none ">
                    {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, also includes corporate and retro themes in tailwind.config file */}
                    {/* <select className="mr-4 select select-sm" data-choose-theme>
                        <option disabled selected>Theme</option>
                        <option value="light">Default</option>
                        <option value="dark">Dark</option>
                        <option value="corporate">Corporate</option>
                        <option value="retro">Retro</option>
                    </select>
                    <TemaToggle /> */}
                    {/* Notification icon */}
                    <button className="ml-4 btn btn-ghost btn-circle">
                        <div className="indicator">
                            <BellIcon className="w-6 h-6" />
                        </div>
                    </button>
                    <div>&nbsp; &nbsp;{user.name}</div>
                    {/* Profile icon, opening menu on click */}
                    <div className="ml-4 dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {/* <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" /> */}
                                <img src={imgAvatars21} alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            {/*<li className="justify-between">
                                <Link to={'/app/settings-profile'}>
                                    Perfil
                                    <span className="badge">Nuevo</span>
                                </Link>
                            </li>
                            <li className=''><Link to={'/app/settings-billing'}>Historia</Link></li>
                            <div className="mt-0 mb-0 divider"></div>*/}
                            <li><a onClick={onLogout}>Salir</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
