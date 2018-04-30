import * as React from 'react';
import styles from './Singleton.module.scss';
import { ISingletonProps } from './ISingletonProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Singleton extends React.Component<ISingletonProps, {}> {
  public render(): React.ReactElement<ISingletonProps> {
    return (
      <div className={ styles.singleton }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
