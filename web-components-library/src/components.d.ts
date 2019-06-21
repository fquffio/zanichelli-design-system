/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface BaseComponentLayer {
    'myProp': string;
  }
  interface FooterIpad {}
  interface ZCard {}
  interface ZCardBody {
    'img': string;
    'titolo': string;
  }
  interface ZCardFooter {
    'carddata': any;
    'isopen': boolean;
  }
  interface ZCardHeader {
    'titolo': string;
  }
  interface ZCardTitle {
    'titolo': string;
  }
  interface ZIcon {
    'icon': string;
  }
  interface ZLink {
    'hasicon'?: boolean;
    'icontype'?: string;
    'label'?: string;
    'type'?: string;
    'url': string;
  }
  interface ZanichelliButton {
    'action'?: Function;
    'hasicon': boolean;
    'isprimary': boolean;
    'label': string;
  }
}

declare global {


  interface HTMLBaseComponentLayerElement extends Components.BaseComponentLayer, HTMLStencilElement {}
  var HTMLBaseComponentLayerElement: {
    prototype: HTMLBaseComponentLayerElement;
    new (): HTMLBaseComponentLayerElement;
  };

  interface HTMLFooterIpadElement extends Components.FooterIpad, HTMLStencilElement {}
  var HTMLFooterIpadElement: {
    prototype: HTMLFooterIpadElement;
    new (): HTMLFooterIpadElement;
  };

  interface HTMLZCardElement extends Components.ZCard, HTMLStencilElement {}
  var HTMLZCardElement: {
    prototype: HTMLZCardElement;
    new (): HTMLZCardElement;
  };

  interface HTMLZCardBodyElement extends Components.ZCardBody, HTMLStencilElement {}
  var HTMLZCardBodyElement: {
    prototype: HTMLZCardBodyElement;
    new (): HTMLZCardBodyElement;
  };

  interface HTMLZCardFooterElement extends Components.ZCardFooter, HTMLStencilElement {}
  var HTMLZCardFooterElement: {
    prototype: HTMLZCardFooterElement;
    new (): HTMLZCardFooterElement;
  };

  interface HTMLZCardHeaderElement extends Components.ZCardHeader, HTMLStencilElement {}
  var HTMLZCardHeaderElement: {
    prototype: HTMLZCardHeaderElement;
    new (): HTMLZCardHeaderElement;
  };

  interface HTMLZCardTitleElement extends Components.ZCardTitle, HTMLStencilElement {}
  var HTMLZCardTitleElement: {
    prototype: HTMLZCardTitleElement;
    new (): HTMLZCardTitleElement;
  };

  interface HTMLZIconElement extends Components.ZIcon, HTMLStencilElement {}
  var HTMLZIconElement: {
    prototype: HTMLZIconElement;
    new (): HTMLZIconElement;
  };

  interface HTMLZLinkElement extends Components.ZLink, HTMLStencilElement {}
  var HTMLZLinkElement: {
    prototype: HTMLZLinkElement;
    new (): HTMLZLinkElement;
  };

  interface HTMLZanichelliButtonElement extends Components.ZanichelliButton, HTMLStencilElement {}
  var HTMLZanichelliButtonElement: {
    prototype: HTMLZanichelliButtonElement;
    new (): HTMLZanichelliButtonElement;
  };
  interface HTMLElementTagNameMap {
    'base-component-layer': HTMLBaseComponentLayerElement;
    'footer-ipad': HTMLFooterIpadElement;
    'z-card': HTMLZCardElement;
    'z-card-body': HTMLZCardBodyElement;
    'z-card-footer': HTMLZCardFooterElement;
    'z-card-header': HTMLZCardHeaderElement;
    'z-card-title': HTMLZCardTitleElement;
    'z-icon': HTMLZIconElement;
    'z-link': HTMLZLinkElement;
    'zanichelli-button': HTMLZanichelliButtonElement;
  }
}

declare namespace LocalJSX {
  interface BaseComponentLayer extends JSXBase.HTMLAttributes<HTMLBaseComponentLayerElement> {
    'myProp'?: string;
  }
  interface FooterIpad extends JSXBase.HTMLAttributes<HTMLFooterIpadElement> {}
  interface ZCard extends JSXBase.HTMLAttributes<HTMLZCardElement> {}
  interface ZCardBody extends JSXBase.HTMLAttributes<HTMLZCardBodyElement> {
    'img'?: string;
    'titolo'?: string;
  }
  interface ZCardFooter extends JSXBase.HTMLAttributes<HTMLZCardFooterElement> {
    'carddata'?: any;
    'isopen'?: boolean;
  }
  interface ZCardHeader extends JSXBase.HTMLAttributes<HTMLZCardHeaderElement> {
    'titolo'?: string;
  }
  interface ZCardTitle extends JSXBase.HTMLAttributes<HTMLZCardTitleElement> {
    'titolo'?: string;
  }
  interface ZIcon extends JSXBase.HTMLAttributes<HTMLZIconElement> {
    'icon'?: string;
  }
  interface ZLink extends JSXBase.HTMLAttributes<HTMLZLinkElement> {
    'hasicon'?: boolean;
    'icontype'?: string;
    'label'?: string;
    'type'?: string;
    'url'?: string;
  }
  interface ZanichelliButton extends JSXBase.HTMLAttributes<HTMLZanichelliButtonElement> {
    'action'?: Function;
    'hasicon'?: boolean;
    'isprimary'?: boolean;
    'label'?: string;
  }

  interface IntrinsicElements {
    'base-component-layer': BaseComponentLayer;
    'footer-ipad': FooterIpad;
    'z-card': ZCard;
    'z-card-body': ZCardBody;
    'z-card-footer': ZCardFooter;
    'z-card-header': ZCardHeader;
    'z-card-title': ZCardTitle;
    'z-icon': ZIcon;
    'z-link': ZLink;
    'zanichelli-button': ZanichelliButton;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


