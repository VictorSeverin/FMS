import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import logo from "../public/logo-white-nobg.png"
import Image from 'next/image';
export default function Sidebar() {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        // load the date client side... to prevent server hydration bug
        const newDate = new Date();
        setDate(newDate.toDateString());
        setTime(newDate.getHours() + ':' + newDate.getMinutes());
    }, []);
    const { user, error, isLoading } = useUser();
    return (
        <>
            {isOpen ? <aside className="flex w-full max-w-xs flex-col justify-between border-r bg-gray-900 border-gray-300 bg-sidebar hidden lg:block md:block">
                <div className="flex flex-col gap-20 p-5 h-full">
                    <div id="logo" className="flex justify-between">
                        <Link href="/" className=''>
                            <Image src={logo} width="100" height="100" alt='logo' />
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-10 h-10 m-1 hover:scale-125" onClick={() => setIsOpen(!isOpen)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>

                    </div>
                    <div className='flex flex-col w-full justify-center items-start ml-10 h-full'>
                        <Link href="/dashboard" className='px-8 py-3 my-2x hover:bg-gray-700 text-xl hover:rounded font-semibold text-gray-200 flex '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                            Dashboard
                        </Link>
                        <Link href="/freights" className='px-8 py-3 my-2 hover:bg-gray-700 text-xl hover:rounded font-semibold text-gray-200 flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>

                            Freights
                        </Link>
                        <Link href="/drivers" className='px-8 py-3 my-2 hover:bg-gray-700 text-xl hover:rounded font-semibold text-gray-200 flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                            Drivers
                        </Link>
                        <Link href="/reports" className='px-8 py-3 my-2 hover:bg-gray-700 hover:rounded text-xl font-semibold text-gray-200 flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>

                            Reports
                        </Link>
                    </div>
                </div>

                <div className='bg-gray-800 flex justify-center'>
                    <div id="time" className="my-15 p-5">
                        <time dateTime="2022-02-21" className="text-4xl font-bold text-white">
                            <span className="block text-base font-semibold">{date}</span> {time}
                        </time>
                    </div>
                </div>
            </aside> :

                <div className='w-20 bg-gray-900'>
                    <div className='flex justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-10 h-10 m-1 hover:scale-125" onClick={() => setIsOpen(!isOpen)} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg >
                    </div>
                </div>

            }
        </>
    );
}
