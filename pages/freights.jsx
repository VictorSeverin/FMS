import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useUser } from '@auth0/nextjs-auth0/client';
import prisma from "../lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import Link from "next/link.js";
import { useState } from "react";

//import Navbar from "../src/components/Navbar.jsx";
export default function Freights({ data }) {
  const [freights, setFreights] = useState(data.freights)
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (user) {
    return (
      <div className="flex" id="site-content">
        <Sidebar />
        <div className="bg-gray-100 w-full overflow-y-scroll" onClick={console.log(data)}>
          <Navbar user={data.owner} />
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl mx-20 my-12">All Freights</h1>
              <Link href="/addFreight">
                <button className="btn btn-outline btn-info mx-20 my-12">Add new freight</button>
              </Link>
            </div>
            <div className="overflow-x-auto m-20 border border-gray-200 shadow-lg">
              <table className="table w-full table-layout:auto">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Pickup Location</th>
                    <th>Drop Location</th>
                    <th>Pickup</th>
                    <th>Drop</th>
                    <th>Broker</th>
                    <th>Driver</th>
                    <th>Truck</th>
                    <th>Commodity</th>
                    <th>Weight (lb)</th>
                    <th>Rate ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {freights.map((freight, index) => (
                    <tr key={freight.id} className="hover">
                      <th>{index}</th>
                      <td>{freight.pickupLocation}</td>
                      <td>{freight.dropLocation}</td>
                      <td>{freight.pickupDate}</td>
                      <td>{freight.dropDate}</td>
                      <td>{freight.broker}</td>
                      <td>{freight.Driver.firstName + " " + freight.Driver.lastName}</td>
                      <td>{freight.Truck.year + " " + freight.Truck.make + " " + freight.Truck.model}</td>
                      <td>{freight.commodity}</td>
                      <td>{freight.weight + " lb"}</td>
                      <td className="font-semibold text-lg">{'$' + freight.rate}</td>
                      <td className="font-semibold text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 hover:cursor-pointer hover:scale-150">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
    const freights = await prisma.freight.findMany({
      where: {
        companyId: company[0].id,
      },
      include: {
        Driver: {
          select: {
            firstName: true,
            lastName: true,
          }
        },
        Truck: {
          select: {
            make: true,
            model: true,
            year: true,
          }
        }
      }
    });
    return {
      props: {
        data: JSON.parse(JSON.stringify({ freights, owner, company }))
      }
    }
  }
  catch {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

}