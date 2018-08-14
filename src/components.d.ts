/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
/* tslint:disable */

import '@stencil/core';




declare global {
  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}

  namespace StencilComponents {

    interface CcInput {
      'cards': string;
    }
  }


    interface HTMLCcInputElement extends StencilComponents.CcInput, HTMLStencilElement {}

    var HTMLCcInputElement: {
      prototype: HTMLCcInputElement;
      new (): HTMLCcInputElement;
    };
    

  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {
    'cc-input': JSXElements.CcInputAttributes;
    }
  }

  namespace JSXElements {

    export interface CcInputAttributes extends HTMLAttributes {
      'cards'?: string;
    }
  }

  interface HTMLElementTagNameMap {
    'cc-input': HTMLCcInputElement
  }

  interface ElementTagNameMap {
    'cc-input': HTMLCcInputElement;
  }
}
declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;