import { Component, h, Host, Element, Listen, Prop } from "@stencil/core";
import { getElementTree } from "../../utils/utils";
import {
  DeviceEnum,
  ThemeVariant,
  keybordCodeEnum,
  linkItem,
} from "../../beans";
import { getDevice } from "../../utils/utils";

/**
 * Component short description.
 */
@Component({
  tag: "z-skip-to-content",
  styleUrl: "styles.css",
  shadow: false,
  scoped: true,
})
export class ZSkipToContent {
  /** Graphical variant: `dark`, `light`. */
  @Prop({ reflect: true }) variant?: ThemeVariant;
  /** Array to fill link into skip-content */
  @Prop({ mutable: true }) links: string | linkItem[] = [];

  @Element() hostElement: HTMLElement;

  @Listen("focusin", { target: "document" })
  handleFocusSkipToContent(e) {
    const tree = getElementTree(e.target);
    const menuParent = tree.find(
      (elem: any) => elem.nodeName.toLowerCase() === "z-skip-to-content"
    );

    if (menuParent !== this.hostElement) {
      this.hostElement.classList.remove("skip-to-content-visible");
    } else {
      this.hostElement.classList.add("skip-to-content-visible");
    }

    this.handleSlottedElementFocus(e);
  }

  componentWillRender() {
    if (this.links) {
      this.links =
        typeof this.links === "string" ? JSON.parse(this.links) : this.links;
    }
  }

  componentDidLoad() {
    console.log(this.links);
    if (getDevice() == DeviceEnum.mobile) {
      const children = this.hostElement.children;
      for (let i = 0; i < children.length; i++) {
        if (i == 0) {
          children[i].classList.add("link-visible");
        } else {
          children[i].classList.add("link-invisible");
        }
      }
    }
  }

  @Listen("keyup")
  handleSlottedElementFocus(e) {
    let prevElem = e.target.previousElementSibling;
    let elem = e.target;
    let nextElem = e.target.nextElementSibling;

    if (getDevice() == DeviceEnum.mobile && e.code == keybordCodeEnum.TAB) {
      e.preventDefault();

      if (prevElem) {
        prevElem.classList.remove("link-visible");
        prevElem.classList.add("link-invisible");
        elem.classList.remove("link-invisible");
        elem.classList.add("link-visible");
        elem.focus();
      }
    }

    if (
      getDevice() == DeviceEnum.mobile &&
      e.shiftKey &&
      e.code == keybordCodeEnum.TAB
    ) {
      if (nextElem) {
        nextElem.classList.toggle("link-visible");
        nextElem.classList.toggle("link-invisible");
        elem.classList.toggle("link-visible");
        elem.classList.toggle("link-invisible");
        elem.focus();
      }
    }
  }

  handleClickLink() {
    this.hostElement.classList.remove("skip-to-content-visible");
  }

  render() {
    return (
      <Host
        class={this.variant}
        ref={(el) => el as HTMLElement}
        onFocus={(e: KeyboardEvent) => this.handleFocusSkipToContent(e)}
        tabindex="0"
      >
        {(this.links as linkItem[]).map((link) => {
          return (
            <z-link
              underline={true}
              class={"t-weight-sb"}
              href={link.href}
              textcolor={"black"}
              onClick={() => this.handleClickLink()}
            >
              {link.label}
            </z-link>
          );
        })}
      </Host>
    );
  }
}
