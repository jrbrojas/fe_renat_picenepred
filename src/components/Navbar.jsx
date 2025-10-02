import React from 'react'
import { ThemeToggle } from './ThemeToggle';
import DrawerLeftDaisy from './menu/DrawerLeftDaisy';


const Navbar = () => {
  return (
    <div className="px-4 navbar bg-primary text-primary-content">
      <div className="flex-1">
        <button className="text-xl btn btn-ghost">RENAT</button>
        <DrawerLeftDaisy />
      </div>
      <div className="flex-none">
        <ThemeToggle />
        
      </div>
    </div>
  );
}

export default Navbar