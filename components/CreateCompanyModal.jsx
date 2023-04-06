import React from 'react'
import { useState } from 'react'
import { useFormik, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
export default function CreateCompanyModal({ show, owner }) {
    const [showModal, setShowModal] = useState(show)

    async function createCompany(values) {
        const res = await axios.post('/api/company', {
            values
        })

        console.log(res);
    }

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required('Please enter company name'),
        companyAddress: Yup.string().required(),
        avatarUrl: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            companyName: '',
            avatarUrl: '',
            avatarUrl: '',
            OwnerId: owner.id,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createCompany(values)
            setShowModal(false)
            console.log(values)
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
                        <div className="relative  mx-auto w-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                                    <h3 className="text-3xl font-semibold">Create your Company</h3>
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
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
                                                <span className="label-text">Company Name</span>
                                            </label>
                                            <input type="text"
                                                id="companyName"
                                                name="companyName"
                                                placeholder="Enter"
                                                className="input input-bordered w-full max-w-xs"
                                                value={formik.values.companyName}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.companyName ? <div className="text-red-500">{formik.errors.companyName}</div> : null}
                                        </div>
                                        <div className="w-100">
                                            <label className="label mt-5">
                                                <span className="label-text">Company Address</span>
                                            </label>
                                            <input type="text"
                                                id="companyAddress"
                                                name="companyAddress"
                                                placeholder="Enter"
                                                className="input input-bordered w-full max-w-xs"
                                                value={formik.values.companyAddress}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.companyAddress ? <div className="text-red-500">Please add Company's Address</div> : null}
                                        </div>
                                        {/* <div className="w-100">
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
                                        </div> */}
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">

                                        <button
                                            className="mr-1 mb-1 rounded bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-teal-600"
                                            type="submit"
                                        >
                                            Create
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
