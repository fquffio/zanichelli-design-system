import { Component, h, Prop, Host } from "@stencil/core";

import { ListSize } from "../../../beans";

@Component({
  tag: "z-list",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZList {
  /**
   * [optional] Sets size of inside elements.
   */
  @Prop({ reflect: true }) size?: ListSize = ListSize.medium;

  render() {
    return (
      <Host role="list">
        <slot />
      </Host>
    );
  }
}
