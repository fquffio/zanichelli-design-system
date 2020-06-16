import { Component, Prop, h, State, Element, Watch } from "@stencil/core";
import { getDevice, handleKeyboardSubmit } from "../../../utils/utils";

@Component({
  tag: "z-slideshow",
  styleUrl: "styles.css",
  shadow: true
})
export class ZSlideshow {
  @Element() el: HTMLElement;

  @Prop() slideshowid: string;

  /** JSON stringified link url images */
  // TODO: prevedere anche la possibilità che sia un array
  @Prop() data?: string = "";

  @State() device: "mobile" | "tablet" | "desktop";
  @State() currentSlide: number = 0;

  private links: string[];

  @Watch("data")
  watchData() {
    this.parseLinks();
  }

  componentWillLoad() {
    this.parseLinks();

    this.setDevice();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentDidRender() {
    this.setStyle();
  }

  handleResize() {
    this.setDevice();
    this.setStyle();
  }

  parseLinks() {
    // TODO: prevedere anche la possibilità che sia un array
    this.links = this.data ? JSON.parse(this.data) : [];
  }

  setStyle() {
    const refSlides = this.el.shadowRoot.getElementById("slides");
    const allImages = this.el.shadowRoot.querySelectorAll(".slide");
    const width = this.el.offsetWidth;
    const fullwidth = width * this.links.length;

    refSlides.style.width = `${fullwidth}px`;
    refSlides.style.transform = `translate(-${width * this.currentSlide}px)`;
    allImages.forEach((item: HTMLElement) => {
      const img = item.getElementsByTagName("img").item(0);
      img.style.width = `${width}px`;
    });
  }

  setDevice() {
    this.device = getDevice();
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
  }

  renderSlides(items: string[]) {
    return (
      <div id="slides">
        {items.map((item: string, i: number) => (
          <div
            id={"slide" + i}
            class={`slide ${this.currentSlide !== i && "hide"}`}
          >
            <img src={item} />
          </div>
        ))}
      </div>
    );
  }

  getBulletDimension() {
    switch (this.device) {
      case "mobile":
        return 24;
      case "tablet":
        return 32;
      default:
        return 40;
    }
  }
  renderScroll(direction: "left" | "right") {
    let disabled = false,
      nextSlide = this.currentSlide;

    if (direction === "left") {
      disabled = this.currentSlide === 0;
      nextSlide--;
    } else if (direction === "right") {
      disabled = this.currentSlide === this.links.length - 1;
      nextSlide++;
    }

    return (
      <z-icon
        class={`scroll ${direction} ${disabled && "disabled"}`}
        width={this.getBulletDimension()}
        height={this.getBulletDimension()}
        name={`circle-chevron-${direction}`}
        onClick={() => {
          !disabled && this.setCurrentSlide(nextSlide);
        }}
        onKeyUp={(e: KeyboardEvent) =>
          handleKeyboardSubmit(e, () => {
            this.setCurrentSlide(nextSlide);
          })
        }
        tabindex={0}
        role="button"
      />
    );
  }

  renderSlideshowMain() {
    return (
      <main>
        {this.renderScroll("left")}
        {this.renderSlides(this.links)}
        {this.renderScroll("right")}
      </main>
    );
  }

  renderBullet(i: number) {
    return (
      <a
        class={`bullet ${this.currentSlide === i && "selected"}`}
        onClick={() => {
          this.setCurrentSlide(i);
        }}
        onKeyUp={(e: KeyboardEvent) =>
          handleKeyboardSubmit(e, () => {
            this.setCurrentSlide(i);
          })
        }
        tabindex={0}
        role="button"
      ></a>
    );
  }

  renderSlideshowFooter() {
    return (
      <footer>
        <div class="footerLeft">
          <slot name="footerLeft" />
        </div>
        <div class="footerCenter">
          <div class="bulletContainer">
            {Object.keys(this.links).map(i => this.renderBullet(parseInt(i)))}
          </div>
        </div>
        <div class="footerRight">
          <slot name="footerRight" />
        </div>
      </footer>
    );
  }

  render() {
    return (
      <div id={this.slideshowid}>
        {this.renderSlideshowMain()}
        {this.renderSlideshowFooter()}
      </div>
    );
  }
}
