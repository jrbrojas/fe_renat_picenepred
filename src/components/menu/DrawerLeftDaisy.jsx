import React from 'react'
import { AiFillHome, AiOutlineMenu }from 'react-icons/ai'
import { IoBagHandleSharp, IoBarChartSharp, IoBriefcaseSharp, IoDocumentTextSharp, IoLeafSharp, IoMapSharp }from 'react-icons/io5'
import { RiFileList3Fill }from 'react-icons/ri'
import { BsDatabaseFill, BsGiftFill }from 'react-icons/bs'
import { MdSecurity }from 'react-icons/md'
import { FaUserCircle }from 'react-icons/fa'
import { FiLink2 }from 'react-icons/fi'

const DrawerLeftDaisy = () => {
  return (
    <>
      <div className="drawer drawer-start">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        {/* <div className="drawer-content absolute left-[50%] top-[50%]"> */}
        <div className="ml-4 drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn bg-cenepred-200 drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
  
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 text-lg font-semibold menu w-80 bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {/* <li><a className='text-primary'> <AiOutlineMenu /> Menu </a></li> */}
            <li><a className='text-primary'> <AiFillHome /> Dashboard </a></li>
            <hr />
            <li><a className='text-primary'> <IoBagHandleSharp /> eCommerce </a></li>
            <li><a className='text-primary'> <IoBriefcaseSharp /> Widgets </a></li>
            <li><a className='text-primary'> <IoLeafSharp /> Icons </a></li>
            <hr />
            <li><a className='text-primary'> <RiFileList3Fill /> Forms </a></li>
            <li><a className='text-primary'> <BsDatabaseFill /> Tables </a></li>
            <li><a className='text-primary'> <IoBarChartSharp /> Charts </a></li>
            <li><a className='text-primary'> <IoMapSharp /> Map </a></li>
            <li><a className='text-primary'> <IoDocumentTextSharp /> Invoice </a></li>
            <hr />
            <li><a className='text-primary'> <MdSecurity /> Authentication </a></li>
            <li><a className='text-primary'> <FaUserCircle /> User Profile </a></li>
            <li><a className='text-primary'> <BsGiftFill /> Documentation </a></li>
            <li><a className='text-primary'> <IoDocumentTextSharp /> Others </a></li>
            <li><a className='text-primary'> <FiLink2 /> Support </a></li>

          </ul>
        </div>
      </div>
    </>
  )
}

export default DrawerLeftDaisy