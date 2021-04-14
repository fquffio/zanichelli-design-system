import { Component, Prop, h, Event } from "@stencil/core";
export class ZButtonSort {
  constructor() {
    /** sort label content (ascending) (optional) */
    this.sortlabelasc = "A-Z";
    /** sort label content (descending) (optional) */
    this.sortlabeldesc = "Z-A";
    /** selected flag (optional) */
    this.isselected = false;
    /** sortable flag (optional) */
    this.sortasc = true;
  }
  emitButtonSortClick() {
    if (!this.isselected) {
      this.isselected = true;
    }
    else {
      this.sortasc = !this.sortasc;
    }
    this.buttonSortClick.emit({
      buttonid: this.buttonid,
      sortAsc: this.sortasc,
    });
  }
  render() {
    return (h("button", { id: this.buttonid, class: this.isselected && "selected", onClick: () => this.emitButtonSortClick() },
      h("label", null,
        !this.sortasc && this.desclabel ? this.desclabel : this.label,
        this.counter && ` (${this.counter})`),
      h("span", null, this.sortasc ? this.sortlabelasc : this.sortlabeldesc),
      h("z-icon", { name: "caret-up-down", width: 16, height: 16 })));
  }
  static get is() { return "z-button-sort"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["styles.css"]
  }; }
  static get styleUrls() { return {
    "$": ["styles.css"]
  }; }
  static get properties() { return {
    "buttonid": {
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
        "text": "id, should be unique"
      },
      "attribute": "buttonid",
      "reflect": false
    },
    "label": {
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
        "text": "label content (ascending)"
      },
      "attribute": "label",
      "reflect": false
    },
    "desclabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "label content (descending)"
      },
      "attribute": "desclabel",
      "reflect": false
    },
    "counter": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "occurrencies counter (optional)"
      },
      "attribute": "counter",
      "reflect": false
    },
    "sortlabelasc": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "sort label content (ascending) (optional)"
      },
      "attribute": "sortlabelasc",
      "reflect": false,
      "defaultValue": "\"A-Z\""
    },
    "sortlabeldesc": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "sort label content (descending) (optional)"
      },
      "attribute": "sortlabeldesc",
      "reflect": false,
      "defaultValue": "\"Z-A\""
    },
    "isselected": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "selected flag (optional)"
      },
      "attribute": "isselected",
      "reflect": false,
      "defaultValue": "false"
    },
    "sortasc": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "sortable flag (optional)"
      },
      "attribute": "sortasc",
      "reflect": false,
      "defaultValue": "true"
    }
  }; }
  static get events() { return [{
      "method": "buttonSortClick",
      "name": "buttonSortClick",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "sorting direction click event, returns buttonid and sortAsc"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
}
