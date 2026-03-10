import { IEmpEntryFormState } from "./IEntryFormState";
import { IDropdownOption } from "@fluentui/react";

export const handleSkillsChange=(options:IDropdownOption,formData:IEmpEntryFormState,setFormData:React.Dispatch<React.SetStateAction<IEmpEntryFormState>>)=>{
    const selectedkey=options.selected?[...formData.Skills,options?.key as string]:formData.Skills.filter((key:any)=>key!==options.key);
    setFormData(prev=>({...prev,Skills:selectedkey}));
}