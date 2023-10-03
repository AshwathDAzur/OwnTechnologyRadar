import React from 'react';

export default function Pointblock(props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
      {/* Display 5 divs in a row */}
      {props.val.slice(0, 5).map((item, index) => (
        <div key={index} style={{width: "100%", height: "100%", border: "1px solid black", marginTop:10 }}>
        <div style={{alignContent:"center",justifyContent:"center"}}>                
          {item}
        </div>
        </div>
      ))}
    </div>
  );
}
