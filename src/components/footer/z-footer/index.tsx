import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import { ButtonSizeEnum, ButtonVariantEnum } from "../../../beans";

/**
 * @slot - main navigation
 * @slot links - bottom navigation
 * @slot social - social links
 */
@Component({
  tag: "z-footer",
  styleUrls: ["styles.css"],
  shadow: true,
})
export class ZFooter {
  /** deprecated - JSON stringified data to fill the footer */
  @Prop() data?: string;
  @Prop() productName?: string;
  @Prop() productVersion?: string;
  @Prop() productCreditsLink?: string;
  @Prop() showReportAProblemButton?: boolean;

  private jsonData;

  constructor() {
    this.emitReportAProblemButtonClick = this.emitReportAProblemButtonClick.bind(this);
  }

  componentWillLoad() {
    if (this.data) {
      console.warn("z-footer: `data` prop is deprecated and will be removed in a future version. Use slots instead.");
      this.jsonData = JSON.parse(this.data);
    }
  }

  @Event() reportAProblemButtonClick: EventEmitter;
  emitReportAProblemButtonClick() {
    this.reportAProblemButtonClick.emit();
  }

  renderZLogo(): HTMLZLogoElement {
    return (
      <z-logo
        link="https://www.zanichelli.it"
        width={144}
        height={38}
        imagealt="Home Zanichelli"
        targetblank={true}
      />
    );
  }

  renderAddress(): HTMLParagraphElement {
    return (
      <p>
        Zanichelli editore S.p.A. via Irnerio 34, 40126 Bologna
        <br />
        Fax 051 - 249.782 / 293.224 | Tel. 051 - 293.111 / 245.024
        <br />
        Partita IVA 03978000374
      </p>
    );
  }

  renderSocial(): HTMLDivElement {
    return (
      <div class="social">
        <slot name="social" />
        {this.renderFooterSocialJsonData()}
      </div>
    );
  }

  renderCopyright(): HTMLParagraphElement {
    return (
      <p>
        Copyright – 2018-{new Date().getFullYear()} Zanichelli
        <span>All rights reserved</span>
      </p>
    );
  }

  renderCertification(): HTMLParagraphElement {
    return (
      <p>
        Zanichelli editore S.p.A. opera con sistema qualità certificato
        CertiCarGraf n. 477
        <br />
        secondo la norma UNI EN ISO 9001:2015
      </p>
    );
  }

  renderBottomLinks(): HTMLDivElement {
    return (
      <div class="item bottom-links">
        <slot name="links" />
        {this.renderFooterBottomJsonData()}
      </div>
    );
  }

  renderFooterBottom(): HTMLElement {
    return (
      <section class="bottom">
        <div class="item logo">
          {this.renderZLogo()}
          {this.renderCopyright()}
          {this.renderCertification()}
        </div>
        <div class="item">
          {this.renderAddress()}
          {this.renderSocial()}
        </div>
        {this.renderBottomLinks()}
      </section>
    );
  }

  renderFooterTop(): HTMLElement {
    return (
      <section class="top">
        <slot />
        {this.renderFooterTopJsonData()}
      </section>
    );
  }

  renderFooterProductInfo(): HTMLElement {
    if (this.productName || this.productVersion || this.productCreditsLink || this.showReportAProblemButton) {
      const versionString = `${this.productName ? ' versione' : 'Versione'} ${this.productVersion}`;

      const creditsObject = <z-body level={5}>
        {(this.productName || this.productVersion) && ' - '}
        <z-link href={this.productCreditsLink} target="_blank" textcolor="white">Credits</z-link>
      </z-body>;

      return (
        <div class="extension">
          <span>
            {this.productName && <z-body level={5} variant="semibold">{this.productName}</z-body>}
            {this.productVersion && <z-body level={5}>{versionString}</z-body>}
            {this.productCreditsLink && creditsObject}
          </span>
          {this.showReportAProblemButton &&
            <div>
              <z-body level={5}>Hai bisogno di aiuto?</z-body>
              <z-button
                variant={ButtonVariantEnum["dark-bg"]}
                size={ButtonSizeEnum.small}
                onClick={this.emitReportAProblemButtonClick}
              >
                SEGNALA UN PROBLEMA
              </z-button>
            </div>
          }
          <z-divider color="gray500" />
        </div>
      );
    }
  }

  // INFO: backward compatibility
  renderFooterTopJsonData(): null | HTMLElement {
    if (!this.jsonData || !this.jsonData.zanichelliLinks) return null;

    const zanichelliLinks = this.jsonData.zanichelliLinks;
    if (this.jsonData.bottomLinks) {
      const bottomLinks = this.jsonData.bottomLinks;
      zanichelliLinks.push({
        title: "Altre informazioni",
        items: bottomLinks,
      });
    }

    return zanichelliLinks.map(
      (item): HTMLElement => (
        <z-footer-section name={item.title}>
          {item.items.map((item) => (
            <z-footer-link href={item.link}>{item.label}</z-footer-link>
          ))}
        </z-footer-section>
      )
    );
  }

  // INFO: backward compatibility
  renderFooterBottomJsonData(): null | HTMLElement {
    if (!this.jsonData || !this.jsonData.bottomLinks) return null;

    const bottomLinks = this.jsonData.bottomLinks;
    return bottomLinks.map(
      (item): HTMLElement => (
        <z-footer-link href={item.link}>{item.label}</z-footer-link>
      )
    );
  }

  // INFO: backward compatibility
  renderFooterSocialJsonData(): null | HTMLElement {
    if (!this.jsonData || !this.jsonData.social) return null;

    const social = this.jsonData.social;
    return social.map(
      (item): HTMLElement => (
        <z-footer-social
          href={item.link}
          icon={item.icon}
          description={item.description}
        />
      )
    );
  }

  render(): HTMLElement {
    return (
      <footer>
        {this.renderFooterProductInfo()}
        {this.renderFooterTop()}
        {this.renderFooterBottom()}
      </footer>
    );
  }
}
