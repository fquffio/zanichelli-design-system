import {Component, Prop, State, h} from "@stencil/core";
import {JSXBase} from "@stencil/core/internal";
import {LicenseTypeEnum} from "../../../../beans/index";

/**
 * @slot icon - card header icon slot
 */
@Component({
  tag: "z-myz-card-header",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZMyzCardHeader {
  /** volume title */
  @Prop() titolo: string;
  /** faded status */
  @Prop() faded: boolean;
  /** card graphic variant (optional) */
  @Prop() cardtype?: LicenseTypeEnum;

  @State() allowTooltip = false;

  private ellipsis?: HTMLElement;

  getTitle(): string {
    return this.allowTooltip ? this.titolo : "";
  }

  componentDidLoad(): void {
    if (this.elementHasEllipsis()) this.allowTooltip = true;
  }

  elementHasEllipsis(): boolean {
    return this.ellipsis.offsetWidth < this.ellipsis.scrollWidth;
  }

  retrieveClass(): JSXBase.HTMLAttributes["class"] {
    return {
      real: this.cardtype === LicenseTypeEnum.real,
      trial: this.cardtype === LicenseTypeEnum.trial,
      temp: this.cardtype === LicenseTypeEnum.temp,
      faded: this.faded,
    };
  }

  render(): HTMLElement {
    return (
      <header class={this.retrieveClass()}>
        <h2
          ref={(el) => (this.ellipsis = el as HTMLElement)}
          title={this.getTitle()}
        >
          {this.titolo}
        </h2>
        <slot name="icon" />
      </header>
    );
  }
}
