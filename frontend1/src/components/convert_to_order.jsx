import { useState, useContext, useEffect } from "react"
import Opportunitycontext from "../context/opportunitycontext"

export default function CreateOrder({ onClose }) {

const { opportunityid, leadid } = useContext(Opportunitycontext)
const token = localStorage.getItem("token");
const [delivery_date,setDeliveryDate] = useState("")
const [status,setStatus] = useState("Pending")
const [payment_status,setPaymentStatus] = useState("Unpaid")
const [tax,setTax] = useState(0)
const [discount,setDiscount] = useState(0)
const [notes,setNotes] = useState("")

const [services,setServices] = useState([])

const [service_id,setServiceId] = useState("")
const [quantity,setQuantity] = useState(1)
const [unit_price,setUnitPrice] = useState(0)

const [items,setItems] = useState([])

useEffect(()=>{

const fetchServices = async()=>{
    

const res = await fetch(
  "https://ai-crm-kb9x.onrender.com/api/v1/opportunity/get_services",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
const data = await res.json()

setServices(data.data)

}

fetchServices()

},[])


const handleServiceChange = (e)=>{

const selectedService = services.find(
service => service.service_id === e.target.value
)

setServiceId(selectedService.service_id)
setUnitPrice(selectedService.service_price)

}


const addItem = ()=>{

if(!service_id) return

const selectedService = services.find(
service => service.service_id === service_id
)

const total_price = quantity * unit_price

const newItem = {
service_id,
service_name:selectedService.service_name,
quantity:Number(quantity),
unit_price:Number(unit_price),
total_price:Number(total_price)
}

setItems([...items,newItem])

setServiceId("")
setQuantity(1)
setUnitPrice(0)

}


const deleteItem = (index)=>{
const updated = items.filter((_,i)=>i!==index)
setItems(updated)
}


const subtotal = items.reduce((acc,item)=>acc+item.total_price,0)

const total_amount = subtotal + Number(tax) - Number(discount)


const handleSubmit = async(e)=>{

e.preventDefault()

const payload = {
opportunity_id:opportunityid,
lead_id:leadid,
delivery_date:delivery_date? new Date(delivery_date).toISOString()
              : null,
status,
payment_status,
subtotal,
tax:Number(tax),
discount:Number(discount),
total_amount,
notes,
listofitems:items
}

await fetch("https://ai-crm-kb9x.onrender.com/api/v1/opportunity/create_order",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization: `Bearer ${token}`
},
body:JSON.stringify(payload)
})

onClose && onClose()

}


return(

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

<div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8">

<h1 className="text-2xl font-bold mb-6 text-gray-800">
Create Order
</h1>

<form onSubmit={handleSubmit} className="space-y-6">


<div>

<label className="block text-gray-600 mb-1">
Delivery Date
</label>

<input
type="date"
value={delivery_date}
onChange={e=>setDeliveryDate(e.target.value)}
className="input"
/>

</div>



<div className="grid grid-cols-2 gap-4">

<div>

<label className="block text-gray-600 mb-1">
Order Status
</label>

<select
value={status}
onChange={e=>setStatus(e.target.value)}
className="input"
>
<option>Pending</option>
<option>Confirmed</option>
<option>Completed</option>
</select>

</div>


<div>

<label className="block text-gray-600 mb-1">
Payment Status
</label>

<select
value={payment_status}
onChange={e=>setPaymentStatus(e.target.value)}
className="input"
>
<option>Unpaid</option>
<option>Paid</option>
</select>

</div>

</div>



<h2 className="font-semibold text-lg mt-4">
Add Services
</h2>


<div className="grid grid-cols-3 gap-4">

<div>

<label className="text-sm text-gray-600">
Service
</label>

<select
value={service_id}
onChange={handleServiceChange}
className="input"
>

<option value="">
Select Service
</option>

{services.map(service=>(
<option
key={service.service_id}
value={service.service_id}
>
{service.service_name} - ₹{service.service_price}
</option>
))}

</select>

</div>


<div>

<label className="text-sm text-gray-600">
Quantity
</label>

<input
type="number"
value={quantity}
onChange={e=>setQuantity(e.target.value)}
className="input"
/>

</div>


<div>

<label className="text-sm text-gray-600">
Unit Price
</label>

<input
type="number"
value={unit_price}
readOnly
className="input"
/>

</div>

</div>


<button
type="button"
onClick={addItem}
className="bg-black text-white px-5 py-2 rounded-lg mt-2"
>
Add Item
</button>



<div className="space-y-2">

{items.map((item,index)=>(

<div
key={index}
className="flex justify-between items-center bg-gray-100 p-3 rounded"
>

<div>

<p className="font-semibold">
{item.service_name}
</p>

<p className="text-sm text-gray-500">
Qty: {item.quantity} | Price: ₹{item.unit_price}
</p>

</div>

<button
type="button"
onClick={()=>deleteItem(index)}
className="text-red-600"
>
Delete
</button>

</div>

))}

</div>



<div className="grid grid-cols-2 gap-4">
Tax
<input
type="number"
placeholder="Tax"
value={tax}
onChange={e=>setTax(e.target.value)}
className="input"
/>
Discount
<input
type="number"
placeholder="Discount"
value={discount}
onChange={e=>setDiscount(e.target.value)}
className="input"
/>

</div>



<textarea
placeholder="Notes"
value={notes}
onChange={e=>setNotes(e.target.value)}
className="input"
/>



<div className="text-right">

<p className="text-gray-600">
Subtotal: ₹{subtotal}
</p>

<p className="font-semibold text-gray-800">
Total: ₹{total_amount}
</p>

</div>



<div className="flex gap-3">

<button
type="submit"
className="flex-1 bg-black text-white py-3 rounded-xl"
>
Create Order
</button>

{onClose && (
<button
type="button"
onClick={onClose}
className="flex-1 bg-red-500 text-white py-3 rounded-xl"
>
Close
</button>
)}

</div>


</form>

</div>


<style>{`

.input{
width:100%;
padding:0.75rem 1rem;
border:1px solid #d1d5db;
border-radius:0.75rem;
outline:none;
}

.input:focus{
border-color:#000;
box-shadow:0 0 0 2px rgba(0,0,0,0.1);
}

`}</style>

</div>

)

}