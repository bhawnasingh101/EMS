import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListName } from "../Enum/ListInfo";
export default class GetChoiceValuesClassApi{
    private context:WebPartContext;
    constructor(context:WebPartContext){
        this.context=context;
    };
public async getChoiceValues(siteurl:string,fieldValue:string):Promise<any>{
    try{ 
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName.FirstList}')/fields/?$filter=EntityPropertyName eq '${fieldValue}'`,
    {
        method:'GET',
        headers:{
            'Accept':'application/json;odata=nometadata'
        }
    }
);
if(!response.ok){
    throw new Error(`Error while fetching chocie values ${response.text}-${response.statusText}`);
};

const data=await response.json();
const choice=data.value[0].Choices;
return choice.map((items:any)=>({
    key:items,
    text:items
}));
    }
    catch(err){
console.error(err);
return [];
    }
}

//get Lookup

public async getLookupValues():Promise<any>{
    try{
        const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${ListName.Location}')/items?$select=Title,ID`,
            {
                method:'GET',
                headers:{
                    'Accept':'application/json;odata=nometadata'
                }
            }
        );
        if(!response.ok){
            throw new Error(`Error while fetching looup values ${response.text}-${response.statusText}`);
        };
        const data=await response.json();
        return data.value.map((location:{Title:string,ID:string})=>({
            key:location.ID,
            text:location.Title
        }))
    }
    catch(err){
        console.error(err);
        return [];
    }
}
}