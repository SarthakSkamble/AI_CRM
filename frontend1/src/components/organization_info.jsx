import { useEffect, useState } from "react";

export default function Organization_info() {

const token = localStorage.getItem("token")

const [organizationName,setOrganizationName] = useState("")
const [organizationEmail,setOrganizationEmail] = useState("")
const [industryType,setIndustryType] = useState("")
const [country,setCountry] = useState("")
const [preferredLanguage,setPreferredLanguage] = useState("")

const [services,setServices] = useState([])
const [admins,setAdmins] = useState([])
const [users,setUsers] = useState([])
const [leads,setLeads] = useState([])
const [opportunities,setOpportunities] = useState([])
const [orders,setOrders] = useState([])

useEffect(()=>{

async function loadData(){

const headers = {
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
}

const org = await fetch("http://localhost:3000/api/v1/organization/organization_info",{headers})
const orgData = await org.json()

setOrganizationName(orgData.data.organization_name)
setOrganizationEmail(orgData.data.organization_email)
setIndustryType(orgData.data.industry_type)
setCountry(orgData.data.country)
setPreferredLanguage(orgData.data.preferred_language)

const servicesRes = await fetch("http://localhost:3000/api/v1/opportunity/get_services",{headers})
const servicesData = await servicesRes.json()
setServices(servicesData.data)

const adminRes = await fetch("http://localhost:3000/api/v1/organization/get_all_admins",{headers})
const adminData = await adminRes.json()
setAdmins(adminData.data)

const userRes = await fetch("http://localhost:3000/api/v1/organization/get_all_users",{headers})
const userData = await userRes.json()
setUsers(userData.data)

const leadRes = await fetch("http://localhost:3000/api/v1/organization/get_all_leads",{headers})
const leadData = await leadRes.json()
setLeads(leadData.data)

const oppRes = await fetch("http://localhost:3000/api/v1/organization/get_all_opportunity",{headers})
const oppData = await oppRes.json()
setOpportunities(oppData.data)

const orderRes = await fetch("http://localhost:3000/api/v1/organization/get_all_orders",{headers})
const orderData = await orderRes.json()
setOrders(orderData.data)

}

loadData()

},[])

return(

<div className="p-10 space-y-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold">Organization Dashboard</h1>

<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Organization Info</h2>

<p><b>Name:</b> {organizationName}</p>
<p><b>Email:</b> {organizationEmail}</p>
<p><b>Industry:</b> {industryType}</p>
<p><b>Country:</b> {country}</p>
<p><b>Language:</b> {preferredLanguage}</p>

</div>


<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Services</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-200">
<tr>
<th>Name</th>
<th>Code</th>
<th>Category</th>
<th>Description</th>
<th>Price</th>
</tr>
</thead>

<tbody>

{services.map((s,i)=>(
<tr key={i} className="border-b text-center">
<td>{s.service_name}</td>
<td>{s.service_code}</td>
<td>{s.service_category}</td>
<td>{s.service_description}</td>
<td>{s.service_price}</td>
</tr>
))}

</tbody>
</table>

</div>
</div>


<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Admins</h2>

<ul className="space-y-2">

{admins.map((a,i)=>(
<li key={i} className="border p-2 rounded">
<b>{a.admin_name}</b> — {a.admin_email}
</li>
))}

</ul>

</div>


<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Users</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-200">
<tr>
<th>Name</th>
<th>Email</th>
<th>Employee Id</th>
<th>Region</th>
<th>Role</th>
</tr>
</thead>

<tbody>

{users.map((u,i)=>(
<tr key={i} className="border-b text-center">
<td>{u.full_name}</td>
<td>{u.email}</td>
<td>{u.employee_id}</td>
<td>{u.sales_region}</td>
<td>{u.role}</td>
</tr>
))}

</tbody>

</table>

</div>
</div>


<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Leads</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-200">
<tr>
<th>Name</th>
<th>Title</th>
<th>Status</th>
<th>Email</th>
<th>Phone</th>
<th>Source</th>
</tr>
</thead>

<tbody>

{leads.map((l,i)=>(
<tr key={i} className="border-b text-center">
<td>{l.Name}</td>
<td>{l.title}</td>
<td>{l.lead_status}</td>
<td>{l.email}</td>
<td>{l.phone}</td>
<td>{l.source}</td>
</tr>
))}

</tbody>

</table>

</div>
</div>


<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Opportunities</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-200">
<tr>
<th>Name</th>
<th>Title</th>
<th>Amount</th>
<th>Stage</th>
<th>Probability</th>
<th>Next Step</th>
</tr>
</thead>

<tbody>

{opportunities.map((o,i)=>(
<tr key={i} className="border-b text-center">
<td>{o.opportunity_name}</td>
<td>{o.title}</td>
<td>₹{o.amount}</td>
<td>{o.stage}</td>
<td>{o.probability}%</td>
<td>{o.next_step}</td>
</tr>
))}

</tbody>

</table>

</div>
</div>


<div className="bg-white shadow rounded p-6">
<h2 className="text-xl font-semibold mb-4">Orders</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-200">
<tr>
<th>Order Date</th>
<th>Delivery</th>
<th>Status</th>
<th>Payment</th>
<th>Total</th>
</tr>
</thead>

<tbody>

{orders.map((o,i)=>(
<tr key={i} className="border-b text-center">
<td>{new Date(o.order_date).toLocaleDateString()}</td>
<td>{new Date(o.delivery_date).toLocaleDateString()}</td>
<td>{o.order_status}</td>
<td>{o.payment_status}</td>
<td>₹{o.total_amount}</td>
</tr>
))}

</tbody>

</table>

</div>
</div>

</div>

)

}