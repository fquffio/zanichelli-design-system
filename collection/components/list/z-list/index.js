import { Component, Prop, h, Watch } from "@stencil/core";
export class ZList {
  componentWillLoad() {
    if (this.inputrawdata) {
      this.parseinputrawdata(this.inputrawdata);
    }
  }
  parseinputrawdata(inputrawdata) {
    this.list = [...JSON.parse(inputrawdata)];
  }
  oninputrawdataChange(newValue) {
    this.parseinputrawdata(newValue);
  }
  render() {
    const lastElem = this.list ? this.list.length - 1 : -1;
    return (h("ul", null, this.list &&
      this.list.map((bean, i) => (h("z-list-item", { listitemid: bean.listitemid, text: bean.text, link: bean.link, linktarget: bean.linktarget, icon: bean.icon, underlined: lastElem != i })))));
  }
  static get is() { return "z-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["styles.css"]
  }; }
  static get styleUrls() { return {
    "$": ["styles.css"]
  }; }
  static get properties() { return {
    "inputrawdata": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "json stringified list data (mutable, optional)"
      },
      "attribute": "inputrawdata",
      "reflect": false
    },
    "list": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "ListItemBean[]",
        "resolved": "ListItemBean[]",
        "references": {
          "ListItemBean": {
            "location": "import",
            "path": "../../../beans/index.js"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "list item data (mutable, optional)"
      }
    }
  }; }
  static get watchers() { return [{
      "propName": "inputrawdata",
      "methodName": "oninputrawdataChange"
    }]; }
}
