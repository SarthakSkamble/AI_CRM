import { useContext, useEffect, useState } from "react"
import Ordercontext from "../context/ordercontext"

export default function Invoice({ onClose }) {

const token = localStorage.getItem("token")
const { order_id } = useContext(Ordercontext)

const [order,setOrder] = useState(null)
const [lead,setLead] = useState(null)
const [opportunity,setOpportunity] = useState(null)

useEffect(()=>{

async function fetchData(){

const orderReq = await fetch(
"http://localhost:3000/api/v1/orders/get_order_by_id",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({order_id})
}
)

const orderRes = await orderReq.json()
const orderData = orderRes.data
setOrder(orderData)

const oppReq = await fetch(
"http://localhost:3000/api/v1/orders/get_opportunity_by_id",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({opportunity_id:orderData.opportunity_id})
}
)

const oppRes = await oppReq.json()
setOpportunity(oppRes.data)

const leadReq = await fetch(
"http://localhost:3000/api/v1/orders/get_lead_by_id",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({lead_id:orderData.lead_id})
}
)

const leadRes = await leadReq.json()
setLead(leadRes.data)

}

fetchData()

},[order_id])

if(!order || !lead || !opportunity){
return <div className="bg-white p-10 rounded">Loading Invoice...</div>
}

return(

<div className="bg-white w-[800px] p-8 rounded shadow-lg">

{/* HEADER */}

<div className="flex justify-between items-center border-b pb-4 mb-6">

<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xs">
LOGO
</div>
<h1 className="text-xl font-bold">INVOICE</h1>
</div>

<div className="text-sm">
<p><b>Date:</b> {new Date(order.order_date).toLocaleDateString()}</p>
<p><b>Invoice #:</b> {order.order_id.slice(0,8)}</p>
</div>

</div>



{/* CUSTOMER */}

<div className="flex justify-between mb-6 text-sm">

<div>
<p className="font-semibold mb-1">Bill To</p>
<p>{lead.Name}</p>
<p>{lead.address}</p>
<p>{lead.email}</p>
<p>{lead.phone}</p>
</div>

<div>
<p><b>Opportunity:</b> {opportunity.opportunity_name}</p>
<p><b>Stage:</b> {opportunity.stage}</p>
</div>

</div>



{/* ITEMS TABLE */}

<table className="w-full border text-sm mb-6">

<thead className="bg-gray-100">
<tr>
<th className="border p-2">Description</th>
<th className="border p-2">Quantity</th>
<th className="border p-2">Unit Price</th>
<th className="border p-2">Total</th>
</tr>
</thead>

<tbody>

<tr>
<td className="border p-2">{opportunity.title}</td>
<td className="border p-2 text-center">1</td>
<td className="border p-2 text-right">₹{order.subtotal}</td>
<td className="border p-2 text-right">₹{order.subtotal}</td>
</tr>

</tbody>

</table>



{/* TOTALS */}

<div className="flex justify-end">

<div className="w-[250px] text-sm">

<div className="flex justify-between border-b py-1">
<span>Subtotal</span>
<span>₹{order.subtotal}</span>
</div>

<div className="flex justify-between border-b py-1">
<span>Tax</span>
<span>₹{order.tax}</span>
</div>

<div className="flex justify-between border-b py-1">
<span>Discount</span>
<span>₹{order.discount}</span>
</div>

<div className="flex justify-between font-bold text-lg pt-2">
<span>Total</span>
<span>₹{order.total_amount}</span>
</div>

</div>

</div>



{/* NOTES */}

<div className="mt-6 text-sm">
<p><b>Notes:</b></p>
<p>{order.notes}</p>
</div>



{/* FOOTER */}

<div className="mt-6 flex justify-between items-center">

<p className="italic text-sm">
Thank you for your business!
</p>

<button
onClick={onClose}
className="bg-gray-600 text-white px-4 py-2 rounded"
>
Close
</button>

</div>

</div>

)

}