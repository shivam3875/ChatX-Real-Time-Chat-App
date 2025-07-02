import { createContext, useContext, useState } from "react";


export const ConversationContext = createContext();

export const useConversationsContext=()=>{
    return useContext(ConversationContext);
}

export const ConversationContextProvider=({children})=>{
    const [selectedconvo,setselectedconvo]= useState(null);

    return <ConversationContext.Provider value={{selectedconvo,setselectedconvo}}>{children}</ConversationContext.Provider>
}