declare interface IAbstractFactoryWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'AbstractFactoryWebPartStrings' {
  const strings: IAbstractFactoryWebPartStrings;
  export = strings;
}
