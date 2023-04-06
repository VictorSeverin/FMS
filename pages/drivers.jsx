import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "../lib/prisma.js";
import DriverCard from "../components/DriverCard.jsx";
import { useState } from "react";
import AddDriverModal from "../components/AddDriverModal.jsx";
import { useUser } from '@auth0/nextjs-auth0/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Drivers({ data }) {
  const [driverState, setDriverState] = useState(data.drivers)
  const { user, error, isLoading } = useUser();

  const addDriver = (newDriver) => {
    setDriverState([...driverState, newDriver])
    console.log(driverState)
  }
  function removeDriver(driverId) {
    const updatedList = driverState.filter((driver) => driver.id != driverId)
    setDriverState(updatedList)
  }
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll" onClick={console.log(data)}>
        <Navbar user={data.owner} />
        <div className="flex items-center justify-between ">
          <h1 className="text-4xl font-semibold px-12 py-8">Drivers</h1>
          <AddDriverModal addDriver={addDriver} />
        </div>

        <div className="grid grid-wrap grid-cols-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            driverState.length > 0 ?
              driverState.map((driver) => (
                <>
                  <DriverCard driver={driver} removeDriver={removeDriver} />
                </>
              )) :
              <div>No Drivers</div>}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res)
  if (!session?.user) {
    return {
      redirect: {
        destination: 'api/auth/login',
        permanent: false,
      },
    };
  }
  const { user } = session
  const owner = await prisma.user.findFirst({
    where: {
      email: user.email,
    }
  })
  try {
    const company = await prisma.company.findMany({
      where: {
        OwnerId: owner.id,
      },
    });
    if (!company) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
    const drivers = await prisma.driver.findMany({
      where: {
        companyId: company[0].id,
      },
    });
    return {
      props: {
        data: JSON.parse(JSON.stringify({ company, drivers, owner }))
      }
    }
  } catch {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
}

