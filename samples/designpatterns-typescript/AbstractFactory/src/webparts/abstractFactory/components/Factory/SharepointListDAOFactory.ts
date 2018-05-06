import DAOFactory from "./DAOFactory";
import ICustomerDAO from "./ICustomerDAO";
import SharepointCustomerDao from "./SharepointCustomerDAO";

class SharepointListDAOFactory extends DAOFactory {
    public getCustomerDAO(): ICustomerDAO{
        return new SharepointCustomerDao();
    }
}

export default SharepointListDAOFactory;