import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useFormik, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import prisma from "../lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';

export default function AddFreight({ drivers }) {
  const validationSchema = Yup.object().shape({
    pickupLocation: Yup.string().required('Pick up Location is required'),
    dropLocation: Yup.string().required('Drop Location is required'),
    pickupTime: Yup.string(),
    dropTime: Yup.string(),
    pickupDate: Yup.date().required('Please select Pickup Date'),
    dropDate: Yup.date().required('Please select Pickup Date'),
    broker: Yup.string().required('Please select broker'),
    commodity: Yup.string().required('Please enter commodity'),
    weight: Yup.number().min(0).max(55000).required('Please enter weight').positive(),
    rate: Yup.number().min(0).required('Please enter rate').positive(),
    companyId: Yup.number().required(),
    driver: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      pickupLocation: '',
      dropLocation: '',
      pickupTime: '',
      dropTime: '',
      pickupDate: '',
      dropDate: '',
      broker: '',
      commodity: '',
      weight: '',
      rate: '',
      driver: '',
      companyId: 1,

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));

    },
  });
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll" >
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
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formik.values.pickupDate}
                        onChange={formik.handleChange} />
                    </div>
                    <div>
                      <label className="label mt-5">
                        <span className="label-text">Pick up Time</span>
                      </label>
                      <input type="time" id="pickupTime" name="pickupTime" className="px-5 py-3 border rounded-xl" />
                      {formik.errors.pickupTime ? <div className="text-red-500">{formik.errors.pickupTime}</div> : null}
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
                        type="date"
                        id="dropDate"
                        name="dropDate"
                        value={formik.values.dropDate}
                        onChange={formik.handleChange} />
                    </div>
                    <div>
                      <label className="label mt-5">
                        <span className="label-text">Drop Time</span>
                      </label>
                      <input type="time" id="dropTime" name="dropTime" className="px-5 py-3 border rounded-xl" />
                      {formik.errors.dropTime ? <div className="text-red-500">{formik.errors.dropTime}</div> : null}
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
                    name="driver"
                    id="driver" value={formik.values.driver}
                    onChange={formik.handleChange}>
                    {drivers.map((driver) => (
                      <option key={driver.id} value="{driver.firstName}">{driver.firstName + " " + driver.lastName}</option>
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
  return {
    props: {
      drivers: JSON.parse(JSON.stringify(drivers))
    }
  }
}