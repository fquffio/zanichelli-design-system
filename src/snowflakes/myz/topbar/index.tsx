import {Component, Prop, h, State, Element, Listen, Watch} from "@stencil/core";
import {MenuItem, HeaderUserData, ListItemBean, ButtonVariantEnum, ButtonSizeEnum} from "../../../beans";
import {mobileBreakpoint, tabletBreakpoint} from "../../../constants/breakpoints";

/**
 * @slot editors - top menu editors images bar (only with ismyz prop === true)
 */
@Component({
  tag: "z-myz-topbar",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZMyzTopbar {
  /** data to fill internal navigation links */
  @Prop() intlinkdata?: string | MenuItem[];
  /** data to fill external navigation links */
  @Prop() extlinkdata?: string | MenuItem[];
  /** data to fill user dropdown menu (optional) */
  @Prop() userdata?: string | HeaderUserData;
  /** graphic flag to set myzanichelli style */
  @Prop() ismyz: boolean;
  /** url to attach to logo (optional) */
  @Prop() logolink?: string;
  /** alternative logo title text (optional) */
  @Prop() imagealt?: string;
  /** set current active menu link (optional) */
  @Prop() activeintlinkid?: string;
  /** set current active sub menu link (optional) */
  @Prop() activesublinkid?: string;
  /** hide login button if true (optional) */
  @Prop() hideloginbutton?: boolean;

  @State() activeMenuItem: MenuItem;
  @State() currentMenuItem: MenuItem;
  @State() isMobile = true;
  @State() isMenuMobileOpen = false;
  private intMenuData: MenuItem[] = [];
  private extMenuData: MenuItem[] = [];
  private userData: HeaderUserData;
  private isLogged = false;

  @Element() private element: HTMLZMyzTopbarElement;

  @Watch("activeintlinkid")
  activeIntLinkChange(newValue: string): void {
    this.activeMenuItem = this.currentMenuItem = this.intMenuData.find((item: MenuItem) => item.id === newValue);
  }

  @Listen("resize", {target: "window"})
  handleResize(): void {
    this.isMobile = window.innerWidth <= mobileBreakpoint;
  }

  @Listen("zListItemLinkClick", {capture: true})
  handleZListItemLinkClick(): void {
    this.isMenuMobileOpen = false;
  }
  @Listen("zListItemClick", {capture: true})
  handleZListItemClick(): void {
    this.isMenuMobileOpen = false;
  }

  componentWillLoad(): void {
    if (this.intlinkdata) {
      this.intMenuData = typeof this.intlinkdata === "string" ? JSON.parse(this.intlinkdata) : this.intlinkdata;
    }
    this.activeMenuItem = this.currentMenuItem = this.intMenuData.find(
      (item: MenuItem) => item.id === this.activeintlinkid
    );

    if (this.extlinkdata) {
      this.extMenuData = typeof this.extlinkdata === "string" ? JSON.parse(this.extlinkdata) : this.extlinkdata;
    }
    if (this.userdata) {
      this.userData = typeof this.userdata === "string" ? JSON.parse(this.userdata) : this.userdata;
      this.isLogged = this.userData.islogged;
    }
    this.handleResize();
  }

  renderLogoDiv(): HTMLDivElement {
    return (
      <div class="logo">
        <z-logo
          link={this.logolink ? this.logolink : null}
          target-blank={true}
          width={144}
          height={36}
          image-alt={this.imagealt}
        />
      </div>
    );
  }

  renderIntMenu(menuItems: MenuItem[]): HTMLDivElement | undefined {
    if (!this.isLogged || !this.ismyz) return;

    return (
      <div
        id="link-int"
        class="link-int"
      >
        {menuItems.map((item) => this.renderIntMenuItem(item))}
      </div>
    );
  }

  renderIntMenuItem(menuItem: MenuItem): HTMLSpanElement {
    const {id, label, link} = menuItem;
    return (
      <span>
        <a
          href={link ? link : null}
          id={id}
          class="menu-item"
          onClick={() => {
            this.activeMenuItem = this.currentMenuItem = menuItem;
            this.activeintlinkid = menuItem.id;
            if (menuItem.subMenu) this.handleToggleMobileMenuItem(menuItem.id);
          }}
          onMouseEnter={() => {
            this.activeMenuItem = menuItem;
          }}
          onMouseLeave={() => {
            this.activeMenuItem = this.currentMenuItem;
          }}
          role={link ? "link" : "button"}
          tabindex={this.getIntMenuItemTabindex(menuItem)}
        >
          <span>{label}</span>
          {menuItem.subMenu ? <i></i> : null}
        </a>
        <svg
          height="8"
          width="16"
          class={{
            hidden: !this.activeMenuItem || this.activeMenuItem.id !== id,
          }}
        >
          <polygon
            points="8,0 16,8 0,8"
            class="arrow"
          />
        </svg>
        {this.isMobile && this.renderMenuItemsData(menuItem)}
      </span>
    );
  }

  getIntMenuItemTabindex(item: MenuItem): number {
    return this.intMenuData.indexOf(item) + 1;
  }

  handleToggleMobileMenuItem(elementId: string): void {
    if (!this.isMobile) return;

    this.element.shadowRoot.querySelector(`#${elementId}`).classList.toggle("isopen");
    this.element.shadowRoot.querySelector("#mobile-dropdown-" + elementId).classList.toggle("visible");
  }

  renderMenuItemsData(menuItem): HTMLSpanElement | null {
    if (!menuItem.subMenu) return null;

    const listItems: ListItemBean[] = menuItem.subMenu.map((item: MenuItem) => {
      return {
        id: item.id,
        text: item.label,
        link: item.link,
        listitemid: item.id,
      };
    });
    return this.renderMobileSubMenu(listItems, menuItem.id);
  }

  renderMobileSubMenu(menuItems: ListItemBean[], id?: string): HTMLSpanElement {
    return (
      <span
        class="mobile-dropdown"
        id={id ? `mobile-dropdown-${id}` : ""}
      >
        <z-myz-list list={menuItems} />
      </span>
    );
  }

  renderSubMenu(menuItem: MenuItem): HTMLDivElement | undefined {
    if (!this.ismyz || !this.isLogged) return;
    if (!menuItem || !menuItem["subMenu"]) {
      return (
        <div
          id="dropdown-menu"
          class={`dropdown-menu hidden`}
        />
      );
    }

    return (
      <div
        id="dropdown-menu"
        class={`dropdown-menu`}
      >
        <ul class="dropdown-links">
          {menuItem.subMenu.map((item: MenuItem) => (
            <li>
              <a
                id={item.id}
                class={item.id === this.activesublinkid ? "active" : ""}
                href={item.link ? item.link : null}
                role={item.link ? "link" : "button"}
                tabindex={this.getIntMenuItemTabindex(menuItem)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderExtLinksIcons(icon): void | object {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    const hideIcons = width > mobileBreakpoint && width < tabletBreakpoint;
    return !hideIcons && {icon};
  }

  renderExtMenu(menuItems: MenuItem[]): HTMLDivElement {
    if (!this.isLogged) return <div />;

    return (
      <div
        id="link-ext"
        class="link-ext"
      >
        {menuItems.map((menuItem: MenuItem) => {
          const {id, label, link, icon} = menuItem;
          return (
            <span class={`link-ext-span${this.ismyz ? " myz" : ""}`}>
              <z-link
                id={id}
                htmlid={id}
                href={link}
                iswhite={!!this.ismyz}
                target="_blank"
                htmltabindex={10}
                {...this.renderExtLinksIcons(icon)}
              >
                {label}
              </z-link>
            </span>
          );
        })}
      </div>
    );
  }

  renderLoginDiv(userData: HeaderUserData): HTMLDivElement {
    return (
      <div class="login">
        {this.isLogged ? (
          <z-menu-dropdown
            nomeutente={userData.name}
            menucontent={JSON.stringify(userData.userlinks)}
          />
        ) : (
          this.renderLoginButton()
        )}
      </div>
    );
  }

  renderLoginButton(): void | HTMLZButtonElement {
    if (this.hideloginbutton) {
      return;
    }

    return (
      <z-button
        htmlid="login-button"
        variant={this.ismyz ? ButtonVariantEnum.secondary : ButtonVariantEnum.tertiary}
        icon="login"
        size={ButtonSizeEnum.small}
      >
        entra
      </z-button>
    );
  }

  renderMobileLoginDiv(userData: HeaderUserData): HTMLDivElement {
    return (
      <div
        id="mobile-login"
        class="mobile-login"
      >
        <span>
          <a
            class="menu-item"
            id="user-data"
            onClick={() => this.handleToggleMobileMenuItem("user-data")}
            role="button"
          >
            <span>
              <z-icon
                name="user-avatar"
                height={16}
                width={16}
              />
              {userData.name}
            </span>
            <i></i>
          </a>
          {this.renderUserData(userData)}
        </span>
      </div>
    );
  }

  renderUserData(userData: HeaderUserData): null | HTMLSpanElement {
    if (this.isMobile && !userData) return null;

    const listItems: ListItemBean[] = userData.userlinks.map((item: MenuItem) => {
      return {
        text: item.label,
        link: item.link,
        icon: item.icon,
        listitemid: item.id,
      };
    });
    return this.renderMobileSubMenu(listItems, "user-data");
  }

  renderDesktopHeader(): HTMLElement {
    return (
      <header class={!this.ismyz ? "myz-out" : ""}>
        {this.renderMainHeader()}
        {this.renderSubMenu(this.activeMenuItem)}
      </header>
    );
  }

  renderMainHeader(): HTMLDivElement {
    return (
      <div
        id="main-header"
        class={{
          "main-header": true,
          "myz-out": !this.ismyz,
        }}
      >
        {this.renderLogoDiv()}
        {this.renderIntMenu(this.intMenuData)}
        {this.renderExtMenu(this.extMenuData)}
        {this.renderLoginDiv(this.userData)}
      </div>
    );
  }

  renderMobileHeader(): HTMLElement {
    return (
      <header>
        {this.renderMobileMenu()}
        {this.renderMobileMenuContent()}
      </header>
    );
  }

  renderMobileMenu(): HTMLDivElement {
    return (
      <div
        id="mobile-header"
        class={`mobile-header${this.ismyz ? "" : " myz-out"}`}
      >
        {this.renderLogoDiv()}
        {this.renderMobileMenuToggle()}
      </div>
    );
  }

  renderMobileMenuToggle(): HTMLZButtonElement | HTMLDivElement {
    if (!this.isLogged) return this.renderLoginButton();

    return (
      <div
        class="menu-mobile"
        id="mobile-menu-wrapper"
        onClick={() => (this.isMenuMobileOpen = !this.isMenuMobileOpen)}
      >
        <div
          class={`menu-toggle${this.isMenuMobileOpen ? " is-active" : ""}`}
          id="mobile-menu"
        >
          <span class="bar" />
          <span class="bar" />
          <span class="bar" />
        </div>
        <span>Menu</span>
      </div>
    );
  }

  renderMobileMenuContent(): HTMLDivElement|null {
    if (!this.isLogged) return null;

    return (
      <div
        id="mobile-content"
        class={{
          "mobile-content": true,
          "open": this.isMenuMobileOpen,
          "myz-out": !this.ismyz,
        }}
      >
        {this.renderMobileLoginDiv(this.userData)}
        {this.ismyz && <hr />}
        {this.renderIntMenu(this.intMenuData)}
        <hr />
        {this.renderExtMenu(this.extMenuData)}
      </div>
    );
  }

  render(): HTMLElement {
    return this.isMobile ? this.renderMobileHeader() : this.renderDesktopHeader();
  }
}
