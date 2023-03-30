import React from 'react'

export default function DriverCard({ driver }) {
    return (
        <div className="m-10 col-span-3 card w-80 bg-base-100 shadow-xl flex flex-col items-center">
            <div className="avatar mt-5">
                <div className="w-32 rounded-full">
                    <img src={driver.avatarUrl} />
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
                    <span className="stat-value text-xl">{2 + " years"}</span>
                </div>
            </div>
        </div>
    )
}
