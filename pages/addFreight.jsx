import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useFormik, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import prisma from "../lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { useRouter } from "next/router";

export default function AddFreight({ data }) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    pickupLocation: Yup.string().required('Pick up Location is required'),
    dropLocation: Yup.string().required('Drop Location is required'),

    pickupDate: Yup.date().required('Please select Pickup Date'),
    dropDate: Yup.date().required('Please select Pickup Date'),
    broker: Yup.string().required('Please select broker'),
    commodity: Yup.string().required('Please enter commodity'),
    weight: Yup.number().min(0).max(55000).required('Please enter weight').positive(),
    rate: Yup.number().min(0).required('Please enter rate').positive(),
    companyId: Yup.number().required(),
    driverId: Yup.string().required(),
    truckId: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      pickupLocation: '',
      dropLocation: '',
      pickupDate: '',
      dropDate: '',
      broker: '',
      commodity: '',
      weight: '',
      rate: '',
      driverId: '',
      companyId: 1,
      completed: false,
      truckId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addFreigth(values)
      //console.log(typeof values.driverId)
    },
  });
  async function addFreigth(freight) {
    const res = await axios.post('/api/freight', {
      freight
    })
    console.log(res)
    router.push("/freights");
  }
  const currentDate = new Date();
  const currentTime = currentDate.toTimeString([], { hour: '2-digit', minute: '2-digit', });
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll">
        <Navbar />
        <div>
          <h1 className="text-4xl mx-20 my-12">New Freight</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className=" bg-white m-20 rounded-xl border border-gray-300 shadow-lg p-14 ">
              <div className=" flex justify-around items-center">
                {/* pickup - left side */}
                <div className="mx-12 w-full ">
                  <h2 className="text-2xl mb-10">Pickup</h2>

                  <div className="flex justify-between">
                    <div>
                      <label className="label mt-5">
                        <span className="label-text">Pick up Date</span>
                      </label>
                      <input
                        className="px-5 py-3 border rounded-xl"
                        type="datetime-local"
                        id="pickupDate"
                        name="pickupDate"
                        value={formik.values.pickupDate}
                        onChange={formik.handleChange} />
                    </div>

                  </div>

                  <label className="label mt-5">
                    <span className="label-text">Pick up Location</span>
                  </label>
                  <input type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    placeholder="Enter"
                    className="input input-bordered w-full max-w-xs"
                    value={formik.values.pickupLocation}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.pickupLocation ? <div className="text-red-500">{formik.errors.pickupLocation}</div> : null}
                </div>

                <div className="divider divider-horizontal"></div>
                <div className="mx-12 w-full">
                  <h2 className="text-2xl mb-10">Drop</h2>

                  <div className="flex justify-between">
                    <div>
                      <label className="label mt-5">
                        <span className="label-text">Drop Date</span>
                      </label>
                      <input
                        className="px-5 py-3 border rounded-xl"
                        type="datetime-local"
                        id="dropDate"
                        name="dropDate"
                        value={formik.values.dropDate}
                        onChange={formik.handleChange} />
                    </div>

                  </div>

                  <label className="label mt-5">
                    <span className="label-text">Drop Location</span>
                  </label>
                  <input type="text"
                    id="dropLocation"
                    name="dropLocation"
                    placeholder="Enter"
                    className="input input-bordered w-full max-w-xs"
                    value={formik.values.dropLocation}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.dropLocation ? <div className="text-red-500">{formik.errors.dropLocation}</div> : null}
                </div>
              </div>
              <div className="mx-12 my-12 flex flex-col ">
                <div className="w-100">
                  <label className="label mt-5">
                    <span className="label-text">Broker</span>
                  </label>
                  <input type="text"
                    id="broker"
                    name="broker"
                    placeholder="Enter"
                    className="input input-bordered w-full max-w-xs"
                    value={formik.values.broker}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.broker ? <div className="text-red-500">{formik.errors.broker}</div> : null}
                </div>

                <div>
                  <label className="label mt-5">
                    <span className="label-text">Commodity</span>
                  </label>
                  <input type="text"
                    id="commodity"
                    name="commodity"
                    placeholder="Enter"
                    className="input input-bordered w-full max-w-xs"
                    value={formik.values.commodity}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.commodity ? <div className="text-red-500">{formik.errors.commodity}</div> : null}
                </div>
                <div>
                  <label className="label mt-5">
                    <span className="label-text">Weight</span>
                  </label>
                  <label className="input-group">
                    <span>lb</span>
                    <input type="text"
                      id="weight"
                      name="weight"
                      placeholder="Enter"
                      className="input input-bordered w-full max-w-xs"
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                    />

                  </label>
                  {formik.errors.weight ? <div className="text-red-500">{formik.errors.weight}</div> : null}
                </div>
                <div>
                  <label className="label mt-5 ">
                    <span className="label-text">Rate</span>
                  </label>
                  <label className="input-group">
                    <span>$</span>
                    <input type="text"
                      id="rate"
                      name="rate"
                      placeholder="Enter"
                      className="input input-bordered w-full max-w-xs"
                      value={formik.values.rate}
                      onChange={formik.handleChange}
                    />

                  </label>
                  {formik.errors.rate ? <div className="text-red-500">{formik.errors.rate}</div> : null}
                </div>
                <div>
                  <label className="label mt-5">
                    <span className="label-text">Driver</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs"
                    name="driverId"
                    id="driverId"
                    value={formik.values.driverId}
                    onChange={formik.handleChange}>
                    <option value='' label="Select" disabled></option>
                    {data.drivers.map((driver) => (
                      <>
                        <option key={driver.id} value={driver.id} label={driver.firstName + " " + driver.lastName}></option>
                      </>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label mt-5">
                    <span className="label-text">Truck</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs"
                    name="truckId"
                    id="truckId"
                    value={formik.values.truckId}
                    onChange={formik.handleChange}>
                    <option value='' label="Select"></option>
                    {data.trucks.map((truck) => (
                      <option key={truck.id} value={truck.id} label={truck.year + " " + truck.make + " " + truck.model}></option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-outline btn-info mx-5 ">Submit</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  if (!session?.user) {
    return {
      redirect: {
        destination: 'api/auth/login',
        permanent: false,
      },
    };
  }
  const { user } = session
  const company = await prisma.company.findMany({
    where: {
      OwnerID: user.id,
    },
  });
  const drivers = await prisma.driver.findMany({
    where: {
      companyId: company.id,
    },
  });
  const trucks = await prisma.truck.findMany({
    where: {
      companyId: company.id,
    }
  })
  return {
    props: {
      data: JSON.parse(JSON.stringify({ drivers, trucks }))
    }
  }
}