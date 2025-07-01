import { createContext, useContext, useState } from "react";


export const SelectedUserContext = createContext();

export const useSelectedUserContext=()=>{
    return useContext(SelectedUserContext);
}

export const SelectedUserContextProvider=({children})=>{
    const [selecteduser,setselecteduser]= useState(null);

    return <SelectedUserContext.Provider value={{selecteduser,setselecteduser}}>{children}</SelectedUserContext.Provider>
}