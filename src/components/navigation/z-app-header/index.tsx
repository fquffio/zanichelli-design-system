import {Component, h, Element, Prop, State, Watch, Host, Event, EventEmitter} from "@stencil/core";
import {ZMenu} from "../z-menu";

const SUPPORT_INTERSECTION_OBSERVER = typeof IntersectionObserver !== "undefined";

/**
 * @slot title - Slot for the main title
 * @slot subtitle - Slot for the subtitle. It will not appear in stuck header.
 * @slot stucked-title - Title for the stuck header. By default it uses the text from the `title` slot.
 * @cssprop --app-header-content-max-width - Use it to set header's content max width. Useful when the project use a fixed width layout. Defaults to `100%`.
 * @cssprop --app-header-height - Defaults to `auto`.
 * @cssprop --app-header-typography-1-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `24px`.
 * @cssprop --app-header-typography-2-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `28px`.
 * @cssprop --app-header-typography-3-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `32px`.
 * @cssprop --app-header-typography-4-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `36px`.
 * @cssprop --app-header-typography-5-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `42px`.
 * @cssprop --app-header-typography-6-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `48px`.
 * @cssprop --app-header-typography-7-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `54px`.
 * @cssprop --app-header-typography-8-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `60px`.
 * @cssprop --app-header-typography-9-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `68px`.
 * @cssprop --app-header-typography-10-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `76px`.
 * @cssprop --app-header-typography-11-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `84px`.
 * @cssprop --app-header-typography-12-size - Part of the heading typography's scale. Use it if you have to override the default value. Value: `92px`.
 * @cssprop --app-header-typography-1-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.33`.
 * @cssprop --app-header-typography-2-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.29`.
 * @cssprop --app-header-typography-3-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.25`.
 * @cssprop --app-header-typography-4-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.24`.
 * @cssprop --app-header-typography-5-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.24`.
 * @cssprop --app-header-typography-6-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.25`.
 * @cssprop --app-header-typography-7-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.2`.
 * @cssprop --app-header-typography-8-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.26`.
 * @cssprop --app-header-typography-9-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.24`.
 * @cssprop --app-header-typography-10-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.26`.
 * @cssprop --app-header-typography-11-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.2`.
 * @cssprop --app-header-typography-12-lineheight - Part of the heading typography's scale. Use it if you have to override the default value. Value: `1.2`.
 * @cssprop --app-header-typography-1-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-0.2 / 1em)`.
 * @cssprop --app-header-typography-2-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-0.4 / 1em)`.
 * @cssprop --app-header-typography-3-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-0.6 / 1em)`.
 * @cssprop --app-header-typography-4-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-0.8 / 1em)`.
 * @cssprop --app-header-typography-5-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-1 / 1em)`.
 * @cssprop --app-header-typography-6-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-1.2 / 1em)`.
 * @cssprop --app-header-typography-7-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-1.4 / 1em)`.
 * @cssprop --app-header-typography-8-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-1.6 / 1em)`.
 * @cssprop --app-header-typography-9-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-1.8 / 1em)`.
 * @cssprop --app-header-typography-10-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-2 / 1em)`.
 * @cssprop --app-header-typography-11-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-2.2 / 1em)`.
 * @cssprop --app-header-typography-12-tracking - Part of the heading typography's scale. Use it if you have to override the default value. Value: `calc(-2.4 / 1em)`.
 * @cssprop --app-header-top-offset - Top offset for the stuck header. Useful when there are other fixed elements above the header. Defaults to `48px` (the height of the main topbar).
 * @cssprop --app-header-drawer-trigger-size - The size of the drawer icon. Defaults to `--space-unit * 4`.
 * @cssprop --app-header-bg - Header background color. Defaults to `--color-white`.
 * @cssprop --app-header-stucked-bg - Stuck header background color. Defaults to `--color-white`.
 * @cssprop --app-header-text-color - Text color. Defaults to `--gray800`.
 * @cssprop --app-header-stucked-text-color - Stuck header text color. Defaults to `--gray800`.
 */
