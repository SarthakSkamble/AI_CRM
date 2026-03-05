import React from "react";
import Ordercontext from "./ordercontext";
const Orderprovider=({children})=>{
    const [orders,setorders]=React.useState([])
    const[order_id,setorder_id]=React.useState(0)
    return<>
    <Ordercontext.Provider value={{orders,setorders,order_id,setorder_id}}>
      {children}
    </Ordercontext.Provider>

    </>
}

export default Orderprovider