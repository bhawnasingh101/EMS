import * as React from 'react';
import styles from './EntryForm.module.scss';
import type { IEntryFormProps } from './IEntryFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ChoiceGroup, DatePicker, Dropdown, Label, PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';
import { Dialog } from '@microsoft/sp-dialog';
import {Field, sp} from "@pnp/sp/presets/all";
import {IEmpEntryFormState} from '../../../CommonMethods/IEntryFormState';
import { useState,useEffect } from 'react';
import { CommonServiceClassApi } from '../../../Service/Serviceapi';


const EntryForm:React.FC<IEntryFormProps>=(props)=>{

 const [formdata,setFormdata]=useState<IEmpEntryFormState>({
    Name:""
  });

  //setup pnp context
  useEffect(()=>{
      sp.setup({
        spfxContext:props.context as any
      });

    },[]);

    //submit hanlder creation fo form
      const createForm=async()=>{
        try{
          const _service=new CommonServiceClassApi(props.siteurl);
          const result =await _service.addItems(formdata);
          const itemid=result.data.Id;
          Dialog.alert(`Item created successfully with ID:${result.data.Id}`);
          console.log(result);
          //reset form after submission
          setFormdata({
            Name:""
          });
        }
        catch(err){
          console.error("Error creating form item:", err);
        }
      }

      const handleSubmit=React.useCallback((field:keyof IEmpEntryFormState,value:string):void=>{
        setFormdata(prev=>({...prev,[field]:value}));
      },[]);

    return(
      <>
      <TextField
      label='Name'
      value={formdata.Name}
      onChange={(_,val)=>handleSubmit("Name",val||"")}
      />
      <br/>
      <PrimaryButton text='Submit' onClick={createForm} 
      iconProps={{iconName:'save'}}
      />
      </>
      ); 

  

}
export default EntryForm;
