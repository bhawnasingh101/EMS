import React from "react";
import { IEmpEntryFormState } from "./IEntryFormState";

export const handleSingleSelectedPeoplePicker=(items:any[],setFormData:React.Dispatch<React.SetStateAction<IEmpEntryFormState>>)=>{
    if(items.length>0){
        setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}));
    }
    else{
         setFormData(prev=>({...prev,Admin:"",AdminId:0})); 
    }

}

export const handleMultiSelectPeoplePicker=(items:any[],setFormData:React.Dispatch<React.SetStateAction<IEmpEntryFormState>>)=>{
    setFormData(prev=>({...prev,Manager:items.map(i=>i.text),

        ManagerId:items.map(i=>i.id)
    }));
}