import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({SetSidebarOpen}) => {
  return (
    <div>
      {
        menuItemsData.map(({to, label, Icon})=>(
            <NavLink key={to} to={to} end={to==='/'} onClick={()=> SetSidebarOpen(false)}
            className={({isActive})=>`px-3.5 py-2 flex items-center gap-2 rounded-xl ${isActive ? 'bg-indigo-50 text-indigo-700':'hover:bg-gray-50'}`}>
                <Icon className="w-5 h-5"/>
                {label}
            </NavLink>
        ))
      }
    </div>
  )
}

export default MenuItems
