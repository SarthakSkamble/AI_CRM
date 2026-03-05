import Leadcontext from "./leadcontext";
import React from "react";
const Leadprovider=({children})=>{
    const [leads, setLeads] = React.useState([]);
    const [leadid,setleadid]=React.useState("")
    return<>
    <Leadcontext.Provider value={{leads,setLeads,leadid,setleadid}}>
      {children}
    </Leadcontext.Provider>

    </>
}

export default Leadprovider