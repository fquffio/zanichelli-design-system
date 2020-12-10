import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { DictionaryData } from "../../../beans";

/**
 * @slot  - content
 */
@Component({
  tag: "z-card-dictionary-info",
  styleUrl: "styles.css",
  shadow: true
})
export class ZCardDictionaryInfo {
  @Prop() data: string | DictionaryData;

  private cardData: DictionaryData;

  @Event() closeInfo: EventEmitter;
  emitCloseInfo() {
    this.closeInfo.emit();
  }

  componentWillLoad() {
    if (typeof this.data === "string") {
      this.cardData = JSON.parse(this.data);
    } else {
      this.cardData = this.data;
    }
  }

  render() {
    return (
      <div>
        <z-icon
          name="multiply-circled-filled"
          height={18}
          width={18}
          onClick={() => this.emitCloseInfo()}
          tabindex="0"
        />
        <div>
          <section>
            Autore: <b>{this.cardData.author}</b>
            <br />
            Anno: <b>{this.cardData.year}</b>
            <br />
            {this.cardData.title}
            <br />
            {this.cardData.description}
          </section>
          <section>
            <span class="licenze_heading">
              <span>Licenza online</span>
              <span class="expired">
                {this.cardData.online_license.expired ? "SCADUTA" : ""}
              </span>
            </span>
            Scadenza il <b>{this.cardData.online_license.expiration}</b>
            <br />
            Installazioni disponibili:{" "}
            <b>{this.cardData.online_license.installations}</b>
          </section>
          <section>
            <span class="licenze_heading">
              <span>Licenza offline</span>
              <span class="expired">
                {this.cardData.offline_license.expired ? "SCADUTA" : ""}
              </span>
            </span>
            Scadenza il <b>{this.cardData.offline_license.expiration}</b>
            <br />
            Installazioni disponibili:{" "}
            <b>{this.cardData.offline_license.installations}</b>
          </section>
        </div>
        <slot />
      </div>
    );
  }
}
