import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/sidebar.jsx";
//import Navbar from "../src/components/Navbar.jsx";
export default function Statistics() {
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <Navbar />
        Statistics</div>
    </div>
  );
}
