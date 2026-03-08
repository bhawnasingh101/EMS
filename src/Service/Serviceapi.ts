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
                Title:formData.Name
            });
            return items;
        }
        catch(err){
            console.error(err);
        }
    }

    
}