import { Component, Prop, h } from "@stencil/core";
import classNames from "classnames";
import {
  ButtonVariantBean,
  ButtonVariantEnum,
  ButtonTypeEnum,
  ButtonSizeEnum,
} from "../../../beans";

/**
 * @slot - button label
 */
@Component({
  tag: "z-button",
  styleUrl: "styles.css",
  shadow: false,
})
export class ZButton {
  /** defines a string value that labels an interactive element, used for accessibility. */
  @Prop({ reflect: true }) ariaLabel?: string;
  /** HTML a href attribute. If it is set, it renders an HTML a tag. */
  @Prop({ reflect: true })
  href?: string = "";
  /** HTML a target attribute. */
  @Prop({ reflect: true })
  target?: string = "_blank";
  /** Identifier, should be unique. */
  @Prop() htmlid?: string;
  /** HTML button name attribute. */
  @Prop() name?: string;
  /** HTML button disabled attribute. */
  @Prop({ reflect: true }) disabled?: boolean = false;
  /** HTML button type attribute. */
  @Prop() type?: HTMLButtonElement["type"] = ButtonTypeEnum.button;
  /** Graphical variant: `primary`, `secondary`, `tertiary`, `dark-bg`. Defaults to `primary`. */
  @Prop({ reflect: true }) variant?: ButtonVariantBean =
    ButtonVariantEnum.primary;
  /** `z-icon` name to use (optional). */
  @Prop() icon?: string;
  /** Available sizes: `big`, `small` and `x-small`. Defaults to `big`. */
  @Prop({ reflect: true })
  size?: ButtonSizeEnum = ButtonSizeEnum.big;
  /** set label text  */
  @Prop({ reflect: true })
  text?: string = "";
  /** Spy to render square button. */
  @Prop({ reflect: true })
  square?: boolean = false;

  render() {
    if (this.href)
      return (
        <a
          aria-label={this.ariaLabel}
          href={this.href}
          target={this.target}
          id={this.htmlid}
          class={classNames(this.variant, this.size, { square: this.square })}
        >
          {this.icon && <z-icon name={this.icon} width={16} height={16} />}
          <span>{this.text}</span>
        </a>
      );

    return (
      <button
        aria-label={this.ariaLabel}
        id={this.htmlid}
        name={this.name}
        type={this.type}
        disabled={this.disabled}
        class={classNames(this.variant, this.size, { square: this.square })}
      >
        {this.icon && <z-icon name={this.icon} width={16} height={16} />}
        <span>{this.text}</span>
      </button>
    );
  }
}
