import React from 'react'
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DriverCard({ driver, removeDriver }) {
    async function deleteDriver() {
        const driverId = driver.id
        try {
            const res = await axios.delete('/api/driver', {
                data: {
                    id: driverId,
                }
            })
            if (res.status >= 200 && res.status < 300) {
                removeDriver(driverId)
                toast.success(' Driver Succesfully Deleted', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        catch {
            toast.error('Could not remove driver', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <div className="m-10 col-span-1 card w-80 bg-base-100 shadow-xl flex flex-col items-center">
            <div className='p-1 w-full justify-end flex'>
                <svg onClick={deleteDriver} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 hover:cursor-pointer hover:scale-150">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

            </div>
            <div className="avatar mt-5">
                <div className="w-32 rounded-full">
                    <Image src={driver.avatarUrl} width="30" height="30" />
                </div>
            </div>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{driver.firstName + " " + driver.lastName}</h2>
                <p>New York</p>
                <div className="card-actions">
                    <button className="btn bg-sky-700">Message</button>
                    <button className="btn bg-sky-700">Edit Info</button>
                </div>
            </div>
            <div className='p-5 rounded-2xl flex w-full justify-around'>
                <div className='flex flex-col items-center'>
                    <span className="stat-title">Deliveries</span>
                    <span className="stat-value text-xl">{driver.deliveries ? driver.deliveries : 0}</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className="stat-title">Miles</span>
                    <span className="stat-value text-xl">{driver.miles ? driver.miles : 0}</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className="stat-title">Experience</span>
                    <span className="stat-value text-xl">{driver.experience ? driver.experience + " years" : 0}</span>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
