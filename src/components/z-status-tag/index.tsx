import { Component, Prop, h, Host } from "@stencil/core";
import { StatusTagType, ThemeVariant } from "../../beans";
import classNames from "classnames";

@Component({
  tag: "z-status-tag",
  styleUrl: "styles.css",
  shadow: false,
})
export class ZStatusTag {
  /** [optional] Status tag icon */
  @Prop() icon?: string;
  /** [optional] Status tag text */
  @Prop() text?: string;
  /** [optional] Hide the text and show it on hover*/
  @Prop() expandable?: boolean;
  /** [optional] Status tag color */
  @Prop({ reflect: true }) status?: StatusTagType = StatusTagType.default;
  /** [optional] Status tag style */
  @Prop() variant?: ThemeVariant;

  constructor() {
    if (!this.icon && !this.text) {
      console.warn(
        "z-status-tag must contain at least one prop between icon and text"
      );
    }
  }

  render() {
    return (
      <Host
        class={classNames(this.variant, {
          expandable: this.expandable && this.icon && this.text,
        })}
        status={this.status}
      >
        {this.icon && <z-icon name={this.icon} />}
        {this.text && <span class="body-5-sb">{this.text}</span>}
      </Host>
    );
  }
}
