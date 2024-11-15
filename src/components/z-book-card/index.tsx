import {Component, Element, Event, EventEmitter, Fragment, Prop, State, h} from "@stencil/core";
import {BookCardVariant} from "../../beans";
import {Breakpoints} from "../../constants/breakpoints";

/**
 * @slot resources - books resources (extended variant only)
 * @slot header-cta - header CTA (e.g. bookmark icon - extended and search variant only)
 * @slot tags - card tags (extended and search variant only)
 * @slot footer-cta - footer cta button (search and compact variant only)
 * @cssprop --z-book-card-ribbon-background-color - ribbon backgrund color
 * @cssprop --z-book-card-ribbon-shadow-color - ribbon shadow color
 * @cssprop --z-book-card-compact-width - compact card custom width
 * @cssprop --z-book-card-compact-height - compact card custom height
 */
@Component({
  tag: "z-book-card",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZBookCard {
  @Element() hostElement: HTMLZBookCardElement;

  /**
   * Card variant: landscape, portrait
   */
  @Prop()
  variant: BookCardVariant = BookCardVariant.PORTRAIT;

  /**
   * Cover URL
   */
  @Prop()
  cover: string;

  /**
   * Card main title
   */
  @Prop()
  operaTitle: string;

  /**
   * [optional] Card subtitle
   */
  @Prop()
  volumeTitle?: string;

  /**
   * [optional] Authors
   */
  @Prop()
  authors?: string;

  /**
   * [optional] Main ISBN
   */
  @Prop()
  isbn?: string;

  /**
   * [optional] ISBN label
   */
  @Prop()
  isbnLabel = "";

  /**
   * [optional] Ribbon label - expanded and search variant only
   */
  @Prop()
  ribbon?: string;

  /**
   * [optional] Ribbon icon - expanded and search variant only
   */
  @Prop()
  ribbonIcon?: string;

  /**
   * [optional] Ribbon interactive - expanded and search variant only
   */
  @Prop()
  ribbonInteractive?: boolean;

  /**
   * [optional] Fallback cover URL
   */
  @Prop()
  fallbackCover?: string;

  /**
   * [optional] [accessibility] Card title HTML tag
   */
  @Prop()
  operaTitleTag?: string;

  @State()
  isMobile = false;

  @State()
  hasResources = false;

  @State()
  showResources = false;

  /** click on interactive ribbon */
  @Event()
  ribbonClick: EventEmitter;

  // private emitRibbonClick(): void {
  //   this.ribbonClick.emit();
  // }

  // private id: string;

  componentWillLoad(): void {
    // this.id = `id-${randomId()}`;

    const mobileMediaQuery = window.matchMedia(`(max-width: ${Breakpoints.MOBILE}px)`);
    this.isMobile = mobileMediaQuery.matches;
    mobileMediaQuery.onchange = (mql) => (this.isMobile = mql.matches);
  }

  componentDidLoad(): void {
    this.handleResources();
  }

  private handleResources(): void {
    if (this.variant !== BookCardVariant.EXPANDED || !this.isMobile) {
      return;
    }
    this.hasResources = this.hostElement.querySelectorAll("[slot=resources]")?.length > 0;
  }

  // private toggleResources(): void {
  //   this.showResources = !this.showResources;
  // }

  private renderCard(): HTMLDivElement {
    switch (this.variant) {
      case BookCardVariant.LANDSCAPE:
        return this.renderLandscape();
      case BookCardVariant.PORTRAIT:
        return this.renderPortrait();
    }
  }

  private renderLandscape(): HTMLDivElement {
    return (
      <Fragment>
        <div class="main-content">
          {this.renderCover()}
          <div class="card-info">
            <div class="book-data">
              <div class="authors-title-icon-section">
                <div class="authors-title">
                  <div class="authors">{this.authors}</div>
                  <div class="opera-title">{this.operaTitle}</div>
                </div>
                <div class="icon"></div>
              </div>
              <div class="isbn-link-section">
                <div class="isbn-tags-section"></div>
                <div class="link-section"></div>
              </div>
            </div>
            <div class="ebook"></div>
          </div>
        </div>
        <div class="apps"></div>
      </Fragment>
    );
  }

  private renderPortrait(): HTMLDivElement {
    return <div class="wrapper"></div>;
  }

  private renderCover(): HTMLDivElement {
    return (
      <div class="cover">
        <img
          src={this.cover}
          onError={() => {
            if (this.fallbackCover) {
              this.cover = this.fallbackCover;
            }
          }}
          aria-hidden="true"
        />
      </div>
    );
  }

  // private renderOperaTitle(): HTMLDivElement {
  //   const title = this.operaTitleTag
  //     ? `<${this.operaTitleTag}>${this.operaTitle}</${this.operaTitleTag}>`
  //     : this.operaTitle;

  //   return (
  //     <div
  //       class="title"
  //       innerHTML={title}
  //     />
  //   );
  // }

  // private renderVolumeTitle(): null | HTMLDivElement {
  //   return this.volumeTitle ? <div class="subtitle">{this.volumeTitle}</div> : null;
  // }

  // private renderAuthors(): null | HTMLDivElement {
  //   return this.authors ? (
  //     <div
  //       class="authors"
  //       aria-description="Autori"
  //     >
  //       {this.authors}
  //     </div>
  //   ) : null;
  // }

  // private renderIsbn(): null | HTMLDivElement {
  //   return this.isbn ? (
  //     <div class="isbn">
  //       <span
  //         class="code"
  //         aria-description={`ISBN ${this.isbnLabel}`}
  //       >
  //         {this.isbn}
  //       </span>
  //       {this.isbnLabel ? <span class="label"> {this.isbnLabel}</span> : null}
  //     </div>
  //   ) : null;
  // }

  // private renderShowResources(): HTMLButtonElement {
  //   return (
  //     <button
  //       class="show-resources"
  //       aria-label={`Risorse del libro ${this.operaTitle}`}
  //       aria-expanded={this.showResources.toString()}
  //       aria-controls={`resources-${this.id}`}
  //       onClick={() => this.toggleResources()}
  //     >
  //       {this.showResources ? "Chiudi" : "Vedi tutto"}
  //       <z-icon name={this.showResources ? "chevron-up" : "chevron-down"} />
  //     </button>
  //   );
  // }

  // private renderTagsSlot(): HTMLDivElement {
  //   return (
  //     <div class="tags">
  //       <slot name="tags" />
  //     </div>
  //   );
  // }

  // private renderHeaderCtaSlot(): HTMLSlotElement {
  //   return <slot name="header-cta" />;
  // }

  // private renderResourcesSlot(): HTMLDivElement {
  //   return (
  //     <div
  //       id={`resources-${this.id}`}
  //       class="resources"
  //     >
  //       <slot
  //         name="resources"
  //         onSlotchange={() => this.handleResources()}
  //       />
  //     </div>
  //   );
  // }

  // private renderFooterCtaSlot(): HTMLDivElement {
  //   return (
  //     <div class="action-container">
  //       <slot name="footer-cta" />
  //     </div>
  //   );
  // }

  render(): HTMLZBookCardElement {
    return (
      <article
        class={{
          [this.variant]: true,
        }}
      >
        {this.renderCard()}
      </article>
    );
  }
}
