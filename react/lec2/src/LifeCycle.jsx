import { useEffect, useState } from "react"

const LifeCycle = () => {
    // Lifecycle events:
    /**
     * These are the events that happens in the specific life points of the component.
     * 1. Mounting: During the insertion of component in dom.
     * 2. Updating: During re-rendering
     * 3. Unmounting: When the component is being removed from the dom.
     */

    const [count, setCount] = useState(0);
    
    useEffect(()=>{
        const fn = ()=>{
            setCount((prev)=>prev+1);
        }
        fn();
        console.log("Componet mounted");

        return ()=>{
            console.log("Componet unmounted");
        }
        
    }, []); // runs during mounting and unmounting

    return (
    <div>
        <button
        onClick={()=>{
            setCount(prev=>prev+1);
        }}
        >
            {count}
        </button>
    </div>
  )
}

export default LifeCycle
