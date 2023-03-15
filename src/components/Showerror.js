
import React from 'react'

const Showerror = ({msg}) => {


  return (  
    <div>(
       
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        > 
        {msg}
        </span>
      )</div>
  )
}
export default Showerror