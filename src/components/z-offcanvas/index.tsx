import {Component, Element, Event, EventEmitter, h, Host, Prop, Watch} from "@stencil/core";
import {OffCanvasVariant, TransitionDirection} from "../../beans";
/**
 * @slot canvasContent - set the content of the canvas
 */
@Component({
  tag: "z-offcanvas",
  styleUrl: "styles.css",
  shadow: false,
  scoped: true,
})
export class ZOffcanvas {
  @Element() hostElement: HTMLZOffcanvasElement;

  /**
   * Offcanvas variant.
   * Can be one of "overlay", "pushcontent"
   * Default variant: pushcontent
   */
  @Prop({reflect: true})
  variant?: OffCanvasVariant = OffCanvasVariant.PUSHCONTENT;

  /** open component. Default: false */
  @Prop({reflect: true, mutable: true})
  open = false;

  /** open content transitioning in a specified direction left | right. Default: left */
  @Prop({reflect: true})
  transitiondirection?: TransitionDirection = TransitionDirection.LEFT;

  /** emitted when open prop changes */
  @Event()
  canvasOpenStatusChanged: EventEmitter;

  @Watch("open")
  onOpenChanged(): void {
    this.handleOverflowProperty();
    this.canvasOpenStatusChanged.emit(this.open);
  }

  private handleOverflowProperty(): void {
    const overflow = this.variant === OffCanvasVariant.OVERLAY ? "overflow-y" : "overflow-x";
    document.body.style[overflow] = this.open ? "hidden" : "";
  }

  render(): HTMLZOffcanvasElement {
    return (
      <Host transitiondirection={this.transitiondirection}>
        <div
          role="presentation"
          class={{
            "canvas-container": true,
          }}
        >
          <div
            role="presentation"
            class="canvas-content"
          >
            <slot name="canvasContent"></slot>
          </div>
        </div>
        {this.variant == OffCanvasVariant.OVERLAY && (
          <div
            class="canvas-background"
            data-action="canvasBackground"
            onClick={() => (this.open = false)}
          ></div>
        )}
      </Host>
    );
  }
}
