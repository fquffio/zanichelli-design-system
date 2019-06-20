import { Component, h } from "@stencil/core";
import * as cardData from "./card-mock-data.json";
@Component({
  tag: "z-card-manager",
  styleUrls: ["../../global-styles.css", "z-card-manager.css"],
  shadow: true
})
export class ZCardManager {
  private cardType: string = "resource";
  private hasButton: boolean = true;

  handleCardRemove(e: MouseEvent | CustomEvent): void {
    e.preventDefault();

    // TODO: chain remove card Action in Redux App
    console.log("card removed");
  }

  render() {
    return (
      <z-card
        onHeaderIconClick={(e: CustomEvent) => this.handleCardRemove(e)}
        carddata={JSON.stringify(cardData)}
        hasbutton={this.hasButton}
        cardtype={this.cardType}
      />
    );
  }
}
