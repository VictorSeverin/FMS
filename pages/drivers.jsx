import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "../lib/prisma.js";
import DriverCard from "../components/DriverCard.jsx";
//import Navbar from "../src/components/Navbar.jsx";
export default function Drivers({ drivers }) {
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll" onClick={console.log(drivers)}>
        <Navbar />
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold px-12 py-8">Drivers</h1>
          <button className="btn bg-sky-600 mx-12">Add Driver</button>
        </div>
        <div className="grid grid-wrap grid-cols-12">
          {drivers.map((driver) => (
            <>
              <DriverCard driver={driver} />
            </>
          ))}
        </div>
      </div>
    </div>
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
