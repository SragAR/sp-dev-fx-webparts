import * as React from 'react';
//import styles from './AbstractFactory.module.scss';
import { IAbstractFactoryProps } from './IAbstractFactoryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IAbstractFactoryState } from './IAbstractFactory';
import ICustomerDAO from './Factory/ICustomerDAO';
import DataSources from "./Factory/DatasourcesEnum";
import DAOFactory from "./Factory/DAOFactory";

export default class AbstractFactory  extends
React.Component<IAbstractFactoryProps, IAbstractFactoryState> {
  private customerDao: ICustomerDAO;

  constructor(props: IAbstractFactoryProps, state: IAbstractFactoryState) {
    super(props);
    this.setInitialState();
    this.setDaos(props.datasource);
  }

  public render(): React.ReactElement<IAbstractFactoryProps> {
    this.state = {
        items: this.customerDao.listCustomers(),
    };

    return (
      <div>
        Hello Abstract factory
      </div>
    );
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