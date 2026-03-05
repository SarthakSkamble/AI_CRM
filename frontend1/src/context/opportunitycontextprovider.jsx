import React from "react";
import Opportunitycontext from "./opportunitycontext";
const Opportunityprovider=({children})=>{
    const [opportunity, setopportunity] = React.useState([]);
    const [opportunityid,setopportunityid]=React.useState("")
    const [leadid,setleadid]=React.useState("")
    return<>
    <Opportunitycontext.Provider value={{opportunity, setopportunity,opportunityid,setopportunityid,leadid,setleadid}}>
      {children}
    </Opportunitycontext.Provider>

    </>
}

export default Opportunityprovider