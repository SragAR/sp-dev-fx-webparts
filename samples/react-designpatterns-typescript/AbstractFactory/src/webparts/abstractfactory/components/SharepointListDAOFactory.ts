import DaoFactory from "./DaoFactory";  
import ICustomerDao from "./ICustomerDao";  
import SharepointCustomerDao from "./SharepointCustomerDAO";

class SharepointListDAOFactory extends DaoFactory {  
    public getCustomerDAO(): ICustomerDao{
        return new SharepointCustomerDao();
    }
}

export default SharepointListDAOFactory;