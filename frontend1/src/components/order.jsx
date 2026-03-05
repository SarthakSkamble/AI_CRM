import { useContext, useEffect, useState } from "react";
import Ordercontext from "../context/ordercontext";
import Update_order from "./update_order";
import Invoice from "./invoice";

export default function Order() {

  const token = localStorage.getItem("token");
  const { orders, setorders, order_id, setorder_id } = useContext(Ordercontext);

  const [leadData,setLeadData] = useState(null)
  const [opportunityData,setOpportunityData] = useState(null)
  const [showUpdateModal,setShowUpdateModal] = useState(false)
  const [showInvoiceModal,setShowInvoiceModal] = useState(false)
  const [filter,setFilter] = useState("all")

  useEffect(() => {

    async function fetchOrders() {

      let url = "http://localhost:3000/api/v1/orders/get_orders"
      let options = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }

      if(filter !== "all"){

        url = "http://localhost:3000/api/v1/orders/get_controlled_orders"

        let bodyData = {}

        if(filter === "pending") bodyData.order_status = "Pending"
        if(filter === "confirmed") bodyData.order_status = "Confirmed"
        if(filter === "completed") bodyData.order_status = "Completed"

        if(filter === "paid") bodyData.payment_status = "Paid"
        if(filter === "unpaid") bodyData.payment_status = "Unpaid"

        options = {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify(bodyData)
        }

      }

      const data = await fetch(url,options)
      const res = await data.json()
      const ordersData = res.data

      const ordersWithData = await Promise.all(
        ordersData.map(async (order) => {

          const itemData = await fetch("http://localhost:3000/api/v1/orders/get_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              order_id: order.order_id
            })
          });

          const itemsRes = await itemData.json();

          const oppData = await fetch("http://localhost:3000/api/v1/orders/get_opportunity_by_id",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
              opportunity_id:order.opportunity_id
            })
          })

          const oppRes = await oppData.json()

          return {
            ...order,
            items: itemsRes.data,
            opportunity_name: oppRes.data.opportunity_name
          };
        })
      );

      setorders(ordersWithData);
    }

    fetchOrders();

  }, [showUpdateModal,filter]);




  async function getLead(lead_id){

    const data = await fetch("http://localhost:3000/api/v1/orders/get_lead_by_id",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({lead_id})
    })

    const res = await data.json()
    setLeadData(res.data)
    setOpportunityData(null)

  }




  async function getOpportunity(opportunity_id){

    const data = await fetch("http://localhost:3000/api/v1/orders/get_opportunity_by_id",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({opportunity_id})
    })

    const res = await data.json()
    setOpportunityData(res.data)
    setLeadData(null)

  }




  return (
    <>
      <div className="relative">

        <div>

          <h2 className="text-2xl font-bold mb-4">Orders</h2>

{/* FILTER SELECT */}

<div className="mb-4">
<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
className="border px-3 py-2 rounded"
>

<option value="all">All Orders</option>
<option value="pending">Status: Pending</option>
<option value="confirmed">Status: Confirmed</option>
<option value="completed">Status: Completed</option>
<option value="paid">Payment: Paid</option>
<option value="unpaid">Payment: Unpaid</option>

</select>
</div>



{leadData && (
<div className="mb-6 p-4 border rounded bg-blue-50">
<h3 className="font-bold text-lg mb-2">Lead Information</h3>
<p><b>Name:</b> {leadData.Name}</p>
<p><b>Email:</b> {leadData.email}</p>
<p><b>Phone:</b> {leadData.phone}</p>
<p><b>Status:</b> {leadData.lead_status}</p>
<p><b>Address:</b> {leadData.address}</p>
</div>
)}



{opportunityData && (
<div className="mb-6 p-4 border rounded bg-green-50">
<h3 className="font-bold text-lg mb-2">Opportunity Information</h3>
<p><b>Name:</b> {opportunityData.opportunity_name}</p>
<p><b>Title:</b> {opportunityData.title}</p>
<p><b>Stage:</b> {opportunityData.stage}</p>
<p><b>Amount:</b> {opportunityData.amount}</p>
<p><b>Probability:</b> {opportunityData.probability}%</p>
<p><b>Next Step:</b> {opportunityData.next_step}</p>
</div>
)}



          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[420px] overflow-y-auto">

              <table className="w-full table-fixed text-sm">

                <thead className="bg-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="border p-2">Opportunity Name</th>
                    <th className="border p-2">Order Date</th>
                    <th className="border p-2">Delivery Date</th>
                    <th className="border p-2">Order Status</th>
                    <th className="border p-2">Payment Status</th>
                    <th className="border p-2">Subtotal</th>
                    <th className="border p-2">Tax</th>
                    <th className="border p-2">Discount</th>
                    <th className="border p-2">Total</th>
                    <th className="border p-2">Items</th>
                    <th className="border p-2">Details</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (
                    <tr key={order.order_id} className="text-center hover:bg-gray-100">

                      <td className="border p-2 font-semibold">
                        {order.opportunity_name}
                      </td>

                      <td className="border p-2">
                        {new Date(order.order_date).toLocaleDateString()}
                      </td>

                      <td className="border p-2">
                        {new Date(order.delivery_date).toLocaleDateString()}
                      </td>

                      <td className="border p-2">{order.order_status}</td>

                      <td className="border p-2">{order.payment_status}</td>

                      <td className="border p-2">{order.subtotal}</td>

                      <td className="border p-2">{order.tax}</td>

                      <td className="border p-2">{order.discount}</td>

                      <td className="border p-2 font-semibold">
                        {order.total_amount}
                      </td>

                      <td className="border p-2">
                        {order.items?.map((item) => (
                          <div key={item.item_id} className="border-b py-1">
                            Qty:{item.quantity} | Price:{item.unit_price}
                          </div>
                        ))}
                      </td>

                      <td className="border p-2 space-y-1">

                        <button
                          onClick={()=>getLead(order.lead_id)}
                          className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Lead
                        </button>

                        <button
                          onClick={()=>getOpportunity(order.opportunity_id)}
                          className="w-full bg-green-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Opportunity
                        </button>

                        <button
                          onClick={()=>{
                            setorder_id(order.order_id)
                            setShowUpdateModal(true)
                          }}
                          className="w-full bg-orange-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Update Order
                        </button>

                        <button
                          onClick={()=>{
                            setorder_id(order.order_id)
                            setShowInvoiceModal(true)
                          }}
                          className="w-full bg-orange-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Create Invoice
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>


{showUpdateModal && (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

<Update_order
onClose={()=>{
setShowUpdateModal(false)
setorder_id(null)
}}
/>


</div>
)}
{showInvoiceModal && (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

<Invoice
onClose={()=>{
setShowInvoiceModal(false)
setorder_id(null)
}}
/>


</div>
)}

    </>
  );
}