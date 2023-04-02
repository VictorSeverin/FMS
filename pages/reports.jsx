import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { handleAuth } from "@auth0/nextjs-auth0";
//import Navbar from "../src/components/Navbar.jsx";
export default function Reports() {
  async function handleClick() {
    const res = await axios.post('/api/auth/hook', {
      email: "blobsasssss@gmail.com",
      firstName: "Dev",
      lastName: "test",
      avatarUrl: "url",
      secret: 1,
    })
    console.log(res.data)
  }
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <Navbar />

        <button onClick={handleClick}> Click</button>
      </div>
    </div>
  );
}
