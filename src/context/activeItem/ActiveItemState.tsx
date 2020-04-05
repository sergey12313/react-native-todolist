import React, { useState,ReactElement, useCallback } from "react"
import {ActiveItemContext} from "./activeItemContext"

export const ActiveItemState: React.FC<{children: ReactElement}> = ({children}) => {
    const [active, setActive] = useState<string| null>(null)
    const clearActive = useCallback(()=>{
        setActive(null);
    }, [])
    return (
        <ActiveItemContext.Provider value={{active, setActive, clearActive}}>
            {children}
        </ActiveItemContext.Provider>
    )
}
 
