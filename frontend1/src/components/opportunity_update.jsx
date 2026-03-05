import { useEffect, useState,useContext } from "react";
import Opportunitycontext from "../context/opportunitycontext";
export default function Update_opportunity({onClose}){
    const {
    opportunity,
    setopportunity,
    opportunityid,
    setopportunityid,
    leadid,
    setleadid
  } = useContext(Opportunitycontext);
     const [salutation, setSalutation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [opportunity_name, setOpportunityName] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState("");
  const [probability, setProbability] = useState("");
  const [forecast_category, setForecastCategory] = useState("");
  const [next_step, setNextStep] = useState("");
  useEffect(()=>{
    console.log(opportunity)
    console.log(opportunityid)
    if (!opportunityid || opportunity.length === 0) return;
    const selectedopp = opportunity.find(
      (opp) => opp.opportunity_id === opportunityid
    );
    console.log("this ",selectedopp)
    
    setSalutation(selectedopp.salutation)
    setTitle(selectedopp.title)
    setDescription(selectedopp.description)
    setPhone(selectedopp.phone)
    setEmail(selectedopp.email)
    setAddress(selectedopp.address)
    setOpportunityName(selectedopp.opportunity_name)
    setAmount(selectedopp.amount)
    setStage(selectedopp.stage)
    setProbability(selectedopp.probability)
    setForecastCategory(selectedopp.forecast_category)
    setNextStep(selectedopp.next_step)

  },[opportunityid])
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data= await fetch("https://ai-crm-kb9x.onrender.com/api/v1/opportunity/update_opportunity",{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify({
              opportunity_id:opportunityid,
              lead_id:leadid,
              salutation,
              title,
              description,
              phone,
              email,
              address,
              opportunity_name,
              amount,stage,
              probability,
              forecast_category,
              next_step
          })

    })
    const res = await data.json();
    if(!data){
        console.log("Error")
    }
    onClose()
  }
    return<>
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-8">
          Update Opportunity
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Opportunity Name</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={opportunity_name}
              onChange={(e) => setOpportunityName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Salutation</label>
            <select
              className="border rounded-lg px-4 py-2"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Title</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Phone *</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Email *</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          

          <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Amount 
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Address</label>
            <input
              className="border rounded-lg px-4 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              className="border rounded-lg px-4 py-2 h-28"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Stage 
          </label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
          >
            <option value="">Select</option>
            <option value="Qualify">Qualify</option>
            <option value="Meet & Present">Meet & Present</option>
            <option value="Propose">Propose</option>
            <option value="Negotiate">Negotiate</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Probability (%) 
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={probability}
            onChange={(e) => setProbability(e.target.value)}
            
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Forecast Category 
          </label>
          <select
            value={forecast_category}
            onChange={(e) => setForecastCategory(e.target.value)}
            
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
          >
            <option value="">Select</option>
            <option value="Omitted">Omitted</option>
            <option value="Pipeline">Pipeline</option>
            <option value="Best Case">Best Case</option>
            <option value="Commit">Commit</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Next Step
          </label>
          <input
            value={next_step}
            onChange={(e) => setNextStep(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>

          

          <div className="col-span-2 flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Update 
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
}