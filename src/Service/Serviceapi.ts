import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ListName } from "../Enum/ListInfo";
import { IEmpEntryFormState } from "../CommonMethods/IEntryFormState";

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
                //ManagerId:[],
                //Manager:[],
                //Location:"",
                RelocationReq:formData.RelocationReq,
                //AdminId:0,
                //Admin:"",
                Department:formData.Department
                //DOB:""
            });
            return items;
        }
        catch(err){
            console.error(err);
        }
    }

    
}