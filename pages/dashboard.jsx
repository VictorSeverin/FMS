import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useUser } from '@auth0/nextjs-auth0/client';
import prisma from "../lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import { userContext } from "../Contexts/userContext.js";
import { useContext } from "react";
import CreateCompanyModal from "../components/CreateCompanyModal.jsx"
//import Navbar from "../src/components/Navbar.jsx";
export default function Freights({ data }) {
    const { user, error, isLoading } = useUser();
    //const { owner } = useContext(userContext)
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
                <div className="bg-gray-100 h-screen w-full " onClick={console.log(data)}>
                    <Navbar user={data.owner} />
                    <div className="w-full flex justify-around p-10 flex-wrap ">
                        <div className="stats shadow my-4">
                            <div className="stat flex justify-center items-center flex-col">
                                <div className="stat-title">Current Freights</div>
                                <div className="stat-value">1</div>
                                <div className="stat-desc">21% more than last week</div>
                            </div>
                        </div>
                        <div className="stats shadow my-4">
                            <div className="stat flex justify-center items-center flex-col">
                                <div className="stat-title">Total Drivers Out</div>
                                <div className="stat-value">5</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        </div>
                        <div className="stats shadow my-4">
                            <div className="stat flex justify-center items-center flex-col">
                                <div className="stat-title">Total Trucks Running</div>
                                <div className="stat-value">5</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        </div>
                    </div>
                    {/* stats end */}
                    {/* table start */}
                    <div className="overflow-x-auto m-20 shadow-lg">
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
                                </tr>
                            </thead>
                            {data.noCompany ? <CreateCompanyModal show={true} owner={data.owner} /> :
                                <tbody>
                                    {data.freights && data.freights.length > 0 ?
                                        data.freights.map((freight) => (
                                            <tr key={freight.id}>
                                                <th>{freight.id}</th>
                                                <td>{freight.pickupLocation}</td>
                                                <td>{freight.dropLocation}</td>
                                                <td>{freight.pickupDate}</td>
                                                <td>{freight.dropDate}</td>
                                                <td>{freight.broker}</td>
                                                <td>{freight.Driver.firstName + " " + freight.Driver.lastName}</td>
                                            </tr>
                                        ))
                                        :
                                        <div>No Freights</div>
                                    }
                                </tbody>}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
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
    const now = new Date()
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
        if (company.length == 0) {
            return {
                props: {
                    data: JSON.parse(JSON.stringify({ noCompany, owner }))
                }
            }
        }
        const freights = await prisma.freight.findMany({
            where: {
                companyId: company.id,
                dropDate: {
                    gte: now
                }
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
                data: JSON.parse(JSON.stringify({ company, owner }))
            }
        }
    } catch {
        const noCompany = true;
        return {
            props: {
                data: JSON.parse(JSON.stringify({ noCompany, owner }))
            }
        }
    }

}