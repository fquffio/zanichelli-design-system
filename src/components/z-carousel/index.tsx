import {
  Component,
  h,
  Prop,
  Element,
  Watch,
  Event,
  EventEmitter,
  State,
  Host,
} from "@stencil/core";
import { HostElement } from "@stencil/core/internal";
import {
  CarouselArrowsPosition,
  CarouselProgressMode,
  ButtonVariantEnum,
} from "../../beans";

/**
 * ZCarousel component.
 * @cssprop --z-carousel-gutter - The gutter between items.
 * @slot - carousel items. use `<li>` elements inside this slot as it is wrapped inside an `<ul>`
 */
@Component({
  tag: "z-carousel",
  styleUrl: "styles.css",
  shadow: false,
})
export class ZCarousel {
  @Element() hostElement: HTMLZCarouselElement;

  /** The z-carousel is on loading state */
  @Prop()
  isLoading: boolean;

  /** Shows only one content at a time */
  @Prop()
  single: boolean = false;

  /** Arrow buttons position */
  @Prop()
  arrows: null | CarouselArrowsPosition;

  /** Progress indicator. Only available for `single` mode */
  @Prop()
  progress: null | CarouselProgressMode;

  /** The height of z-carousel ghost loading, this prop is mandatory when isloading is set to true, as otherwise the component won"t show. */
  @Prop()
  ghostLoadingHeight: number = 100;

  /** Current item index for single mode. */
  @State() current: number = 0;

  /** Items on the slider. */
  @State()
  items: HTMLLIElement[];

  /** Reference for the items container element. */
  private itemsContainer: HTMLUListElement;

  /** Observer that handles current index change when scrolling on single mode. */
  private intersectionObserver: IntersectionObserver;

  /** Emitted on index change and only in `single` mode. */
  @Event() indexChange: EventEmitter;

  @Watch("current")
  onIndexChange() {
    this.items[this.current].scrollIntoView({
      behavior: "smooth",
    });
    this.indexChange.emit({ currentItem: this.current });
  }

  @Watch("single")
  onSingleModeChange() {
    if (this.single && !this.intersectionObserver) {
      this.setIntersectionObserver();
    }
  }

  componentDidLoad(): void {
    this.itemsContainer = this.hostElement.querySelector(
      ".z-carousel-items-container"
    );
    if (!this.itemsContainer) {
      return;
    }

    this.items = Array.from(this.itemsContainer.querySelectorAll("li"));

    if (this.single) {
      this.setIntersectionObserver();
    }
  }

  /**
   * Set an intersection observer to show the current index to the indicator when scrolling.
   */
  private setIntersectionObserver(): void {
    this.intersectionObserver = new window.IntersectionObserver(
      (entries) => {
        const entry = entries.find((entry) => entry.isIntersecting);
        if (!entry) {
          return;
        }

        this.current = this.items.findIndex((item) => item === entry.target);
      },
      {
        root: this.itemsContainer,
        threshold: 0.25,
      }
    );

    this.items.forEach((element) => this.intersectionObserver.observe(element));
  }

  private onPrev(): void {
    if (this.single) {
      this.current = Math.max(0, this.current - 1);
      return;
    }

    const scroller = this.itemsContainer;
    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: -scroller.clientWidth / 2,
      behavior: "smooth",
    });
  }

  private onNext(): void {
    if (this.single) {
      this.current = Math.min(this.current + 1, this.items.length - 1);

      return;
    }

    const scroller = this.itemsContainer;
    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: scroller.clientWidth / 2,
      behavior: "smooth",
    });
  }

  /**
   * Check if footer can be rendered.
   * @returns {boolean}
   */
  private canShowFooter(): boolean {
    return (
      this.arrows === CarouselArrowsPosition.BOTTOM ||
      this.progress === CarouselProgressMode.DOTS ||
      this.progress === CarouselProgressMode.NUMBERS
    );
  }

  /**
   * Set current item to passed index.
   * @param {number} index Index to set
   * @returns {void}
   */
  private goTo(index): void {
    if (this.current === index) {
      return;
    }

    this.current = index;
  }

  render(): HTMLDivElement | HostElement {
    if (this.isLoading) {
      return (
        <div style={{ height: `${this.ghostLoadingHeight}px` }}>
          <z-ghost-loading></z-ghost-loading>
          <div class="loading-items-container">
            <slot />
          </div>
        </div>
      );
    }

    return (
      <Host>
        <div class="z-carousel-container">
          {this.arrows === CarouselArrowsPosition.OVER && (
            <z-button
              data-direction="prev"
              icon="chevron-left"
              onClick={this.onPrev.bind(this)}
            />
          )}
          <ul class="z-carousel-items-container">
            <slot />
          </ul>
          {this.arrows === CarouselArrowsPosition.OVER && (
            <z-button
              data-direction="next"
              icon="chevron-right"
              onClick={this.onNext.bind(this)}
            />
          )}
        </div>

        {this.canShowFooter() && (
          <div class="z-carousel-footer">
            {this.arrows === CarouselArrowsPosition.BOTTOM && (
              <z-button
                variant={ButtonVariantEnum.tertiary}
                icon="arrow-left-filled"
                onClick={this.onPrev.bind(this)}
              />
            )}
            {this.progress === CarouselProgressMode.DOTS &&
              this.single &&
              this.items && (
                <div class="dots-progress">
                  {this.items.map((_item, key) => (
                    <button
                      type="button"
                      class={{ current: this.current === key }}
                      onClick={() => this.goTo(key)}
                    >
                      <z-icon
                        name={
                          this.current === key
                            ? "white-circle-filled"
                            : "black-circle-filled"
                        }
                      />
                    </button>
                  ))}
                </div>
              )}
            {this.progress === CarouselProgressMode.NUMBERS &&
              this.single &&
              this.items && (
                <div class="numbers-progress">
                  <span class="interactive-3 current">{this.current + 1}</span>
                  <span class="interactive-3">di</span>
                  <span class="interactive-3">{this.items.length}</span>
                </div>
              )}
            {this.arrows === CarouselArrowsPosition.BOTTOM && (
              <z-button
                variant={ButtonVariantEnum.tertiary}
                icon="arrow-right-filled"
                onClick={this.onNext.bind(this)}
              />
            )}
          </div>
        )}
      </Host>
    );
  }
}
