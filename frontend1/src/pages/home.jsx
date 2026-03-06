import { useState, useEffect } from "react";
import Leads from "../components/lead";
import Opportunity from "../components/opportunity";
import Order from "../components/order";
import After_sales_service from "../components/After_Sales_services";
import UserProfile from "../components/profile";
import Organization_info from "../components/organization_info";

export default function Home() {

  const [activePage, setActivePage] = useState("home");

  const [leadCount,setLeadCount] = useState(0)
  const [opportunityCount,setOpportunityCount] = useState(0)
  const [orderCount,setOrderCount] = useState(0)
  const [userCount,setUserCount] = useState(0)
  const [serviceCount,setServiceCount] = useState(0)

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(()=>{

    async function loadCounts(){

      const res = await fetch(
        "https://ai-crm-kb9x.onrender.com/api/v1/organization/get_count",
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }
      )

      const data = await res.json()

      setLeadCount(data.data.leads)
      setOpportunityCount(data.data.opportunities)
      setOrderCount(data.data.orders)
      setUserCount(data.data.users)
      setServiceCount(data.data.services)

    }

    if(token){
      loadCounts()
    }

  },[token])

  if (!token) {
    return <>Login first</>;
  }

  return (
    <>
      <div className="w-full h-14 bg-slate-700 flex items-center justify-between px-6 shadow-md fixed top-0 left-0 z-40">

        <div className="flex items-center gap-6 text-white">

          <span className="text-lg font-semibold tracking-wide">
            CRM Dashboard
          </span>

          <button
            onClick={() => setActivePage("home")}
            className={`px-3 py-1 rounded transition ${
              activePage === "home"
                ? "bg-slate-500"
                : "hover:bg-slate-600"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActivePage("leads")}
            className={`px-3 py-1 rounded transition ${
              activePage === "leads"
                ? "bg-slate-500"
                : "hover:bg-slate-600"
            }`}
          >
            Leads
          </button>

          <button
            onClick={() => setActivePage("opportunity")}
            className={`px-3 py-1 rounded transition ${
              activePage === "opportunity"
                ? "bg-slate-500"
                : "hover:bg-slate-600"
            }`}
          >
            Opportunity
          </button>

          <button
            onClick={() => setActivePage("order")}
            className={`px-3 py-1 rounded transition ${
              activePage === "order"
                ? "bg-slate-500"
                : "hover:bg-slate-600"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setActivePage("after_sales_service")}
            className={`px-3 py-1 rounded transition ${
              activePage === "after_sales_service"
                ? "bg-slate-500"
                : "hover:bg-slate-600"
            }`}
          >
            After Sales Service
          </button>

        </div>

        <div className="flex items-center gap-4">

          {role === "admin" && (
            <button
              onClick={() => setActivePage("organization")}
              className={`text-white px-3 py-1 rounded transition ${
                activePage === "organization"
                  ? "bg-slate-500"
                  : "hover:bg-slate-600"
              }`}
            >
              Organization
            </button>
          )}

          <button
            onClick={() => setActivePage("profile")}
            className={`bg-white text-slate-700 px-4 py-1 rounded-md text-sm font-medium transition ${
              activePage === "profile"
                ? "bg-slate-200"
                : "hover:bg-slate-200"
            }`}
          >
            Profile
          </button>

        </div>

      </div>

      <div className="pt-20 px-6 bg-gray-100 min-h-screen">

        {activePage === "home" && (

          <div className="space-y-8">

            <h1 className="text-3xl font-bold text-gray-700">
              Welcome to your CRM Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <p className="text-gray-500 text-sm">Total Leads</p>
                <h2 className="text-3xl font-bold text-blue-600">{leadCount}</h2>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <p className="text-gray-500 text-sm">Opportunities</p>
                <h2 className="text-3xl font-bold text-green-600">{opportunityCount}</h2>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <p className="text-gray-500 text-sm">Orders</p>
                <h2 className="text-3xl font-bold text-purple-600">{orderCount}</h2>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <p className="text-gray-500 text-sm">Users</p>
                <h2 className="text-3xl font-bold text-orange-600">{userCount}</h2>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <p className="text-gray-500 text-sm">Services</p>
                <h2 className="text-3xl font-bold text-red-600">{serviceCount}</h2>
              </div>

            </div>


            <div className="grid md:grid-cols-2 gap-6">

            
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">
                  Quick Actions
                </h2>

                <div className="flex flex-col gap-3">

                  <button
                    onClick={() => setActivePage("leads")}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Create / Manage Leads
                  </button>

                  <button
                    onClick={() => setActivePage("opportunity")}
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Manage Opportunities
                  </button>

                  <button
                    onClick={() => setActivePage("order")}
                    className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
                  >
                    View Orders
                  </button>

                </div>
              </div>


              
              <div className="bg-white p-6 rounded-lg shadow">

                <h2 className="text-xl font-semibold mb-3 text-indigo-600">
                  AI Lead Scoring
                </h2>

                <p className="text-gray-600 mb-3">
                  Our CRM uses an AI-based lead scoring system to predict how likely
                  a lead is to convert into a customer.
                </p>

                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Scores are generated automatically when a lead is created</li>
                  <li>AI analyzes age, lead source, calls made, and email interactions</li>
                  <li>Higher scores indicate higher conversion probability</li>
                  <li>Helps sales teams prioritize high-value leads</li>
                </ul>

              </div>


              
              <div className="bg-white p-6 rounded-lg shadow">

                <h2 className="text-xl font-semibold mb-3">
                  CRM Tips
                </h2>

                <ul className="list-disc ml-6 text-gray-600 space-y-2">

                  <li>Create leads to track potential customers</li>
                  <li>Convert leads into opportunities</li>
                  <li>Close opportunities to generate orders</li>
                  <li>Use after-sales services to maintain clients</li>
                  <li>Monitor organization data for business insights</li>

                </ul>

              </div>

            </div>

          </div>

        )}

        {activePage === "leads" && <Leads />}
        {activePage === "opportunity" && <Opportunity />}
        {activePage === "order" && <Order />}
        {activePage === "after_sales_service" && <After_sales_service />}
        {activePage === "profile" && <UserProfile />}
        {activePage === "organization" && <Organization_info />}

      </div>
    </>
  );
}