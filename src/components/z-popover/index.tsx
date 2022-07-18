import {
  Component,
  Prop,
  h,
  Watch,
  Listen,
  Element,
  State,
  Event,
  EventEmitter,
} from "@stencil/core";
import { PopoverPosition, KeyboardKeys } from "../../beans";
import { getElementTree } from "../../utils/utils";

const documentElement = document.documentElement;

function getParentElement(element: Element) {
  if ((element.parentNode as ShadowRoot).host) {
    return (element.parentNode as ShadowRoot).host;
  }
  return element.parentNode as Element | undefined;
}

/**
 * Find the closest scrollable parent of a node.
 *
 * @param {Element} element The node
 */
function findScrollableParent(element: Element) {
  let parent = getParentElement(element);

  while (parent && parent !== documentElement) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(parent);
    if (
      overflow === "hidden" ||
      overflowY === "hidden" ||
      overflowX === "hidden"
    ) {
      return parent;
    }

    if (
      (parent.scrollHeight > parent.clientHeight &&
        overflow !== "visible" &&
        overflowY !== "visible") ||
      (parent.scrollWidth > parent.clientWidth &&
        overflow !== "visible" &&
        overflowX !== "visible")
    ) {
      return parent;
    }

    parent = getParentElement(parent);
  }

  return documentElement;
}

/**
 * Calculate computed offset.
 * It includes matrix transformations.
 * @param element The target element.
 * @param targetParentOffset The relative offset parent.
 * @return A client rect object.
 */
function computeOffset(element: HTMLElement, targetParentOffset?: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  let top = 0;
  let left = 0;
  let offsetParent = element;
  while (offsetParent && offsetParent != targetParentOffset) {
    left += offsetParent.offsetLeft;

    // document.body sometimes has offsetTop == 0 but still has an
    // offset because of children margins!
    if (offsetParent === document.body) {
      top += offsetParent.getBoundingClientRect().top + window.scrollY;
    } else {
      top += offsetParent.offsetTop;
    }

    if (window.DOMMatrix) {
      const style = window.getComputedStyle(offsetParent);
      const transform = style.transform || style.webkitTransform;
      const domMatrix = new DOMMatrix(transform);
      if (domMatrix) {
        left += domMatrix.m41;
        if (offsetParent !== document.body) {
          top += domMatrix.m42;
        }
      }
    }

    if (!offsetParent.offsetParent) {
      break;
    }

    offsetParent = offsetParent.offsetParent as HTMLElement;
  }

  let parentWidth: number;
  let parentHeight: number;
  if (offsetParent === document.body) {
    parentWidth = window.innerWidth;
    parentHeight = window.innerHeight;
  } else {
    parentWidth = offsetParent.offsetWidth;
    parentHeight = offsetParent.offsetHeight;
  }

  const right = parentWidth - left - rect.width;
  const bottom = parentHeight - top - rect.height;

  return { top, right, bottom, left, width, height };
}

/**
 * Popover component.
 *
 * @cssprop --z-popover-theme--surface - background color of the popover.
 * @cssprop --z-popover-theme--text - foreground color of the popover.
 * @cssprop --z-popover-shadow - shadow of the popover.
 */
