import { Component, Prop, h } from "@stencil/core";
export class ZBody {
  constructor() {
    this.variant = "regular";
  }
  render() {
    return (h("z-typography", { component: this.component || "span", level: `b${this.level}`, variant: this.variant },
      h("slot", null)));
  }
  static get is() { return "z-body"; }
  static get encapsulation() { return "shadow"; }
  static get properties() { return {
    "level": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "1 | 2 | 3 | 4 | 5",
        "resolved": "1 | 2 | 3 | 4 | 5",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "level",
      "reflect": false
    },
    "variant": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"regular\" | \"semibold\"",
        "resolved": "\"regular\" | \"semibold\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "variant",
      "reflect": false,
      "defaultValue": "\"regular\""
    },
    "component": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "component",
      "reflect": false
    }
  }; }
}
