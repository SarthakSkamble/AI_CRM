import { useState,useEffect } from "react";
import { useContext } from "react";
import Opportunitycontext from "../context/opportunitycontext";
export default function Opportunity_search(){
    const [stage,setstage]=useState("")
    const {
    opportunity,
    setopportunity,
    opportunityid,
    setopportunityid,
  } = useContext(Opportunitycontext);
    useEffect(() => {
        const fetch_data = async () => {
          try {
            let opportunities
            const token = localStorage.getItem("token");
            if(stage==="all"){
                const oppRes = await fetch(
              "http://localhost:3000/api/v1/opportunity/controled_opportunity",
              {
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    stage
                })
              }
            );
    
            const oppJson = await oppRes.json();
            opportunities = oppJson.data;

            }
            else{
           
            const oppRes = await fetch(
              "http://localhost:3000/api/v1/opportunity/controled_opportunity",
              {
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    stage
                })
              }
            );
    
            const oppJson = await oppRes.json();
            opportunities = oppJson.data;
        }
            
            const mergedData = await Promise.all(
              opportunities.map(async (opp) => {
                const leadRes = await fetch(
                  `http://localhost:3000/api/v1/lead/leadid_search`,
                  {
                    method:"POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        lead_id:opp.lead_id
                    })
                  }
                );
    
                const leadJson = await leadRes.json();
                const lead = leadJson.data;
    
                
                return {
                  ...opp,
                  salutation: lead?.salutation,
                  phone: lead?.phone,
                  email: lead?.email,
                  address: lead?.address,
                };
              })
            );
    
            
            setopportunity(mergedData);
            
          } catch (error) {
            console.error("Error fetching merged data:", error);
            
          }
        };
    
        fetch_data();
      }, [stage]);
    return<>
      <div>
          <label className="text-sm font-medium mb-2 text-gray-700">Search Opportunites *</label>
          <select
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={stage}
            onChange={(e) => setstage(e.target.value)}
          >
            <option value="all">Select</option>
            <option value="Qualify">Qualify</option>
            <option value="Meet & Present">Meet & Present </option>
            <option value="Propose">Propose</option>
            <option value="Negotiate">Negotiate</option>
            <option value="Closed Won ">Closed Won </option>
            <option value="Closed Lost">Closed Lost </option>
          </select>
        
        </div>
    </>
}