import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

    const linkBase = 'rounded-md px-3 py-2 font-medium transition'
    const linkActive = 'bg-slate-900 text-white'
    const linkIdle = 'text-slate-700 hover:bg-slate-200'

    return (
        <header className='sticky top-0 z-50 border-b bg-white/80 backdrop-blur'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
                <h1 className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center bg-slate-900 text-white rounded-xl'>Wi</div>
                    <div>
                        <div className='text-base font-semibold'>Wifi Spot</div>
                        <div className='text-xs text-slate-500'>Public Wifi Map</div>
                    </div>
                </h1>
                <nav className='flex items-center gap-2'>
                    <NavLink
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : linkIdle}`
                        }
                        to="/map">Map</NavLink>
                    <NavLink to="/favorites"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : linkIdle}`
                        }

                    >favorites</NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : linkIdle}`
                        }


                        to="/about">about</NavLink>
                </nav>
            </div>

        </header>
    )
}

export default Header