# Builder  applied to Sharepoint Framework

#####Builder Factory

>Builder pattern builds a complex object using simple objects and using a step by step approach. This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object.

A Builder class builds the final object step by step. This builder is independent of other objects.

For this pattern, we have taken an existing example https://www.tutorialspoint.com/design_pattern/builder_pattern.htm and translated it to Typescript.  Data Access implementation details are left to the reader.

The idea on this example is to show how you can build a Complex object from single objects, a Meal from (burger, fries, soda).  Suppose you have a Sharepoint List for Burgers, another list for Sodas, another one for desserts, and you want to build different Meals (Menus), so this would be a perfect sample.

######UML
This is more or less the diagram of the classes were are coding below.

![](https://www.luisevalencia.com/content/images/2018/02/builder_pattern_uml_diagram.jpg)


######Project structure
We have created a component with all the needed class, lets discuss them one by one.

![](https://www.luisevalencia.com/content/images/2018/02/typescript.png)


######IItem.ts

This interface is the one that every item needs to implement to come with a common structure for all products.

```typescript
import IPacking from "./IPacking";

interface IItem {
    name(): string;
    packing(): IPacking;
    price(): number;
}

export default IItem;
```

######Ipacking.ts

This interface is the one that all packaging will use, eg: Bottle, Wrapper, etc, its the way to define common behavior and properties for each product packing.

```typescript
interface IPacking {
    pack(): string;
}

export default IPacking;
```

######Bottle.ts
This is one type of packing, it implements the IPacking interface.

```typescript
import IPacking from "./IPacking";

class Bottle implements IPacking {
    public pack(): string {
       return "Bottle";
    }
}

export default Bottle;
```


######Wrapper.ts

```typescript
import IPacking from "./IPacking";

class Wrapper implements IPacking {
    public pack(): string {
       return "Wrapper";
    }
}

export default Wrapper;
```

######Burger.ts
This is an abstract class from which all our specific burgers need to implement, its there to have a common structure for name, packing and pricing.

```typescript
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
```

######ChickenBurger.ts
```typescript
import Burger from "./Burger";

class ChickenBurger extends Burger {
    public price(): number {
        return 15;
    }

    public name(): string {
        return "Chicken Burger";
    }
}

export default ChickenBurger;

```

######VegBurger.ts
```typescript
import Burger from "./Burger";

class VegBurger extends Burger {
    public price(): number {
        return 11;
    }

    public name(): string {
        return "Veg Burger";
    }
}

export default VegBurger;

```
######Colddrink.ts
```typescript
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

```
######Coke.ts
```typescript
import ColdDrink from "./ColdDrink";

class Coke extends ColdDrink {
    public price(): number {
       return 2.5;
    }

    public name(): string {
        return "Coca Cola";
    }
}

export default Coke;


```
######Pepsi.ts
```typescript
import ColdDrink from "./ColdDrink";

class Pepsi extends ColdDrink {
    public price(): number {
       return 1.5;
    }

    public name(): string {
        return "Pepsi Cola";
    }
}

export default Pepsi;

```
######Meal.ts

This class will represent a full meal behavior, here we have the methods to add items to the Meal, get the cost and show the items belonging to the Meal.

```typescript
import IItem from "./IItem";

class Meal {
    private items: IItem[];

    public addItem(item: IItem): void {
        this.items.push(item);
    }

    public getCost(): number {
        let cost: number  = 0;
        for(let item of this.items) {
            cost+= item.price();
        }

        return cost;
    }

    public showItems(): string {
        let returnStr: string;
        for(let item of this.items) {
            returnStr +="Item:" + item.name;
            returnStr +=", Packing:" + item.packing().pack();
            returnStr +=", Price: " + item.price();
        }
        return returnStr;
    }
}

export default Meal;
```

######MealBuilder.ts

Mealbuilder its just the class that uses the classes explained before to construct any type of meal, for sake of simplicity, we created only 2 meals here.

```typescript
import Meal from "./Meal";
import VegBurger from "./VegBurger";
import Coke from "./Coke";
import ChickenBurger from "./ChickenBurger";

class MealBuilder {
    public prepareVegMeal(): Meal {
        let meal: Meal= new Meal();
        meal.addItem(new VegBurger());
        meal.addItem(new Coke());
        return meal;
    }

    public prepareNonVegMeal(): Meal {
        let meal: Meal= new Meal();
        meal.addItem(new ChickenBurger());
        meal.addItem(new Coke());
        return meal;
    }
}

export default MealBuilder;
```

######ITypescriptDesignPatterns03BuilderProps.ts
We created a selectedMeal string property to take the decision on which meal to build.

```typescript
export interface ITypescriptDesignPatterns03BuilderProps {
  description: string;
  selectedMeal: string;
}

```

######TypescriptDesignPatterns03Builder.tsx

This is our component class, here we have a constructor and in the constructor we call the setMeal method, with the selected meal option as a parameter, and then we can define which meal to prepare.  Once the meal is prepared, in the render method we can use the showItems method
```typescript
import * as React from "react";
import styles from "./TypescriptDesignPatterns03Builder.module.scss";
import { ITypescriptDesignPatterns03BuilderProps } from "./ITypescriptDesignPatterns03BuilderProps";
import { escape } from "@microsoft/sp-lodash-subset";
import MealBuilder from "./MealBuilder";
import Meal from "./Meal";
import { IPropertyPaneConfiguration } from "@microsoft/sp-webpart-base/lib/propertyPane/propertyPane/IPropertyPane";
import {
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";
import Version from "@microsoft/sp-core-library/lib/Version";

export default class TypescriptDesignPatterns03Builder extends React.Component<ITypescriptDesignPatterns03BuilderProps, {}> {

  private mealBuilder: MealBuilder ;
  private items: string;
  private meal: Meal;

  constructor(props: ITypescriptDesignPatterns03BuilderProps, state: any) {
    super(props);
    this.setMeal(props.selectedMeal);
    this.mealBuilder = new MealBuilder();
  }

  public render(): React.ReactElement<ITypescriptDesignPatterns03BuilderProps> {
    return (
        <div className={styles.typescriptDesignPatterns03Builder}>
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
                <span className="ms-font-xl ms-fontColor-white">Welcome to Burger Company!</span>
                <p className="ms-font-l ms-fontColor-white">You have selected the following.</p>
                  <span className={styles.label}>{this.meal.showItems()}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private setMeal(selectedMeal: string): void {
     if(selectedMeal === "VegMeal") {
        this.meal = this.mealBuilder.prepareVegMeal();
     }
     if(selectedMeal === "NonVegMeal") {
      this.meal = this.mealBuilder.prepareNonVegMeal();
   }
  }
}


```

And finally
######TypescriptDesignPatterns03BuilderWebPart.ts

Here what we do is just to use our component and sending the parameter of the selected meal, which is just a normal dropdown with 2 hardcoded values.


```typescript
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from "TypescriptDesignPatterns03BuilderWebPartStrings";
import TypescriptDesignPatterns03Builder from "./components/TypescriptDesignPatterns03Builder";
import { ITypescriptDesignPatterns03BuilderProps } from "./components/ITypescriptDesignPatterns03BuilderProps";
import { ITypescriptDesignPatterns03BuilderWebPartProps } from "./ITypescriptDesignPatterns03BuilderWebPartProps";

export default class TypescriptDesignPatterns03BuilderWebPart extends
  BaseClientSideWebPart<ITypescriptDesignPatterns03BuilderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITypescriptDesignPatterns03BuilderProps > = React.createElement(
      TypescriptDesignPatterns03Builder,
      {
        description: this.properties.description,
        selectedMeal: this.properties.selectedMeal
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration  {
    return {
      pages: [
        {
          header: {
            description: "Header"
          },
          groups: [
            {
              groupName: "Group",
              groupFields: [
                PropertyPaneDropdown("meal", {
                  label: "Select meal",
                  options: [
                    { key: "Veg", text: "Veg" },
                    { key: "Nonveg", text: "Nonveg" }
                  ],
                  selectedKey: "Nonveg"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

```
