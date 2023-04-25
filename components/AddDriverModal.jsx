import React from 'react'
import { useState } from 'react'
import { useFormik, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddDriverModal({ addDriver }) {
    const [showModal, setShowModal] = useState(false)

    async function postDriver(values) {

        try {
            const res = await axios.post('/api/driver', {
                values
            })
            console.log(res)
            if (res.status >= 200 && res.status < 300) {
                addDriver(res.data)
                toast.success(' Driver Succesfully Added', {
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
            toast.error('Could not add driver', {
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

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
        medicalExpiration: Yup.date().required('Medical expiration is required'),
        licenseNumber: Yup.string().required('License number is required'),
        insuranceNumber: Yup.string().required('Insurance number is required'),
        tankerEndorsed: Yup.boolean().required('Tanker endorsed is required'),
        hazmatEndorsed: Yup.boolean().required('Hazmat endorsed is required'),
        avatarUrl: Yup.string().nullable().url('Invalid URL'),
        notes: Yup.string().nullable(),
        experience: Yup.number().integer().positive().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            companyId: '',
            address: '',
            phoneNumber: '',
            hiredDate: '',
            medicalExpiration: '',
            licenseNumber: '',
            insuranceNumber: '',
            tankerEndorsed: '',
            hazmatEndorsed: '',
            avatarUrl: '',
            notes: '',
            miles: '',
            deliveries: '',
            experience: '',
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            postDriver(values)
            //setShowModal(false)
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
                                <div className="flex items-start m-20 justify-between rounded-t border-b border-solid border-slate-200 p-5">
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
                                <form onSubmit={formik.handleSubmit} >
                                    <div className='p-10 flex flex-col overflow-y-scroll'>
                                        <span className='text-3xl '>New Driver</span>
                                        <div className='flex gap-10'>
                                            <div className="w-100">
                                                <div>
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
                                                        <span className="label-text">Phone Number</span>
                                                    </label>
                                                    <label className='input-group'>
                                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                        </svg>
                                                        </span>
                                                        <input type="text"
                                                            id="phoneNumber"
                                                            name="phoneNumber"
                                                            placeholder="Enter"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={formik.values.phoneNumber}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </label>
                                                    {formik.errors.phoneNumber ? <div className="text-red-500">Please enter a number</div> : null}
                                                </div>
                                                <div className='mt-10'>
                                                    <p className='text-2xl font-semiboldd'>Endorsments</p>
                                                    <div className="form-control">
                                                        <label className="label cursor-pointer">
                                                            <span className="label-text">Tanker Endorsed</span>
                                                            <input type="checkbox"
                                                                id="tankerEndorsed"
                                                                className="checkbox"
                                                                value={formik.values.tankerEndorsed}
                                                                onChange={formik.handleChange}
                                                                name="tankerEndorsed" />
                                                        </label>
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label cursor-pointer">
                                                            <span className="label-text">Hazmat Endorsed</span>
                                                            <input type="checkbox"
                                                                id="hazmatEndorsed"
                                                                className="checkbox"
                                                                value={formik.values.hazmatEndorsed}
                                                                onChange={formik.handleChange}
                                                                name="hazmatEndorsed" />
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div>
                                                <div className="w-100">
                                                    <label className="label mt-5">
                                                        <span className="label-text">Home Address</span>
                                                    </label>
                                                    <input type="text"
                                                        id="address"
                                                        name="address"
                                                        placeholder="Enter"
                                                        className="input input-bordered w-full max-w-xs"
                                                        value={formik.values.address}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.address ? <div className="text-red-500">{formik.errors.address}</div> : null}
                                                </div>
                                                <div className="w-100">
                                                    <label className="label mt-5">
                                                        <span className="label-text">Insurance Number</span>
                                                    </label>
                                                    <input type="text"
                                                        id="insuranceNumber"
                                                        name="insuranceNumber"
                                                        placeholder="Enter"
                                                        className="input input-bordered w-full max-w-xs"
                                                        value={formik.values.insuranceNumber}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.insuranceNumber ? <div className="text-red-500">{formik.errors.insuranceNumber}</div> : null}
                                                </div>
                                                <div className="w-100">
                                                    <label className="label mt-5">
                                                        <span className="label-text">License Number</span>
                                                    </label>
                                                    <input type="text"
                                                        id="licenseNumber"
                                                        name="licenseNumber"
                                                        placeholder="Enter"
                                                        className="input input-bordered w-full max-w-xs"
                                                        value={formik.values.licenseNumber}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.licenseNumber ? <div className="text-red-500">{formik.errors.licenseNumber}</div> : null}
                                                </div>
                                                <div>
                                                    <label className="label mt-5">
                                                        <span className="label-text">Medical Expiration</span>
                                                    </label>
                                                    <input
                                                        className="px-5 py-3 border rounded-xl"
                                                        type="date"
                                                        id="medicalExpiration"
                                                        name="medicalExpiration"
                                                        value={formik.values.medicalExpiration}
                                                        onChange={formik.handleChange} />
                                                    {formik.errors.medicalExpiration ? <div className="text-red-500">{formik.errors.medicalExpiration}</div> : null}
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
                                        </div>
                                        <div className='flex flex-col mt-10 w-full'>
                                            <textarea placeholder="Notes"
                                                className="textarea textarea-bordered textarea-lg w-full"
                                                id="notes"
                                                name="notes"
                                                value={formik.values.notes}
                                                onChange={formik.handleChange}></textarea>
                                        </div>
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6 ">
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
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </div>
    )
}
