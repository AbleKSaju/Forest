import React, { useEffect, useState } from "react";

export const useInputs = () => {
    const [input, setInput] = useState({
      forward: false,
      backward: false,
      left: false,
      right: false,
      shift: false,
      jump: false,
    });
  
    const keys = {
      KeyW: "forward",
      KeyS: "backward",
      KeyA: "left",
      KeyD: "right",
      ShiftLeft: "shift",
      Space: "jump",
    };
  
    useEffect(() => {
        const handleKeyDown = (e) => {
            // console.log(e.code, "code");
            // console.log(input, "input before");
          
            setInput((prevInput) => ({ ...prevInput, [keys[e.code]]: true }));
          
            // console.log(input, "input after (still the previous state)");
          };
  
      const handleKeyUp = (e) => {
        setInput((m) => ({ ...m, [keys[e.code]]: false }));
      };
  
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, [input]);
  
    return input;
  };
  
  


