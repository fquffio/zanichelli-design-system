import {Component, Prop, h} from "@stencil/core";

/**
 * @slot `descrSlotName` - description content
 */
@Component({
  tag: "z-panel-elem",
  styleUrl: "styles.css",
  shadow: false,
  scoped: true,
})
export class ZPanelElem {
  /** html element id (optional) */
  @Prop()
  elemid?: string;

  /** image url source (optional) */
  @Prop()
  imgurl?: string;

  /** alternative image text (optional) */
  @Prop()
  imgalt?: string;

  /** icon link name (optional) */
  @Prop()
  linkicon?: string;

  /** link label text*/
  @Prop()
  linklabel: string;

  /** link url */
  @Prop()
  url: string;

  /** link target (optional) */
  @Prop()
  target?: string = "_blank";

  /** disabled status flag (optional) */
  @Prop()
  isdisabled?: boolean = false;

  /** name of slot container (optional) */
  @Prop()
  descrSlotName?: string;

  private renderIcon(): HTMLZIconElement {
    if (this.isdisabled) {
      return (
        <img
          src={this.imgurl}
          alt={this.imgalt}
        />
      );
    }

    return (
      <a
        class="elem-icon"
        href={this.url}
        target={this.target}
      >
        <img
          src={this.imgurl}
          alt={this.imgalt}
        />
      </a>
    );
  }

  render(): HTMLDivElement {
    const elemId = this.elemid ? this.elemid : "";

    return (
      <div class="panel-elem-container">
        {(this.imgurl || this.imgalt) && (
          <div
            aria-hidden="true"
            class="panel-elem-icon"
          >
            {this.renderIcon()}
          </div>
        )}
        <div class="panel-elem-link">
          <a
            class={{
              "z-link": true,
              "z-link-disabled": this.isdisabled,
              "z-link-icon": true,
            }}
            id={elemId + "link_id"}
            href={this.url}
            target={this.target}
          >
            <z-icon
              class="z-link-icon-left"
              height={14}
              width={14}
              name={this.linkicon}
            ></z-icon>
            {this.linklabel}
          </a>
        </div>
        {this.descrSlotName && (
          <div class="panel-elem-desc">
            <slot name={this.descrSlotName} />
          </div>
        )}
      </div>
    );
  }
}
