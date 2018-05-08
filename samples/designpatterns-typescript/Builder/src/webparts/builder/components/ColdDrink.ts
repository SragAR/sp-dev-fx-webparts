import IItem from "./IItem";
import IPacking from "./IPacking";
import Bottle from "./Bottle";

abstract class ColdDrink implements IItem {
    public name(): string {
        throw new Error("Method not implemented.");
    }
    public packing(): IPacking {
        return new Bottle();
    }

    public abstract price(): number ;

}

export default ColdDrink;