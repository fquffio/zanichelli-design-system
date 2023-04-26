import {Component, Prop, h, State, Host, Listen, Element, Event, Watch} from "@stencil/core";
import {
  BreadcrumbHomepageVariant,
  BreadcrumbPath,
  BreadcrumbPathStyle,
  KeyboardCode,
  ListDividerType,
  ListSize,
  PopoverPosition,
} from "../../beans";
import {mobileBreakpoint} from "../../constants/breakpoints";
import {EventEmitter} from "puppeteer";
import {handleKeyboardSubmit} from "../../utils/utils";

@Component({
  tag: "z-breadcrumb",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZBreadcrumb {
  /*Accessibility references */
  /*Overflow-menu: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ */
  /*Breadcrumb: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ */
  /*Focus on multiline link: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html */

  @Element() hostElement: HTMLZBreadcrumbElement;

  /** Path elements */
  @Prop()
  paths: BreadcrumbPath[] | string;

  /** [optional] Sets the path style */
  @Prop({reflect: true})
  pathStyle?: BreadcrumbPathStyle = BreadcrumbPathStyle.UNDERLINED;

  /** Variant of first node*/
  @Prop()
  homepageVariant?: BreadcrumbHomepageVariant = BreadcrumbHomepageVariant.ICON;

  /** [optional] Sets max number of element to show */
  @Prop()
  maxNodesToShow = 5;

  /**  Controls the behaviour on <a> tag click/enter*/
  @Prop()
  preventFollowUrl = false;

  /** */
  @Prop()
  overflowMenuItemRows? = 0;

  /** Sets the maximun number of chars per single node*/
  @Prop()
  truncateChar = 30;

  /** Handle mobile */
  @State()
  isMobile: boolean;

  @State()
  hasOverflow = false;

  @State()
  popoverEllipsisOpen = false;

  /** Emitted when preventFollowUrl=true to handle custom page transition*/
  @Event()
  clickOnNode: EventEmitter;

  @Listen("resize", {target: "window"})
  handleResize(): void {
    this.isMobile = window.innerWidth <= mobileBreakpoint;
    if (this.wrapElement.scrollWidth > this.wrapElement.clientWidth) {
      this.hasOverflow = true;
    }
    if (!this.isMobile && this.hasOverflow) {
      this.checkEllipsisOrOverflowMenu();
      this.hasOverflow = false;
    }
  }
  // eslint-disable-next-line lines-between-class-members
  @Watch("paths")
  @Watch("maxNodesToShow")
  handlePropChange(): void {
    this.initializeBreadcrumb();
  }

  private pathsList: BreadcrumbPath[];

  private pathListCopy: BreadcrumbPath[];

  private collapsedElements: BreadcrumbPath[];

  private collapsedElementsRef: HTMLZPopoverElement;

  private triggerButton: HTMLButtonElement;

  private triggerEllipsis: HTMLAnchorElement;

  private wrapElement: HTMLElement;

  private currentIndex = 0;

  private homepageNode: BreadcrumbPath;

  private totalLenght: number;

  private anchorElements;

  private currentEllipsisText: string;

  private truncatePosition = null;

  componentWillLoad(): void {
    this.initializeBreadcrumb();
  }

  componentWillRender(): void {
    if (this.hasOverflow) {
      this.checkEllipsisOrOverflowMenu();
      this.hasOverflow = false;
    }
  }

  componentDidRender(): void {
    if (this.collapsedElementsRef) {
      this.anchorElements = Array.from(this.hostElement.shadowRoot.querySelectorAll("z-list-group a"));
    }

    if (this.wrapElement.scrollWidth > this.wrapElement.clientWidth) {
      this.hasOverflow = true;
    }
  }

  private initializeBreadcrumb(): void {
    this.isMobile = window.innerWidth <= mobileBreakpoint;
    this.pathsList = this.getPathsItemsList();
    this.totalLenght = this.pathsList.length;
    this.homepageNode = this.pathsList.shift();
    this.pathListCopy = JSON.parse(JSON.stringify(this.pathsList));
    this.collapsedElements = [];
    if (this.totalLenght > this.maxNodesToShow) {
      this.collapsedElements = this.pathsList.splice(0, this.pathsList.length - 2);
    }
  }

  private checkEllipsisOrOverflowMenu(): void {
    for (let i = 0; i < this.pathsList.length; i++) {
      if (this.pathsList[i].name.length > this.truncateChar) {
        if (this.truncatePosition !== null) {
          if (this.truncatePosition > 0) {
            const arrayToPush = this.pathListCopy.splice(0, this.truncatePosition);
            arrayToPush.forEach((item) => {
              this.collapsedElements.push(item);
            });
            this.pathsList.splice(0, this.truncatePosition);
            this.truncatePosition = 0;

            return;
          }
          if (this.truncatePosition === 0) {
            const arrayToPush = this.pathListCopy.splice(0, this.truncatePosition + 1);
            arrayToPush.forEach((item) => {
              this.collapsedElements.push(item);
            });
            this.pathsList.splice(0, this.truncatePosition + 1);
            this.truncatePosition = null;

            return;
          }
        }
        if (i !== this.pathsList.length - 1) {
          const truncatedString = this.truncateWithEllipsis(this.pathsList[i].name, this.truncateChar, null);
          this.currentEllipsisText = this.pathsList[i].name;
          this.pathsList[i].name = truncatedString;
          this.pathsList[i].hasTooltip = true;
          this.truncatePosition = i;

          return;
        }
      }
    }
  }

  private truncateWithEllipsis(str, length, ending): string {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = "...";
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    }

    return str;
  }

  private getPathsItemsList(): BreadcrumbPath[] | undefined {
    if (!this.paths) {
      return Array.from(this.hostElement.children).map((item: HTMLAnchorElement) => {
        return {
          name: item.textContent,
          path: item.href,
        };
      });
    }

    return typeof this.paths === "string" ? JSON.parse(this.paths) : this.paths;
  }

  private renderMobileBreadcrumb(): HTMLDivElement {
    const filteredPath = this.pathsList.filter((item) => !!item.path);
    const lastPath = filteredPath[filteredPath.length - 1];

    return (
      <nav aria-label="Breadcrumb">
        <ol>{this.renderNode(lastPath, true)}</ol>
      </nav>
    );
  }

  private renderHomepageNode(item): HTMLLIElement {
    return (
      <li>
        <a
          class={{
            "homepage-icon": this.homepageVariant === BreadcrumbHomepageVariant.ICON,
            "homepage-text": this.homepageVariant === BreadcrumbHomepageVariant.TEXT,
          }}
          href={item.path}
          onClick={(e) => this.handlePreventFollowUrl(e, item)}
        >
          {this.homepageVariant === BreadcrumbHomepageVariant.ICON ? (
            <z-icon
              name="home"
              fill="color-link-primary"
              height={16}
              width={16}
            />
          ) : (
            "Home"
          )}
        </a>
      </li>
    );
  }

  private renderNode(item, mobile?): HTMLLIElement {
    return (
      <li>
        {item.hasTooltip && (
          <z-popover
            bind-to={this.triggerEllipsis}
            open={this.popoverEllipsisOpen}
            position={PopoverPosition.BOTTOM_RIGHT}
            closable={false}
            showArrow
          >
            <span class="tooltip-content">{this.currentEllipsisText}</span>
          </z-popover>
        )}
        {mobile && <z-icon name="chevron-left"></z-icon>}
        <a
          ref={(val) => (this.triggerEllipsis = val)}
          aria-current={item.path ? undefined : "page"}
          href={item.path}
          onClick={(e) => this.handlePreventFollowUrl(e, item)}
          onMouseOver={() => {
            if (item.hasTooltip) {
              this.popoverEllipsisOpen = true;
            }
          }}
          onMouseLeave={() => {
            if (item.hasTooltip) {
              this.popoverEllipsisOpen = false;
            }
          }}
        >
          {item.name}
        </a>
      </li>
    );
  }

  private renderBreadcrumb(): HTMLElement {
    return (
      <nav
        ref={(val) => (this.wrapElement = val)}
        aria-label="Breadcrumb"
        class={{
          underlined: this.pathStyle === BreadcrumbPathStyle.UNDERLINED,
          semibold: this.pathStyle === BreadcrumbPathStyle.SEMIBOLD,
        }}
      >
        <ol>
          {this.renderHomepageNode(this.homepageNode)}
          {this.collapsedElements ? this.renderOverflowMenu() : ""}
          {this.pathsList.map((item) => this.renderNode(item))}
        </ol>
      </nav>
    );
  }

  private togglePopover(): void {
    if (!this.collapsedElementsRef.open) {
      this.collapsedElementsRef.open = true;
    }
  }

  private handlePreventFollowUrl(e: MouseEvent, item): void {
    if (this.preventFollowUrl) {
      e.preventDefault();
      this.clickOnNode.emit(item.path);
    }
  }

  private handleOverflowMenuAccessibility(e: KeyboardEvent): void {
    const anchorElementsLenght = this.anchorElements.length;
    if (e.key === KeyboardCode.TAB) {
      e.preventDefault();

      return;
    }
    e.stopPropagation();
    const arrows = [KeyboardCode.ARROW_DOWN, KeyboardCode.ARROW_UP];
    if (arrows.includes(e.key as KeyboardCode)) {
      e.preventDefault();

      if (e.key === KeyboardCode.ARROW_DOWN) {
        this.currentIndex = anchorElementsLenght === this.currentIndex + 1 ? 0 : this.currentIndex + 1;
      }
      if (e.key === KeyboardCode.ARROW_UP) {
        this.currentIndex = this.currentIndex <= 0 ? anchorElementsLenght - 1 : this.currentIndex - 1;
      }

      this.anchorElements[this.currentIndex].focus();
    }

    if (e.key === KeyboardCode.ESC) {
      this.triggerButton.focus();
    }
  }

  private renderOverflowMenu(): HTMLLIElement {
    if (this.collapsedElements.length) {
      return (
        <li>
          <z-popover
            ref={(val) => (this.collapsedElementsRef = val as HTMLZPopoverElement)}
            bind-to={this.triggerButton}
            position={PopoverPosition.BOTTOM_RIGHT}
            closable={true}
            showArrow
          >
            <div class="popover-content">
              <z-list>
                <z-list-group
                  dividerType={ListDividerType.ELEMENT}
                  size={ListSize.SMALL}
                >
                  {this.collapsedElements.map((item) => (
                    <z-list-element clickable>
                      <a
                        class="text-ellipsis"
                        href={item.path}
                        onClick={(e) => this.handlePreventFollowUrl(e, item)}
                        onKeyDown={(e) => this.handleOverflowMenuAccessibility(e)}
                      >
                        {item.name}
                      </a>
                    </z-list-element>
                  ))}
                </z-list-group>
              </z-list>
            </div>
          </z-popover>
          <button
            aria-label="Mostra più breadcrumb"
            aria-haspopup="true"
            ref={(el) => (this.triggerButton = el as HTMLButtonElement)}
            class="dots"
            onClick={() => {
              this.togglePopover();
            }}
            onKeyDown={(e) => {
              handleKeyboardSubmit(e, this.togglePopover.bind(this));
              setTimeout(() => {
                this.anchorElements[0].focus();
              }, 100);
            }}
          >
            ...
          </button>
        </li>
      );
    }
  }

  render(): HTMLZBreadcrumbElement {
    return (
      <Host style={{"--line-clamp": `${this.overflowMenuItemRows}`}}>
        {this.isMobile ? this.renderMobileBreadcrumb() : this.renderBreadcrumb()}
      </Host>
    );
  }
}
