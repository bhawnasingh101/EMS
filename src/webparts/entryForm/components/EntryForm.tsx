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
      Name:"",
      Email:"",
      Age:"",
      Salary:"",
      FullAddress:"",
      Gender:"",
      Skills:[],
      //ManagerId:[],
      //Manager:[],
      //Location:"",
      RelocationReq:false,
      //AdminId:0,
      //Admin:"",
      Department:""
      //DOB:""
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
            Name:"",
            Email:"",
            Age:"",
            Salary:"",
            FullAddress:"",
            Gender:"",
            Skills:[],
            //ManagerId:[],
            //Manager:[],
            //Location:"",
            RelocationReq:false,
            //AdminId:0,
            //Admin:"",
            Department:""
            //DOB:""
          });
        }
        catch(err){
          console.error("Error creating form item:", err);
        }
      }

      const handleSubmit=React.useCallback((field:keyof IEmpEntryFormState,value:string|number|boolean):void=>{
        setFormdata(prev=>({...prev,[field]:value}));
      },[]);

      const skillList =[
          { key: 'Powerapps', text: 'Powerapps' },
          { key: 'Spfx', text: 'Spfx' },
          { key: 'Sharepoint', text: 'Sharepoint' },
          { key: 'Powerautomate', text: 'Powerautomate' }
        ];
        const deptList =[
          { key: 'IT', text: 'IT' },
          { key: 'HR', text: 'HR' },
          { key: 'Admin', text: 'Admin' },
          { key: 'Sales', text: 'Sales' }
        ];
        const genderList =[
          { key: 'Male', text: 'Male' },
          { key: 'Female', text: 'Female' },
          { key: 'Others', text: 'Others' }
        ];
    return(
      <>
      <TextField
        label='Name'
        value={formdata.Name}
        onChange={(_,val)=>handleSubmit("Name",val||"")}
      />
      <TextField
        label='Email'
        value={formdata.Email}
        onChange={(_,val)=>handleSubmit("Email",val||"")}
      />
      <TextField
        label='Age'
        value={formdata.Age}
        onChange={(_,val)=>handleSubmit("Age",val||"")}
      />
      <TextField
        label='Salary'
        value={formdata.Salary}
        onChange={(_,val)=>handleSubmit("Salary",val||"")}
      />
      <TextField
        label='Full Address'
        value={formdata.FullAddress}
        onChange={(_,val)=>handleSubmit("FullAddress",val||"")}
        multiline
        rows={5}
      />
      <Toggle
      label='Relocation Req'
      checked={formdata.RelocationReq}
      onChange={(_,checked)=>handleSubmit("RelocationReq",!!checked)}
      />
       <ChoiceGroup
        options={genderList}
        label='Gender'
        selectedKey={formdata.Gender}
        onChange={(_,option)=>handleSubmit("Gender",option?.key as string)}
      />
      
      <Dropdown
        options={deptList}
        label='Department'
        selectedKey={formdata.Department}
        placeholder='--select--'
        onChange={(_,option)=>handleSubmit("Department",option?.key as string)}
        />
        <Dropdown
          options={skillList}
          label='Skills'
          defaultSelectedKeys={formdata.Skills}
          placeholder='--select--'
          
          multiSelect
      />
      
      <br/>
      <PrimaryButton 
        text='Submit' 
        onClick={createForm} 
        iconProps={{iconName:'save'}}
      />
      </>
      ); 

  

}
export default EntryForm;
