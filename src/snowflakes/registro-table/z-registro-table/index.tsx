import { Component, h } from "@stencil/core";

@Component({
  tag: "z-registro-table",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZRegistroTable {
  render() {
    return (
      <table>
        <slot />
      </table>
    );
  }
}
