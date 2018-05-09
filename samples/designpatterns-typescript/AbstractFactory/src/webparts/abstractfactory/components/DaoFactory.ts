import ICustomerDAO from "./ICustomerDAO";  

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
import SharepointListDAOFactory from "./SharepointListDAOFactory";  
import JsonDAOFactory from "./JsonDAOFactory";  