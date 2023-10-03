import React, { useEffect, useState } from "react";
import Axios from "axios";
import Appbar from "../Components/Appbar";
import Pointblock from "../Components/Pointblock";

export default function Landing() {
    const [data, setdata] = useState();
    useEffect(()=>{
        getdata();
        },[]);
    const getdata = async ()=>{
        try{
            const response = await Axios.get("http://localhost:2407");
            console.log(response.data);
            setdata(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div>
      <Appbar />
      { 
      data ? (
        data.map((indidata)=>(
            <Pointblock val={indidata}/>
        ))
      ):(
        <div>
            Loading....
        </div>
      )
      }
    </div>
  );
}
