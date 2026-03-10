import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'EntryFormWebPartStrings';
import EntryForm from './components/EntryForm';
import { IEntryFormProps } from './components/IEntryFormProps';
import GetChoiceValuesClassApi from '../../Service/ChoicesServiceapi';

export interface IEntryFormWebPartProps {
  description: string;
}

export default class EntryFormWebPart extends BaseClientSideWebPart<IEntryFormWebPartProps> {

  private choiceClassService!:GetChoiceValuesClassApi;

  protected async onInit(): Promise<void> {
    this.choiceClassService=new GetChoiceValuesClassApi(this.context);
    return super.onInit();
  }
  

  public async render(): Promise<void>  {
    const element: React.ReactElement<IEntryFormProps> = React.createElement(
      EntryForm,
      {
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl,
       departmentoptions:await this.choiceClassService.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Department"),
       skillsoptions:await this.choiceClassService.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Skills"),
       genderoptions:await this.choiceClassService.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Gender"),
       locationoptions:await this.choiceClassService.getLookupValues()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  



 
  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
