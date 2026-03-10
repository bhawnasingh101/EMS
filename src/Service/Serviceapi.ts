import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ListName } from "../Enum/ListInfo";
import { IEmpEntryFormState } from "../CommonMethods/IEntryFormState";
import { Dialog } from "@fluentui/react";

export class CommonServiceClassApi{
    private web;
    constructor(siteurl:string){
        this.web=Web(siteurl);
    }

    public async addItems(formData:IEmpEntryFormState):Promise<any>{
        try{
            const list =this.web.lists.getByTitle(ListName.FirstList);
            const items=await list.items.add({
                Title:formData.Name,
                Email:formData.Email,
                Age:parseInt(formData.Age),
                Salary:parseFloat(formData.Salary),
                FullAddress:formData.FullAddress,
                Gender:formData.Gender,
                Skills:{results:formData.Skills},
                AdminId:formData.AdminId,
                ManagerId:{results:formData.ManagerId},
                LocationId:formData.Location,
                RelocationReq:formData.RelocationReq,
                Department:formData.Department,
                DOB:new Date(formData.DOB)
            });
            return items;
        }
        catch(err){
            console.error(err);
        }
    }

     public async UpdateItems(formData:IEmpEntryFormState,itemId:number):Promise<any>{
        try{
            const list =this.web.lists.getByTitle(ListName.FirstList);
            const items=await list.items.getById(itemId).update({
                Title:formData.Name,
                Email:formData.Email,
                Age:parseInt(formData.Age),
                Salary:parseFloat(formData.Salary),
                FullAddress:formData.FullAddress,
                Gender:formData.Gender,
                Skills:{results:formData.Skills},
                AdminId:formData.AdminId,
                ManagerId:{results:formData.ManagerId},
                LocationId:formData.Location,
                RelocationReq:formData.RelocationReq,
                Department:formData.Department,
                DOB:new Date(formData.DOB)
            });
            return items;
        }
        catch(err){
            console.error(err);
        }
    }

    public async deleteItems(formData:IEmpEntryFormState,itemId:number):Promise<any>{
        try{
            const list =this.web.lists.getByTitle(ListName.FirstList);
            const items=await list.items.getById(itemId).delete();
            //Dialog.alert(`Item  with ID : ${itemId} deleted successfully`);
            //return items;
        }
        catch(err){
            console.error(err);
        }
    }

    
}