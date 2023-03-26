import React from 'react'
import Messages from './icons/Message';
import Notifications from './icons/Notifications';
import Image from 'next/image'
import Link from 'next/Link'
export default function Navbar() {
    return (
        <div className='w-full bg-white shadow-sm h-12 flex justify-between'>
            <div className="form-control">
                <div className="input-group">
                    <input type="text" placeholder="Search…" className="input " />
                    <button className=" bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className='flex justify-between w-1/5 items-center mr-5'>
                <Messages />

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                        <Notifications tabIndex={0} />
                    </label>
                    <span tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">Notifications</span>
                </div>
                <div className="dropdown dropdown-end">
                    <picture className="mr-2 mt-1 h-[40px] w-[40px] overflow-hidden rounded-full" tabIndex={0}>
                        <img src="https://peprojects.dev/images/portrait.jpg" />
                    </picture>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><Link href="api/auth/logout">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
