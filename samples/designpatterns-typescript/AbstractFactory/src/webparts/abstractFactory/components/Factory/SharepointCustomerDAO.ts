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