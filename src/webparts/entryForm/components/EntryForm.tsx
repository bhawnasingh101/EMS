import * as React from 'react';
import styles from './EntryForm.module.scss';
import type { IEntryFormProps } from './IEntryFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { handleMultiSelectPeoplePicker, handleSingleSelectedPeoplePicker } from '../../../CommonMethods/PeoplePickerHandler';

import { ChoiceGroup, DatePicker, Dropdown, Label, PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';
import { Dialog } from '@microsoft/sp-dialog';
import {Field, sp} from "@pnp/sp/presets/all";
import {IEmpEntryFormState} from '../../../CommonMethods/IEntryFormState';
import { useState,useEffect } from 'react';
import { CommonServiceClassApi } from '../../../Service/Serviceapi';
import { DateFormate ,DatePickerStrings} from '../../../CommonMethods/DateFormatting';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import{handleSkillsChange} from '../../../CommonMethods/MutliselectDropdownHandler';

const EntryForm:React.FC<IEntryFormProps>=(props)=>{

 const [formdata,setFormdata]=useState<IEmpEntryFormState>({
      Name:"",
      Email:"",
      Age:"",
      Salary:"",
      FullAddress:"",
      Gender:"",
      Skills:[],
      ManagerId:[],
      Manager:[],
      Location:"",
      RelocationReq:false,
      AdminId:0,
      Admin:"",
      Department:"",
      DOB:""
  });

  //setup pnp context
  useEffect(()=>{
      sp.setup({
        spfxContext:props.context as any
      });

    },[]);

    //submit hanlder create item
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
            ManagerId:[],
            Manager:[],
            Location:"",
            RelocationReq:false,
            AdminId:0,
            Admin:"",
            Department:"",
            DOB:""
          });
        }
        catch(err){
          console.error("Error creating form item:", err);
        }
      }
      //submit hanlder update item
      const updateForm=async()=>{
        try{
          let itemID = 13;
          const _service=new CommonServiceClassApi(props.siteurl);
          const result =await _service.UpdateItems(formdata,itemID);
          const itemid=result.data.Id;
          Dialog.alert(`Item  with ID :${itemid} updated successfully`);
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
            ManagerId:[],
            Manager:[],
            Location:"",
            RelocationReq:false,
            AdminId:0,
            Admin:"",
            Department:"",
            DOB:""
          });
        }
        catch(err){
          console.error("Error on updating item:", err);
        }
      }
      const deleteForm=async()=>{
        try{
          let itemID = 13;
          const _service=new CommonServiceClassApi(props.siteurl);
          const result =await _service.deleteItems(formdata,itemID);
          //const itemid=result.data.Id;
          //Dialog.alert(`Item  with ID : ${itemID} deleted successfully`);
         
          //reset form after submission
          setFormdata({
            Name:"",
            Email:"",
            Age:"",
            Salary:"",
            FullAddress:"",
            Gender:"",
            Skills:[],
            ManagerId:[],
            Manager:[],
            Location:"",
            RelocationReq:false,
            AdminId:0,
            Admin:"",
            Department:"",
            DOB:""
          });
        }
        catch(err){
          console.error("Error on updating item:", err);
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
        options={props.genderoptions}
        label='Gender'
        selectedKey={formdata.Gender}
        onChange={(_,option)=>handleSubmit("Gender",option?.key as string)}
      />
      
      <Dropdown
        options={props.departmentoptions}
        label='Department'
        selectedKey={formdata.Department}
        placeholder='--select--'
        onChange={(_,option)=>handleSubmit("Department",option?.key as string)}
        />
        <Dropdown
        options={props.locationoptions}
        label='Location'
        selectedKey={formdata.Location}
        placeholder='--select--'
        onChange={(_,option)=>handleSubmit("Location",option?.key as string)}
        />
        <Dropdown
          options={props.skillsoptions}
          label='Skills'
          defaultSelectedKeys={formdata.Skills}
          placeholder='--select--'
          onChange={(_,opt)=>handleSkillsChange(opt!,formdata,setFormdata)}
          
          multiSelect
      />

      <PeoplePicker
        context={props.context as any}
        titleText="Admin"
        personSelectionLimit={1}
        showtooltip={true}
        onChange={(items)=>handleSingleSelectedPeoplePicker(items,setFormdata)}
        principalTypes={[PrincipalType.User]}
        ensureUser={true}
        defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
        resolveDelay={1000}
        webAbsoluteUrl={props.siteurl}
    />

    <PeoplePicker
        context={props.context as any}
        titleText="Manager"
        personSelectionLimit={2}
        showtooltip={true}
        onChange={(items)=>handleMultiSelectPeoplePicker(items,setFormdata)}
        principalTypes={[PrincipalType.User]}
        ensureUser={true}
        defaultSelectedUsers={formdata.Manager}
        resolveDelay={1000}
        webAbsoluteUrl={props.siteurl}
    />
    
    <DatePicker
      label='DOB'
      strings={DatePickerStrings}
      formatDate={DateFormate}
      onSelectDate={(e)=>setFormdata(prev=>({...prev,DOB:e}))}
    />
      
      <br/>
      <PrimaryButton 
        text='Submit' 
        onClick={createForm} 
        iconProps={{iconName:'save'}}
      />
      <br/>
      <PrimaryButton 
        text='Update' 
        onClick={updateForm} 
        iconProps={{iconName:'update'}}
      />
      <br/>
      <PrimaryButton 
        text='Delete' 
        onClick={deleteForm} 
        iconProps={{iconName:'delete'}}
      />
      </>
      ); 

  

}
export default EntryForm;
