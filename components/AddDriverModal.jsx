import React from 'react'
import { useState } from 'react'
import { useFormik, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
export default function AddDriverModal({ addDriver }) {
    const [showModal, setShowModal] = useState(false)

    async function postDriver(values) {
        const res = await axios.post('/api/driver', {
            values
        })
        addDriver(res.data)
        console.log(res);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Please add driver's email"),
        avatarUrl: Yup.string(),
        firstName: Yup.string().required('Please enter name'),
        lastName: Yup.string(),
        experience: Yup.number().min(0),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            avatarUrl: '',
            firstName: '',
            lastName: '',
            experience: 0,
            companyId: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            postDriver(values)
            setShowModal(false)
            //console.log(values)
        },
    });
    return (
        <div>
            <button className="btn bg-sky-600 mx-12" onClick={() => setShowModal(true)}>Add Driver</button>
            {showModal ? (
                <>
                    <div
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0.5, scale: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                                    <h3 className="text-3xl font-semibold">New Driver</h3>
                                    <button
                                        className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='p-10'>
                                        <div className="w-100">
                                            <label className="label mt-5">
                                                <span className="label-text">Image URL</span>
                                            </label>
                                            <label className='input-group'>
                                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                                                </span>
                                                <input type="text"
                                                    id="avatarUrl"
                                                    name="avatarUrl"
                                                    placeholder="URL"
                                                    className="input input-bordered w-full max-w-xs input input-bordered"
                                                    value={formik.values.avatarUrl}
                                                    onChange={formik.handleChange}
                                                />
                                            </label>
                                            {formik.errors.avatarUrl ? <div className="text-red-500">{formik.errors.avatarUrl}</div> : null}
                                        </div>
                                        <div className="w-100">
                                            <label className="label mt-5">
                                                <span className="label-text">First Name</span>
                                            </label>
                                            <input type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="Enter"
                                                className="input input-bordered w-full max-w-xs"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.firstName ? <div className="text-red-500">{formik.errors.firstName}</div> : null}
                                        </div>
                                        <div className="w-100">
                                            <label className="label mt-5">
                                                <span className="label-text">Last Name</span>
                                            </label>
                                            <input type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Enter"
                                                className="input input-bordered w-full max-w-xs"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.lastName ? <div className="text-red-500">{formik.errors.lastName}</div> : null}
                                        </div>
                                        <div className="w-100">
                                            <label className="label mt-5">
                                                <span className="label-text">Driver's Email</span>
                                            </label>
                                            <label className='input-group'>
                                                <span>@</span>
                                                <input type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter"
                                                    className="input input-bordered w-full max-w-xs"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                />
                                            </label>
                                            {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                                        </div>
                                        <div className="w-100">
                                            <label className="label mt-5">
                                                <span className="label-text">Experience (optional)</span>
                                            </label>
                                            <label className='input-group'>
                                                <span>Months</span>
                                                <input type="text"
                                                    id="experience"
                                                    name="experience"
                                                    placeholder="Enter"
                                                    className="input input-bordered w-full max-w-xs"
                                                    value={formik.values.experience}
                                                    onChange={formik.handleChange}
                                                />
                                            </label>
                                            {formik.errors.experience ? <div className="text-red-500">Please enter a number</div> : null}
                                        </div>
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                                        <button
                                            className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-semibold text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                                            type="submit"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="mr-1 mb-1 rounded bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-teal-600"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </div>
    )
}
