import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useUser } from '@auth0/nextjs-auth0/client';
import prisma from "../lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import { faDroplet, faGauge, faWind, faTemperatureHalf, FaUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import Navbar from "../src/components/Navbar.jsx";
export default function Freights(props) {
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
                <div className="bg-gray-100 w-full" onClick={console.log(props)}>
                    <Navbar />
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
    });
    return {
        props: {
            freights: JSON.parse(JSON.stringify(freights))
        }
    }
}