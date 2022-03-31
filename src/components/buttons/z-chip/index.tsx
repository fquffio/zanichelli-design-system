import { Component, Prop, h } from "@stencil/core";
import { ZChipType } from "../../../beans";

@Component({
  tag: "z-chip",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZChip {
  @Prop() regulartext?: string;
  @Prop() boldtext?: number;
  @Prop({ reflect: true })
  type?: ZChipType = ZChipType.default;

  private renderLegacyChip() {
    return (
      <div class={this.type}>
        <span class="boldtext">{this.boldtext}</span> {this.regulartext}
      </div>
    );
  }

  render() {
    return this.boldtext != null || this.regulartext != null ? (
      this.renderLegacyChip()
    ) : (
      <div class={this.type}>
        <slot />
      </div>
    );
  }
}
