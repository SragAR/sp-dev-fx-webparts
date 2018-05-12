import * as React from 'react';
import { IAbstractfactoryProps } from "./IAbstractFactoryProps";  
import { IAbstractFactoryState } from "./IAbstractFactoryState";  
import styles from './Abstractfactory.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import DaoFactory from "./DaoFactory";  
import ICustomerDao from "./ICustomerDao";  
import DataSources from "./DatasourcesEnum";

export default class Abstractfactory extends React.Component<IAbstractfactoryProps, {}> {
  private customerDao: ICustomerDao;

    constructor(props: IAbstractfactoryProps, state: IAbstractFactoryState) {
      super(props);
      this.setInitialState();
      this.setDaos(props.datasource);
    }

    public render(): React.ReactElement<IAbstractfactoryProps> {
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
      this.customerDao = DaoFactory.getDAOFactory(data).getCustomerDAO();
    }
}
