####Abstract Factory

The abstract factory pattern will allow to define an interface for the creation of objects without specifying their concrete classes.  The objective of this pattern is that a class depends on the behavior of the abstract factory, which in turn will be implemented by different concrete classes that are changed at runtime based on some kind of configuration or predefined parameter.

A very good real life scenario where this pattern can be used is in Data Application Layers scenario, more than often developers and architects are faced with requirements where an application needs to be able to access different databases or event different database servers which have different drivers, but the users want to to that without changing a lot of code, something that can be switched from an easy parameter somewhere.

For the sake of simplicity lets suppose you work at Company A, and company A acquired company B, at company A you have a webpart developed that brings Customer Information from Sharepoint List, but at Company B which was acquired and in the process of merging, they have Product Information in their own CRM which exposes data via REST APIs or just a JSON file.

The users wants to see their products in the same Sharepoint page using the same webpart, meaning that the webpart needs to be added twice with different parameters to the same page and users can search for customers information on both data sources, with the same source code.

####Project Structure
![](https://www.luisevalencia.com/content/images/2018/01/2018-01-04-12_33_49-TypescriptDesignPatterns02AbstractFactoryWebPart.ts---TypescriptDesignPatterns02.png)

As seen above we have  a Factory component and in there we have all files that our project needs, lets discuss them one by one.

######Customer.ts
Our model or data access object, nothing to fancy, the idea is to show the pattern, not complex Data Transfer Objects.

```typescript
class Customer{
    public id: string;
    public firstName: string;
    public lastName: string;
}

export default Customer;

```

#####DatasourcesEnum.ts

Yay!, we have Enums on typescript, and this will allows to ease work with selections on dropdowns, checkboxlists, etc. In this case is just a dropdown list with 2 options, but I guess you see the benefit here.

```typescript

enum DataSources {
    SharepointList = "SharepointList",
    JsonData = "JsonData"
};

export default DataSources;

```

######DaoFactory.ts
This is the abstract class DAO Factory that would need to be implemented, for the ease of sake, I am doing only one DAO, Customers, but you can use the same pattern for many different DTOs as well on the same class.

```typescript
import ICustomerDAO from "./ICustomerDAO";
import SharepointListDAOFactory from "./SharepointListDAOFactory";
import JsonDAOFactory from "./JsonDAOFactory";
import DataSources from "./DatasourcesEnum";

abstract class DAOFactory {

    public abstract getCustomerDAO(): ICustomerDAO;

    public  static getDAOFactory(whichFactory: DataSources): DAOFactory {
        switch (whichFactory) {
          case DataSources.SharepointList:
            return new SharepointListDAOFactory();
          case DataSources.JsonData:
            return new JsonDAOFactory();
          default  :
            return null;
        }
      }
}

export default DAOFactory;

```

######JsoDAOFactory.ts
This class is just the implementation of the factory method
```typescript
import DAOFactory from "./DAOFactory";
import ICustomerDAO from "./ICustomerDAO";
import JsonCustomerDAO from "./JsonCustomerDAO";


class JsonDAOFactory extends DAOFactory {
    getCustomerDAO(): ICustomerDAO{
        return new JsonCustomerDAO();
    }
}

export default JsonDAOFactory;
```

######SharepointListDAOFactory.ts
This class is just the implementation of the factory method
```typescript
import DAOFactory from "./DAOFactory";
import ICustomerDAO from "./ICustomerDAO";
import SharepointCustomerDao from "./SharepointCustomerDAO";

class SharepointListDAOFactory extends DAOFactory {
    getCustomerDAO(): ICustomerDAO{
        return new SharepointCustomerDao();
    }
}

export default SharepointListDAOFactory;

```


######ICustomerDao.ts
Now, this is the customer interface which defines the methods that would need to be implemented and that depends on the data source endpoint, database or driver, or whatever.

```typescript
import Customer from "./Customer";

 interface ICustomerDAO {
    insertCustomer(): number;
    deleteCustomer(): boolean;
    findCustomer(): Customer;
    updateCustomer(): boolean;
    listCustomers(): Customer[];
}

export default ICustomerDAO;
```

######JsonCustomerDAO.ts

Implementation on these methods are left to the reader, but the main idea here is to implement based on the datasource the Data Access Logic here and return the strongly typed objects where needed.

```typescript
import ICustomerDAO from "./ICustomerDAO";
import Customer from "./Customer";

  class JsonCustomerDAO implements ICustomerDAO{
    public insertCustomer(): number {
        // implementation to be done by reader
        return 1;
    }

    public deleteCustomer(): boolean {
        // implementation to be done by reader
        return true;
    }

    public findCustomer(): Customer {
        // implementation to be done by reader
        return new Customer();
    }

    public updateCustomer(): boolean {
        // implementation to be done by reader
        return true;
    }

    public listCustomers(): Customer[] {
        // implementation to be done by reader
        let c1: Customer= new Customer();
        let c2: Customer= new Customer();
        let list: Array<Customer> = [c1, c2 ];
        return list;
    }
}

export default JsonCustomerDAO;
```
######SharepointCustomerDAO.ts

Implementation on these methods are left to the reader, but the main idea here is to implement based on the datasource the Data Access Logic here and return the strongly typed objects where needed.

```typescript
import ICustomerDAO from "./ICustomerDAO";
import Customer from "./Customer";

 class SharepointCustomerDao implements ICustomerDAO {
    public insertCustomer(): number {
        // implementation to be done by reader
        return 1;
    }

    public deleteCustomer(): boolean {
         // implementation to be done by reader
        return true;
    }

    public findCustomer(): Customer {
         // implementation to be done by reader
        return new Customer();
    }

    public updateCustomer(): boolean {
         // implementation to be done by reader
        return true;
    }

    public listCustomers(): Customer[] {
         // implementation to be done by reader
        let c1: Customer = new Customer();
        let c2: Customer = new Customer();
        let list: Array<Customer> = [c1, c2 ];
        return list;
    }
}

export default SharepointCustomerDao;
```

######The component 
This is where we actually see the entire benefit of the abstract factory pattern, as you can see the code is really short here and easy to read, no custom business logic, and everything so easy to maintain.

We create a private property of type ICustomerDao to be instantiated on the setDaos method based on the input of the user in the property pane. This method is only called in the constructor once.

And then in the render method we just get the Customer items from the datasource, and as you can see, its totally generic, no custom logic based on the datasource selected.

```typescript
import * as React from "react";
import { ITypescriptDesignPatterns02AbstractFactoryProps } from "./ITypescriptDesignPatterns02AbstractFactoryProps";
import { ITypescriptDesignPatterns02AbstractFactoryState } from "./ITypescriptDesignPatterns02AbstractFactoryState";
import DAOFactory from "./Factory/DAOFactory";
import ICustomerDAO from "./Factory/ICustomerDAO";
import DataSources from "./Factory/DatasourcesEnum";

export default class TypescriptDesignPatterns02AbstractFactory extends
  React.Component<ITypescriptDesignPatterns02AbstractFactoryProps, ITypescriptDesignPatterns02AbstractFactoryState> {
    private customerDao: ICustomerDAO;

    constructor(props: ITypescriptDesignPatterns02AbstractFactoryProps, state: ITypescriptDesignPatterns02AbstractFactoryState) {
      super(props);
      this.setInitialState();
      this.setDaos(props.datasource);
    }

    public render(): React.ReactElement<ITypescriptDesignPatterns02AbstractFactoryProps> {
      this.state = {
          items: this.customerDao.listCustomers(),
      };

      return null;
    }

    public setInitialState(): void {
      this.state = {
        items: []
      };
    }

    private setDaos(datasource: string): void {
      const data: any = datasource === "Sharepoint" ? DataSources.SharepointList : DataSources.JsonData;
      this.customerDao = DAOFactory.getDAOFactory(data).getCustomerDAO();
    }
}

```

And just for your understanding, I show below the props and states clases

######ITypescriptDesignPatterns02AbstractFactoryProps.ts
```typescript
export interface ITypescriptDesignPatterns02AbstractFactoryProps {
  datasource: string;
}

```
######ITypescriptDesignPatterns02AbstractFactoryState.ts
```typescript
import Customer from "./Factory/Customer";

export interface ITypescriptDesignPatterns02AbstractFactoryState {
    items: Customer[];
  }
```

And finally the webpart code
######TypescriptDesignPatterns02AbstractFactoryWebPart.ts
```typescript
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from "typescriptDesignPatterns02AbstractFactoryStrings";
import TypescriptDesignPatterns02AbstractFactory from "./components/TypescriptDesignPatterns02AbstractFactory";
import { ITypescriptDesignPatterns02AbstractFactoryProps } from "./components/ITypescriptDesignPatterns02AbstractFactoryProps";
import { ITypescriptDesignPatterns02AbstractFactoryWebPartProps } from "./ITypescriptDesignPatterns02AbstractFactoryWebPartProps";

export default class TypescriptDesignPatterns02AbstractFactoryWebPart 
  extends BaseClientSideWebPart<ITypescriptDesignPatterns02AbstractFactoryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITypescriptDesignPatterns02AbstractFactoryProps > = React.createElement(
      TypescriptDesignPatterns02AbstractFactory,
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

```

Conclusion:
We all know that Sharepoint Framework Projects are transpiled and bundled into one single JS file, however regardless of that for those of us who have worked in huge projects and are only User Interface Developers, we know that we can do better than what the standard samples show us in the standard documentation, with the above post I wanted to show you how simple is to create maintenable code, code that anyone can read, and later modify.
