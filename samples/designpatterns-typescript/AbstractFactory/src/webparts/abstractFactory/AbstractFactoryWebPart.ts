import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from 'AbstractFactoryWebPartStrings';
import AbstractFactory from './components/AbstractFactory';
import { IAbstractFactoryProps } from './components/IAbstractFactoryProps';
import { IAbstractFactoryWebPartProps} from './IAbstractFactoryWebPartProps';

export interface IAbstractFactoryWebPartProps {
  description: string;
}

export default class AbstractFactoryWebPart extends BaseClientSideWebPart<IAbstractFactoryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAbstractFactoryProps > = React.createElement(
      AbstractFactory,
      {
        datasource: this.properties.datasource
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneDropdown("datasource", {
                  label: "DataSource",
                  options: [
                      { key: "1", text: "Sharepoint"},
                      { key: "2", text: "JSON" }
                    ],
                  selectedKey: "1",
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}