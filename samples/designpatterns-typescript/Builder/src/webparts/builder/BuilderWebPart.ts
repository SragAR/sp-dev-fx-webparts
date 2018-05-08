import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";


import * as strings from 'BuilderWebPartStrings';
import Builder from './components/Builder';
import { IBuilderProps } from './components/IBuilderProps';

export interface IBuilderWebPartProps {
  description: string;
  selectedMeal: string;
}

export default class BuilderWebPart extends BaseClientSideWebPart<IBuilderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBuilderProps > = React.createElement(
      Builder,
      {
        description: this.properties.description,
        selectedMeal: this.properties.selectedMeal
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration  {
    return {
      pages: [
        {
          header: {
            description: "Header"
          },
          groups: [
            {
              groupName: "Group",
              groupFields: [
                PropertyPaneDropdown("meal", {
                  label: "Select meal",
                  options: [
                    { key: "Veg", text: "Veg" },
                    { key: "Nonveg", text: "Nonveg" }
                  ],
                  selectedKey: "Nonveg"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