@Component({
  tag: "z-popover",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZPopover {
  /** Popover position. */
  @Prop({ reflect: true, mutable: true }) position: PopoverPosition =
    PopoverPosition.AUTO;

  /**
   * The open state of the popover.
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /**
   * The selector or the element bound with the popover.
   */
  @Prop() bindTo?: string | HTMLElement;

  /**
   * Whether to show arrow of popover.
   */
  @Prop({ reflect: true }) showArrow: boolean = false;

  /**
   * Whether center the popup on the main side.
   */
   @Prop({ reflect: true }) center: boolean = false;

  /**
   * The current position of the popover.
   */
  @State() currentPosition?: PopoverPosition;

  /** Emitted on popover click, returns isVisible state */
  @Event() triggerClick: EventEmitter;
  emitTriggerClick() {
    this.triggerClick.emit({
      isVisible: this.open,
    });
  }

  /**
   * Position change event.
   */
  @Event() positionChange: EventEmitter;

  @Element() host: HTMLElement;

  private animationFrameRequestId?: number;

  @Listen("keyup", { target: "window" })
  closePopoverWithKeyboard(e: any) {
    if (e.key === KeyboardKeys.ESC) {
      this.open = false;
    }
  }

  @Listen("click", { target: "body", capture: true })
  handleOutsideClick(e: any) {
    const tree = getElementTree(e.target);
    const parent = tree.find(
      (elem: Element) => elem.nodeName.toLowerCase() === "z-popover"
    );

    if (!parent) {
      this.open = false;
    }
  }

  @Watch("position")
  validatePosition(newValue) {
    if (
      newValue &&
      Object.values(PopoverPosition).every((position) => newValue !== position)
    ) {
      this.position = PopoverPosition.AUTO;
    }
  }

  @Watch("position")
  onPositionChange() {
    this.positionChange.emit({ position: this.currentPosition });
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.animationFrameRequestId);
  }

  /**
   * Setup popover behaviors on opening.
   */
  @Watch("open")
  onOpen() {
    cancelAnimationFrame(this.animationFrameRequestId);
    if (this.open) {
      const setPosition = () => {
        if (this.open) {
          this.setPosition();
          this.animationFrameRequestId = requestAnimationFrame(setPosition);
        }
      };

      setPosition();
    } else {
      const style = this.host.style;
      style.removeProperty("top");
      style.removeProperty("right");
      style.removeProperty("bottom");
      style.removeProperty("left");
      this.currentPosition = undefined;
    }
  }

  /**
   * Set the position of the popover.
   */
  private setPosition() {
    let element: HTMLElement;
    if (typeof this.bindTo === "string") {
      element = this.host.ownerDocument.querySelector(
        this.bindTo
      ) as HTMLElement;
    } else if (this.bindTo) {
      element = this.bindTo;
    } else {
      element = this.host.parentElement as HTMLElement;
    }

    if (!element) {
      return;
    }

    const scrollContainer = findScrollableParent(element) as HTMLElement;
    const scrollingBoundingRect = scrollContainer.getBoundingClientRect();
    const offsetContainer = this.host.offsetParent as HTMLElement;
    const relativeBoundingRect = offsetContainer
      ? computeOffset(offsetContainer, scrollContainer)
      : { top: 0, right: 0, bottom: 0, left: 0 };
    const boundingRect = computeOffset(element, scrollContainer);

    const top = boundingRect.top - scrollContainer.scrollTop;
    const bottom =
      scrollingBoundingRect.height -
      (boundingRect.top + boundingRect.height) +
      scrollContainer.scrollTop;
    const left = boundingRect.left - scrollContainer.scrollLeft;
    const right =
      scrollingBoundingRect.width -
      (boundingRect.left + boundingRect.width) +
      scrollContainer.scrollLeft;

    const overflowBottom = Math.max(
      0,
      scrollingBoundingRect.top +
        scrollingBoundingRect.height -
        window.innerHeight
    );
    const overflowRight = Math.max(
      0,
      scrollingBoundingRect.left +
        scrollingBoundingRect.width -
        window.innerWidth
    );

    const availableTop = Math.min(top, top + scrollingBoundingRect.top);
    const availableBottom = Math.min(bottom, bottom - overflowBottom);
    const availableLeft = Math.min(left, left + scrollingBoundingRect.left);
    const availableRight = Math.min(right, right - overflowRight);

    const availableHeight =
      availableTop + availableBottom + boundingRect.height;
    const availableWidth = availableLeft + availableRight + boundingRect.width;

    let position = this.position;
    const positions: PopoverPosition[] = [];
    if (position === PopoverPosition.AUTO) {
      /**
       * The `AUTO` position tries to place the popover in the 'safest' area,
       * where there's more space available.
       */
      if (availableLeft / availableWidth > 0.6) {
        positions.push(PopoverPosition.LEFT);
      } else if (availableLeft / availableWidth < 0.4) {
        positions.push(PopoverPosition.RIGHT);
      }

      if (availableTop / availableHeight > 0.9) {
        positions.unshift(PopoverPosition.TOP);
      } else if (availableTop / availableHeight > 0.6) {
        positions.push(PopoverPosition.TOP);
      } else if (availableTop / availableHeight < 0.1) {
        positions.unshift(PopoverPosition.BOTTOM);
      } else {
        positions.push(PopoverPosition.BOTTOM);
      }

      position = positions.join("_") as PopoverPosition;
    }

    const available = Object.keys(PopoverPosition).map((key) => PopoverPosition[key]);
    if (available.indexOf(position) === -1) {
      // normalize direction to closest available
      if (position === PopoverPosition.TOP_RIGHT) {
        if (available.indexOf(PopoverPosition.TOP) !== -1) {
          position = PopoverPosition.TOP;
        } else if (available.indexOf(PopoverPosition.RIGHT) !== -1) {
          position = PopoverPosition.RIGHT;
        } else {
          position = PopoverPosition.BOTTOM;
        }
      } else if (position === PopoverPosition.TOP_LEFT) {
        if (available.indexOf(PopoverPosition.TOP) !== -1) {
          position = PopoverPosition.TOP;
        } else if (available.indexOf(PopoverPosition.LEFT) !== -1) {
          position = PopoverPosition.LEFT;
        } else {
          position = PopoverPosition.BOTTOM;
        }
      } else if (position === PopoverPosition.RIGHT_TOP) {
        if (available.indexOf(PopoverPosition.RIGHT) !== -1) {
          position = PopoverPosition.RIGHT;
        } else if (available.indexOf(PopoverPosition.TOP) !== -1) {
          position = PopoverPosition.TOP;
        } else {
          position = PopoverPosition.BOTTOM;
        }
      } else if (position === PopoverPosition.LEFT_TOP) {
        if (available.indexOf(PopoverPosition.LEFT) !== -1) {
          position = PopoverPosition.LEFT;
        } else if (available.indexOf(PopoverPosition.TOP) !== -1) {
          position = PopoverPosition.TOP;
        } else {
          position = PopoverPosition.BOTTOM;
        }
      } else {
        position = PopoverPosition.BOTTOM;
      }
    }

    const style = this.host.style;
    style.position = "absolute";

    const margin = 24;
    const offsetTop = boundingRect.top - relativeBoundingRect.top;
    const offsetRight = boundingRect.right - relativeBoundingRect.right;
    const offsetBottom = boundingRect.bottom - relativeBoundingRect.bottom;
    const offsetLeft = boundingRect.left - relativeBoundingRect.left;
    const offsetModifier = this.center ? 0.5 : 0;
    const sizeModifier = this.center ? 0.5 : 0;

    if (position === PopoverPosition.TOP || position === PopoverPosition.TOP_RIGHT) {
      style.top = 'auto';
      style.right = 'auto';
      style.bottom = `${offsetBottom + boundingRect.height}px`;
      style.left = `${offsetLeft + (boundingRect.width * offsetModifier)}px`;
      style.maxHeight = `${availableTop - margin}px`;
      if (position === PopoverPosition.TOP_RIGHT) {
          style.maxWidth = `${availableRight + (boundingRect.width * sizeModifier) - margin}px`;
      }
  } else if (position === PopoverPosition.TOP_LEFT) {
      style.top = 'auto';
      style.right = `${offsetRight + (boundingRect.width * offsetModifier)}px`;
      style.bottom = `${offsetBottom + boundingRect.height}px`;
      style.left = 'auto';
      style.maxWidth = `${availableLeft - margin}px`;
      style.maxHeight = `${availableTop - margin}px`;
  } else if (position === PopoverPosition.BOTTOM || position === PopoverPosition.BOTTOM_RIGHT) {
      style.top = `${offsetTop + boundingRect.height}px`;
      style.right = 'auto';
      style.bottom = 'auto';
      style.left = `${offsetLeft + (boundingRect.width * offsetModifier)}px`;
      style.maxHeight = `${availableBottom - margin}px`;
      if (position === PopoverPosition.BOTTOM_RIGHT) {
          style.maxWidth = `${availableRight + (boundingRect.width * sizeModifier) - margin}px`;
      }
  } else if (position === PopoverPosition.BOTTOM_LEFT) {
      style.top = `${offsetTop + boundingRect.height}px`;
      style.right = `${offsetRight + (boundingRect.width * offsetModifier)}px`;
      style.bottom = 'auto';
      style.left = 'auto';
      style.maxWidth = `${availableLeft - margin}px`;
      style.maxHeight = `${availableBottom - margin}px`;
  } else if (position === PopoverPosition.RIGHT || position === PopoverPosition.RIGHT_BOTTOM) {
      style.top = `${offsetTop + (boundingRect.height * offsetModifier)}px`;
      style.right = 'auto';
      style.bottom = 'auto';
      style.left = `${offsetLeft + boundingRect.width}px`;
      style.maxWidth = `${availableRight - margin}px`;
      style.maxHeight = `${availableBottom + (boundingRect.height * sizeModifier) - margin}px`;
  } else if (position === PopoverPosition.RIGHT_TOP) {
      style.top = 'auto';
      style.right = 'auto';
      style.bottom = `${offsetBottom + (boundingRect.height * offsetModifier)}px`;
      style.left = `${offsetLeft + boundingRect.width}px`;
      style.maxWidth = `${availableRight - margin}px`;
      style.maxHeight = `${availableTop + (boundingRect.height * sizeModifier) - margin}px`;
  } else if (position === PopoverPosition.LEFT || position === PopoverPosition.LEFT_BOTTOM) {
      style.top = `${offsetTop + (boundingRect.height * offsetModifier)}px`;
      style.right = `${offsetRight + boundingRect.width}px`;
      style.bottom = 'auto';
      style.left = 'auto';
      style.maxWidth = `${availableLeft - margin}px`;
      style.maxHeight = `${availableBottom + (boundingRect.height * sizeModifier) - margin}px`;
  } else if (position === PopoverPosition.LEFT_TOP) {
      style.top = 'auto';
      style.right = `${offsetRight + boundingRect.width}px`;
      style.bottom = `${offsetBottom + (boundingRect.height * offsetModifier)}px`;
      style.left = 'auto';
      style.maxWidth = `${availableLeft - margin}px`;
      style.maxHeight = `${availableTop + (boundingRect.height * sizeModifier) - margin}px`;
  }

    this.currentPosition = position;
  }

  componentWillLoad() {
    this.validatePosition(this.position);
    this.onOpen();
  }

  render() {
    return <slot></slot>;
  }
}
