import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Demo() {
  const [sheetdata, setsheetdata] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:2407");
      setsheetdata(response.data);
      console.log(sheetdata);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {sheetdata.map((sdata, index) => (
        <div key={index}>
          <p>
            {" "}
            {sdata[0]} {"\t"} {sdata[1]} {"\t"} {sdata[2]} {"\t"} {sdata[3]}
          </p>
        </div>
      ))}
    </div>
  );
}
