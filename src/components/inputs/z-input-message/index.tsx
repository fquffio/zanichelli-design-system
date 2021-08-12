import { Component, Prop, h } from "@stencil/core";
import { InputStatusBean } from "../../../beans";

@Component({
  tag: "z-input-message",
  styleUrl: "styles.css",
  shadow: true
})
export class ZInputMessage {
  /** input helper message */
  @Prop() message: string;
  /** input status (optional) */
  @Prop({ reflect: true }) status?: InputStatusBean;

  private statusIcons = {
    success: "checkmark-circle",
    error: "multiply-circled",
    warning: "exclamation-circle"
  };

  render() {
    return [
      this.statusIcons[this.status] && this.message &&
        <z-icon name={this.statusIcons[this.status]}></z-icon>,
      <span innerHTML={this.message}/>
    ];
  }
}
