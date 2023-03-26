import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useUser } from '@auth0/nextjs-auth0/client';
import prisma from "../lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import Link from "next/link.js";

//import Navbar from "../src/components/Navbar.jsx";
export default function Freights({ freights }) {
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
        <div className="bg-gray-100 w-full" onClick={console.log(freights)}>
          <Navbar />
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl mx-20 my-12">All Freights</h1>
              <Link href="/addFreight">
                <button className="btn btn-outline btn-info mx-20 my-12">Add new freight</button>
              </Link>
            </div>
            <div className="overflow-x-auto m-20 border border-gray-200 shadow-lg">
              <table className="table w-full">
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
                  {freights.map((freight) => (
                    <tr key={freight.id} className="hover">
                      <th>{freight.id}</th>
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
  const company = await prisma.company.findMany({
    where: {
      OwnerID: user.id,
    },
  });
  const freights = await prisma.freight.findMany({
    where: {
      companyId: company.id,
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
      freights: JSON.parse(JSON.stringify(freights))
    }
  }
}