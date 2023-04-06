import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from "../lib/prisma.js";
import { handleAuth } from "@auth0/nextjs-auth0";
//import Navbar from "../src/components/Navbar.jsx";
export default function Reports({ data }) {
  async function handleClick() {

  }
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <Navbar user={data.owner} />

        <button onClick={handleClick}> Click</button>
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
