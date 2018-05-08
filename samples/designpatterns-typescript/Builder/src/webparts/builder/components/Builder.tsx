import * as React from 'react';
import styles from './Builder.module.scss';
import { IBuilderProps } from './IBuilderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MealBuilder from "./MealBuilder";
import Meal from "./Meal";
import { IPropertyPaneConfiguration } from "@microsoft/sp-webpart-base/lib/propertyPane/propertyPane/IPropertyPane";
import {
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";
import Version from "@microsoft/sp-core-library/lib/Version";

export default class Builder extends React.Component<IBuilderProps, {}> {

  private mealBuilder: MealBuilder ;
  private items: string;
  private meal: Meal;

  constructor(props: IBuilderProps, state: any) {
    super(props);
    this.setMeal(props.selectedMeal);
    this.mealBuilder = new MealBuilder();
  }

  public render(): React.ReactElement<IBuilderProps> {
    return (
        <div className={styles.builder}>
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
