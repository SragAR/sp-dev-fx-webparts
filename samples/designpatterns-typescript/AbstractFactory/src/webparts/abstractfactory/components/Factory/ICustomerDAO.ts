import Customer from "./Customer";

 interface ICustomerDAO {
    insertCustomer(): number;
    deleteCustomer(): boolean;
    findCustomer(): Customer;
    updateCustomer(): boolean;
    listCustomers(): Customer[];
}

export default ICustomerDAO;