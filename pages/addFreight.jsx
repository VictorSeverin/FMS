import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

//import Navbar from "../src/components/Navbar.jsx";
export default function AddFreight() {
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <Navbar />Add Freight
      </div>
    </div>
  );
}
