import routes from '../routes/sidebar'
import { Link, NavLink, useLocation } from 'react-router-dom/dist'
import SidebarSubmenu from './SidebarSubmenu'
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import imgCenepredLogo from '../assets/img/cenepred/cenepred.png'

const LeftSidebar = () => {
    const location = useLocation();

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }    
    return (
        <div className="z-30 drawer-side ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="min-h-full pt-2 menu w-80 bg-base-100 text-base-content">
                <button className="absolute top-0 right-0 z-50 mt-4 mr-2 btn btn-ghost bg-base-300 btn-circle lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="inline-block w-5 h-5"/>
                </button>

                <li className="mb-2 text-xl font-semibold">
                    {/* <Link to={'/app/welcome'}><img className="w-10 mask mask-squircle" src="/assets/img/cenepred/logo192.png" alt="DashWind Logo"/>RENAT</Link> */}
                    <Link to={'/tablero/inicio'}>
                        <div className="bg-transparent">
                            <img className="w-16 h-12 md:w-32 lg:w-48 drop-shadow-[0_35px_35px_rgba(255,255,255,0.9)]" src={imgCenepredLogo} />
                        </div>
                    </Link>
                </li>
                {
                    routes.map((route, k) => {
                        return(
                            <li className='' key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu {...route}/> :
                                    (
                                        <NavLink
                                            end
                                            to={route.path}
                                            className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                            {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (
                                                    <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                    aria-hidden="true"></span>
                                                ) : null
                                            }
                                        </NavLink>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default LeftSidebar