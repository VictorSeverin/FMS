import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Sidebar() {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        // load the date client side... to prevent server hydration bug
        const newDate = new Date();
        setDate(newDate.toDateString());
        setTime(newDate.getHours() + ':' + newDate.getMinutes());
    }, []);
    const { user, error, isLoading } = useUser();
    return (
        <aside className="flex w-full max-w-xs flex-col justify-between shadow-inner border-slate-400">
            <div className="flex flex-col gap-20 p-5 h-full">
                <div id="logo" className="max-w-[50px]">
                    <Link className='text-5xl' href="/">
                        FMS
                    </Link>
                </div>
                <div className='flex flex-col w-full justify-center items-center h-full'>
                    <Link href="/" className='px-8 py-3 my-2x hover:bg-blue-100 text-xl font-semibold'>
                        Dashboard
                    </Link>
                    <Link href="/freights" className='px-8 py-3 my-2 hover:bg-blue-100 text-xl font-semibold'>
                        Freights
                    </Link>
                    <Link href="/drivers" className='px-8 py-3 my-2 hover:bg-blue-100 text-xl font-semibold'>
                        Drivers
                    </Link>
                    <Link href="/statistics" className='px-8 py-3 my-2 hover:bg-blue-100 text-xl font-semibold'>
                        Statistics
                    </Link>
                </div>
            </div>

            <div>
                <div id="time" className="my-15 p-5">
                    <time dateTime="2022-02-21" className="text-4xl font-bold">
                        <span className="block text-base font-normal">{date}</span> {time}
                    </time>
                </div>

                {user && <div id="profile" className="flex flex-row justify-between gap-4 bg-slate-100 p-5">
                    <div className="flex">
                        <picture className="mr-2 h-[50px] w-[50px] overflow-hidden rounded-full">
                            <img src="https://peprojects.dev/images/portrait.jpg" alt="" />
                        </picture>
                        <div>
                            <p className="font-medium">{user?.name}</p>

                        </div>
                    </div>
                    <Link href="/api/auth/logout" className="mt-1">
                        Logout
                    </Link>
                </div>}
            </div>
        </aside>
    );
}
