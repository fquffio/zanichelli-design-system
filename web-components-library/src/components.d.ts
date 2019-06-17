/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  ListItemBean,
} from './beans/index.js';


export namespace Components {
  interface BaseComponentLayer {
    'myProp': string;
  }
  interface CardBody {
    'myProp': string;
  }
  interface CardComponent {
    'myProp': string;
  }
  interface CardFooter {
    'myProp': string;
  }
  interface CardHeader {
    'myProp': string;
  }
  interface FooterIpad {}
  interface ListItem {
    'icon'?: String;
    'innernode'?: ListItemBean[];
    'link'?: string;
    'text': String;
  }
  interface ZanichelliButton {
    'action'?: Function;
    'hasicon': boolean;
    'isprimary': boolean;
    'label': string;
  }
  interface ZanichelliList {
    'getnodes'?: Function;
    'inputrawdata'?: string;
  }
}

declare global {


  interface HTMLBaseComponentLayerElement extends Components.BaseComponentLayer, HTMLStencilElement {}
  var HTMLBaseComponentLayerElement: {
    prototype: HTMLBaseComponentLayerElement;
    new (): HTMLBaseComponentLayerElement;
  };

  interface HTMLCardBodyElement extends Components.CardBody, HTMLStencilElement {}
  var HTMLCardBodyElement: {
    prototype: HTMLCardBodyElement;
    new (): HTMLCardBodyElement;
  };

  interface HTMLCardComponentElement extends Components.CardComponent, HTMLStencilElement {}
  var HTMLCardComponentElement: {
    prototype: HTMLCardComponentElement;
    new (): HTMLCardComponentElement;
  };

  interface HTMLCardFooterElement extends Components.CardFooter, HTMLStencilElement {}
  var HTMLCardFooterElement: {
    prototype: HTMLCardFooterElement;
    new (): HTMLCardFooterElement;
  };

  interface HTMLCardHeaderElement extends Components.CardHeader, HTMLStencilElement {}
  var HTMLCardHeaderElement: {
    prototype: HTMLCardHeaderElement;
    new (): HTMLCardHeaderElement;
  };

  interface HTMLFooterIpadElement extends Components.FooterIpad, HTMLStencilElement {}
  var HTMLFooterIpadElement: {
    prototype: HTMLFooterIpadElement;
    new (): HTMLFooterIpadElement;
  };

  interface HTMLListItemElement extends Components.ListItem, HTMLStencilElement {}
  var HTMLListItemElement: {
    prototype: HTMLListItemElement;
    new (): HTMLListItemElement;
  };

  interface HTMLZanichelliButtonElement extends Components.ZanichelliButton, HTMLStencilElement {}
  var HTMLZanichelliButtonElement: {
    prototype: HTMLZanichelliButtonElement;
    new (): HTMLZanichelliButtonElement;
  };

  interface HTMLZanichelliListElement extends Components.ZanichelliList, HTMLStencilElement {}
  var HTMLZanichelliListElement: {
    prototype: HTMLZanichelliListElement;
    new (): HTMLZanichelliListElement;
  };
  interface HTMLElementTagNameMap {
    'base-component-layer': HTMLBaseComponentLayerElement;
    'card-body': HTMLCardBodyElement;
    'card-component': HTMLCardComponentElement;
    'card-footer': HTMLCardFooterElement;
    'card-header': HTMLCardHeaderElement;
    'footer-ipad': HTMLFooterIpadElement;
    'list-item': HTMLListItemElement;
    'zanichelli-button': HTMLZanichelliButtonElement;
    'zanichelli-list': HTMLZanichelliListElement;
  }
}

declare namespace LocalJSX {
  interface BaseComponentLayer extends JSXBase.HTMLAttributes<HTMLBaseComponentLayerElement> {
    'myProp'?: string;
  }
  interface CardBody extends JSXBase.HTMLAttributes<HTMLCardBodyElement> {
    'myProp'?: string;
  }
  interface CardComponent extends JSXBase.HTMLAttributes<HTMLCardComponentElement> {
    'myProp'?: string;
  }
  interface CardFooter extends JSXBase.HTMLAttributes<HTMLCardFooterElement> {
    'myProp'?: string;
  }
  interface CardHeader extends JSXBase.HTMLAttributes<HTMLCardHeaderElement> {
    'myProp'?: string;
  }
  interface FooterIpad extends JSXBase.HTMLAttributes<HTMLFooterIpadElement> {}
  interface ListItem extends JSXBase.HTMLAttributes<HTMLListItemElement> {
    'icon'?: String;
    'innernode'?: ListItemBean[];
    'link'?: string;
    'text'?: String;
  }
  interface ZanichelliButton extends JSXBase.HTMLAttributes<HTMLZanichelliButtonElement> {
    'action'?: Function;
    'hasicon'?: boolean;
    'isprimary'?: boolean;
    'label'?: string;
  }
  interface ZanichelliList extends JSXBase.HTMLAttributes<HTMLZanichelliListElement> {
    'getnodes'?: Function;
    'inputrawdata'?: string;
  }

  interface IntrinsicElements {
    'base-component-layer': BaseComponentLayer;
    'card-body': CardBody;
    'card-component': CardComponent;
    'card-footer': CardFooter;
    'card-header': CardHeader;
    'footer-ipad': FooterIpad;
    'list-item': ListItem;
    'zanichelli-button': ZanichelliButton;
    'zanichelli-list': ZanichelliList;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


