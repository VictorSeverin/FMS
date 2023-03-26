import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "../lib/prisma.js";

//import Navbar from "../src/components/Navbar.jsx";
export default function Drivers({ drivers }) {
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full" onClick={console.log(drivers)}>
        <Navbar />
        Drivers
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
