import {createContext} from "react"
import {ActiveItemContextType} from "../../types"

export const ActiveItemContext = createContext<ActiveItemContextType>({
    active: null,
    setActive: (arg)=>{},
    clearActive: ()=>{}
})