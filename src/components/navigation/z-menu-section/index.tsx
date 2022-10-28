import {Component, h, Prop, State, Event, EventEmitter, Element, Listen, Host} from "@stencil/core";

/**
 * @slot - Menu section label
 * @slot item - Single entry of the section. Can be slotted multiple times to insert items.
 */

@Component({
  tag: "z-menu-section",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZMenuSection {
  /** Active state */
  @Prop({reflect: true})
  active?: boolean;

  @State()
  open: boolean;

  @State()
  hasContent: boolean;

  @Element() hostElement: HTMLZMenuSectionElement;

  /** The section has been opened. */
  @Event()
  opened: EventEmitter;

  /** The section has been closed. */
  @Event()
  closed: EventEmitter;

  private toggle(): void {
    if (!this.hasContent) {
      return;
    }

    this.open = !this.open;
    this.open ? this.opened.emit() : this.closed.emit();
  }

  @Listen("click", {target: "document"})
  /** Close the list when a click is performed outside of this Element. */
  handleClick(ev: MouseEvent): void {
    if (!this.open || this.hostElement.contains(ev.target as Node)) {
      return;
    }

    this.open = false;
    this.closed.emit();
  }

  /**
   * Check if some content slot is set.
   */
  private checkContent(): void {
    this.hasContent = !!this.hostElement.querySelectorAll('[slot="item"]').length;
  }

  componentWillLoad(): void {
    this.checkContent();
  }

  render(): HTMLZMenuSectionElement {
    return (
      <Host
        role="menu"
        open={this.open}
      >
        <button
          class="label"
          aria-pressed={this.open ? "true" : "false"}
          onClick={this.toggle.bind(this)}
        >
          <slot></slot>
          {this.hasContent && <z-icon name={this.open ? "chevron-up" : "chevron-down"} />}
        </button>
        {this.open && (
          <div class="items">
            <slot
              name="item"
              onSlotchange={this.checkContent.bind(this)}
            ></slot>
          </div>
        )}
      </Host>
    );
  }
}
