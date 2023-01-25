import {Component, Prop, h} from "@stencil/core";
import {ICONS} from "../icons";

@Component({
  tag: "z-icon",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZIcon {
  /** icon name */
  @Prop()
  name: string;

  /** icon height (optional) */
  @Prop()
  height?: number;

  /** icon width (optional) */
  @Prop()
  width?: number;

  /** icon id (optional) */
  @Prop()
  iconid?: string;

  /** icon fill (optional) */
  @Prop()
  fill?: string;

  private selectPathOrPolygon(iconValue: string): SVGPathElement | SVGPolygonElement {
    if (iconValue?.startsWith("M")) {
      return <path d={ICONS[this.name]}></path>;
    }

    return <polygon points={ICONS[this.name]}></polygon>;
  }

  render(): SVGElement {
    return (
      <svg
        viewBox="0 0 1000 1000"
        width={this.width}
        height={this.height}
        id={this.iconid}
        fill={this.fill ? `var(--${this.fill})` : ""}
        aria-hidde="true"
      >
        {this.selectPathOrPolygon(ICONS[this.name])}
      </svg>
    );
  }
}
