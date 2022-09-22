import {Component, Prop, h, Element} from "@stencil/core";
import {JSXBase} from "@stencil/core/internal";
import {ButtonVariantEnum, ButtonTypeEnum, ButtonSizeEnum} from "../../../beans";

/**
 * @slot - button label
 */
@Component({
  tag: "z-button",
  styleUrl: "styles.css",
  shadow: false,
  scoped: true,
})
export class ZButton {
  @Element() hostElement: HTMLZButtonElement;
  /** defines a string value that labels an interactive element, used for accessibility. */
  @Prop({reflect: true})
  ariaLabel?: string;
  /** HTML <a> href attribute. If it is set, it renders an HTML <a> tag. */
  @Prop()
  href?: string;
  /** HTML a target attribute. */
  @Prop()
  target?: string;
  /** Identifier, should be unique. */
  @Prop()
  htmlid?: string;
  /** HTML button name attribute. */
  @Prop()
  name?: string;
  /** HTML button disabled attribute. */
  @Prop({reflect: true})
  disabled?: boolean = false;
  /** HTML button type attribute. */
  @Prop()
  type?: HTMLButtonElement["type"] = ButtonTypeEnum.BUTTON;
  /** Graphical variant: `primary`, `secondary`, `tertiary`. Defaults to `primary`. */
  @Prop({reflect: true})
  variant?: ButtonVariantEnum = ButtonVariantEnum.PRIMARY;
  /** `z-icon` name to use (optional). */
  @Prop()
  icon?: string;
  /** Available sizes: `big`, `small` and `x-small`. Defaults to `big`. */
  @Prop({reflect: true})
  size?: ButtonSizeEnum = ButtonSizeEnum.BIG;

  private getAttributes(): JSXBase.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
    return {
      id: this.htmlid,
      class: {
        "z-button--container": true,
        "z-button--has-text": !!this.hostElement.textContent.trim(),
      },
    };
  }

  render(): HTMLAnchorElement | HTMLButtonElement {
    if (this.href) {
      return (
        <a
          {...this.getAttributes()}
          aria-label={this.ariaLabel}
          href={this.href}
          target={this.target}
        >
          {this.icon && (
            <z-icon
              name={this.icon}
              width={16}
              height={16}
            />
          )}
          <slot />
        </a>
      );
    }

    return (
      <button
        {...this.getAttributes()}
        aria-label={this.ariaLabel}
        name={this.name}
        type={this.type}
        disabled={this.disabled}
      >
        {this.icon && (
          <z-icon
            name={this.icon}
            width={16}
            height={16}
          />
        )}
        <slot />
      </button>
    );
  }
}