@Component({
  tag: "z-app-header",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZAppHeader {
  @Element() hostElement: HTMLZAppHeaderElement;

  /**
   * Stuck mode for the header.
   * You can programmatically set it using an IntersectionObserver.
   * **Optional**
   */
  @Prop({reflect: true})
  stuck = false;

  /**
   * Set the hero image source for the header.
   * You can also use a slot="hero" node for advanced customisation.
   * **Optional**
   */
  @Prop()
  hero: string;

  /**
   * Should place an overlay over the hero image.
   * Useful for legibility purpose.
   * **Optional**
   */
  @Prop({reflect: true})
  overlay = false;

  /**
   * Control menu bar position in the header.
   * - auto: the menu bar is positioned near the title
   * - stack: the menu bar is positioned below the title
   * - offcanvas: the menu bar is not displayed and a burger icon appears to open the offcanvas menu
   *
   * **Optional**
   */
  @Prop({reflect: true})
  flow: "auto" | "stack" | "offcanvas" = "auto";

  /**
   * The opening state of the drawer.
   */
  @Prop({reflect: true})
  drawerOpen = false;

  /**
   * The stuck state of the bar.
   */
  @State()
  private _stuck = false;

  /**
   * Current count of menu items.
   */
  @State()
  menuLength: number;

  /**
   * Emitted when the `stuck` state of the header changes
   */
  @Event()
  sticking: EventEmitter;

  private emitStickingEvent(): void {
    this.sticking.emit(this._stuck);
  }

  private container?: HTMLDivElement;

  private menuElements?: NodeListOf<HTMLElement>;

  private observer?: IntersectionObserver =
    SUPPORT_INTERSECTION_OBSERVER &&
    new IntersectionObserver(
      ([entry]) => {
        this._stuck = !entry.isIntersecting;
      },
      {
        threshold: 0.5,
      }
    );

  constructor() {
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.collectMenuElements.bind(this);
  }

  componentDidLoad(): void {
    this.collectMenuElements();
    this.onStuckMode();
  }

  private get title(): string {
    const titleElement = this.hostElement.querySelector('[slot="title"]');
    if (titleElement === null) {
      return "";
    }

    return titleElement.textContent.trim();
  }

  private get scrollParent(): Window | Element {
    const parent = this.hostElement.offsetParent;
    if (parent === document.body || parent === document.documentElement) {
      return window;
    }

    return parent;
  }

  private collectMenuElements(): void {
    const menuElements = (this.menuElements = this.hostElement.querySelectorAll('[slot="menu"]'));
    this.menuLength = menuElements.length;
    this.setMenuFloatingMode();
  }

  @Watch("stuck")
  onStuckMode(): void {
    if (this.stuck) {
      this.enableStuckObserver();
    } else {
      this.disableStuckMode();
    }
  }

  private enableStuckObserver(): void {
    if (this.observer) {
      this.observer.observe(this.container);
    }
  }

  private disableStuckMode(): void {
    this._stuck = false;
    if (this.observer) {
      this.observer.unobserve(this.container);
    }
  }

  @Watch("_stuck")
  onStuck(): void {
    const scrollParent = this.scrollParent;
    if (!scrollParent) {
      return;
    }
    this.emitStickingEvent();
  }

  @Watch("drawerOpen")
  setMenuFloatingMode(): void {
    if (this.menuElements.length === 0) {
      return;
    }

    const elements = this.menuElements;
    for (let i = 0, len = elements.length; i < len; i++) {
      (elements[i] as unknown as ZMenu).open = false;
      (elements[i] as unknown as ZMenu).floating = !this.drawerOpen;
    }
  }

  render(): HTMLZAppHeaderElement {
    return (
      <Host menu-length={this.menuLength}>
        <div
          class="heading-panel"
          ref={(el) => (this.container = el)}
        >
          <div class="hero-container">
            <slot name="hero">
              {this.hero && (
                <img
                  alt=""
                  src={this.hero}
                />
              )}
            </slot>
          </div>

          <div class="heading-container">
            <div class="heading-title">
              {this.menuLength > 0 && (
                <button
                  class="drawer-trigger"
                  aria-label="Apri menu"
                  onClick={this.openDrawer}
                >
                  <z-icon name="burger-menu"></z-icon>
                </button>
              )}
              <slot name="title"></slot>
            </div>

            <div class="heading-subtitle">
              <slot name="subtitle"></slot>
            </div>
          </div>

          <div class="menu-container">
            {!this.drawerOpen && this.flow !== "offcanvas" && (
              <slot
                name="menu"
                onSlotchange={() => this.collectMenuElements()}
              ></slot>
            )}
          </div>
        </div>
        <div class="drawer-container">
          <div
            class="drawer-overlay"
            onClick={this.closeDrawer}
          ></div>

          <div class="drawer-panel">
            <button
              class="drawer-close"
              aria-label="Chiudi menu"
              onClick={this.closeDrawer}
            >
              <z-icon name="close"></z-icon>
            </button>

            <div class="drawer-content">
              {this.drawerOpen && (
                <slot
                  name="menu"
                  onSlotchange={() => this.collectMenuElements()}
                ></slot>
              )}
            </div>
          </div>
        </div>
        {this._stuck && (
          <div class="heading-stuck">
            <div class="heading-stuck-content">
              {this.menuLength > 0 && (
                <button
                  class="drawer-trigger"
                  aria-label="Apri menu"
                  onClick={this.openDrawer}
                >
                  <z-icon name="burger-menu"></z-icon>
                </button>
              )}
              <div class="heading-title">
                <slot name="stucked-title">{this.title}</slot>
              </div>
            </div>
          </div>
        )}
      </Host>
    );
  }

  private openDrawer(): void {
    this.drawerOpen = true;
  }

  private closeDrawer(): void {
    this.drawerOpen = false;
  }
}
