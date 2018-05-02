import * as React from 'react';
import { IAbstractfactoryProps } from './IAbstractfactoryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DAOFactory from "./Factory/DAOFactory";
import ICustomerDAO from "./Factory/ICustomerDAO";
import DataSources from "./Factory/DatasourcesEnum";
import { IAbstractFactoryState } from './IAbstractFactoryState';

export default class Abstractfactory extends
React.Component<IAbstractfactoryProps, IAbstractFactoryState> {
  private customerDao: ICustomerDAO;

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
    this.customerDao = DAOFactory.getDAOFactory(data).getCustomerDAO();
  }
}
