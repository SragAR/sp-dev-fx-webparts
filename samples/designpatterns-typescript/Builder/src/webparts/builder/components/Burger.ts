import IItem from "./IItem";
import Wrapper from "./Wrapper";
import IPacking from "./IPacking";

abstract class Burger implements IItem {
    public name(): string {
        throw new Error("Method not implemented.");
    }

    public packing(): IPacking {
        return new Wrapper();
    }

    public abstract price(): number ;

}

export default Burger;