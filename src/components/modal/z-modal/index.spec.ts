import {MockHTMLElement} from "@stencil/core/mock-doc";
import {newSpecPage} from "@stencil/core/testing";

import {ZModal} from "./index";

describe("Suite test ZModal", () => {
  beforeAll(() => {
    // INFO: https://github.com/jsdom/jsdom/issues/3294
    MockHTMLElement.prototype.show = jest.fn();
    MockHTMLElement.prototype.showModal = jest.fn();
    MockHTMLElement.prototype.close = jest.fn();
  });

  it("Test render empty ZModal", async () => {
    const page = await newSpecPage({
      components: [ZModal],
      html: `<z-modal></z-modal>`,
    });

    expect(page.root).toEqualHtml(`
      <z-modal>
        <mock:shadow-root>
        <dialog aria-describedby="modal-content" aria-labelledby="modal-title" open="true">
          <div class="modal-container">
            <header>
              <div>
                <slot name="modalCloseButton">
                  <button aria-label="chiudi modale">
                    <z-icon name="multiply-circle-filled"></z-icon>
                  </button>
                </slot>
              </div>
            </header>
            <div class="modal-content" id="modal-content" style="--overflow-value: hidden auto;">
              <slot name="modalContent"></slot>
            </div>
          </div>
          <div class="modal-background" data-action="modalBackground"></div>
        </dialog>
        </mock:shadow-root>
      </z-modal>
    `);
  });

  it("Test render ZModal with props", async () => {
    const page = await newSpecPage({
      components: [ZModal],
      html: `<z-modal modalid="modal" modaltitle="title" modalsubtitle="subtitle" close-button-label="chiudi modale"></z-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <z-modal modalid="modal" modaltitle="title" modalsubtitle="subtitle" close-button-label="chiudi modale">
        <mock:shadow-root>
        <dialog aria-describedby="modal-content" aria-labelledby="modal-title" open="true">
          <div class="modal-container" id="modal">
            <header>
              <div>
                <h1 id="modal-title">title</h1>
                <slot name="modalCloseButton">
                  <button aria-label="chiudi modale">
                    <z-icon name="multiply-circle-filled"></z-icon>
                  </button>
                </slot>
              </div>
              <h2 id="modal-subtitle">subtitle</h2>
            </header>
            <div class="modal-content" id="modal-content" style="--overflow-value: hidden auto;">
              <slot name="modalContent"></slot>
            </div>
          </div>
          <div class="modal-background" data-action="modalBackground" data-modal="modal"></div>
        </dialog>
        </mock:shadow-root>
      </z-modal>
    `);
  });

  it("Test render ZModal with prop scrollable", async () => {
    const page = await newSpecPage({
      components: [ZModal],
      html: `<z-modal modalid="modal" modaltitle="title" modalsubtitle="subtitle" close-button-label="chiudi modale" scrollable="false"></z-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <z-modal modalid="modal" modaltitle="title" modalsubtitle="subtitle" close-button-label="chiudi modale" scrollable="false">
        <mock:shadow-root>
        <dialog aria-describedby="modal-content" aria-labelledby="modal-title" class="modal-dialog" open="true">
          <div class="modal-container modal-container-variant" id="modal">
            <header>
              <div>
                <h1 id="modal-title">title</h1>
                <slot name="modalCloseButton">
                  <button aria-label="chiudi modale">
                    <z-icon name="multiply-circle-filled"></z-icon>
                  </button>
                </slot>
              </div>
              <h2 id="modal-subtitle">subtitle</h2>
            </header>
            <div class="modal-content" id="modal-content" style="--overflow-value: initial;">
              <slot name="modalContent"></slot>
            </div>
              <div class="modal-spacer"></div>
          </div>
              <div class="modal-background-variant" data-action="modalBackground" data-modal="modal"></div>
        </div>
      </div>
    </dialog>
  </mock:shadow-root>
</z-modal>
`);
  });

  it("Test render ZModal with slotted content", async () => {
    const page = await newSpecPage({
      components: [ZModal],
      html: `<z-modal><div slot="modalContent">Contenuto dello <b>slot</b></div></z-modal>`,
    });

    expect(page.root).toEqualHtml(`
      <z-modal>
        <mock:shadow-root>
        <dialog aria-describedby="modal-content" aria-labelledby="modal-title" open="true">
          <div class="modal-container">
            <header>
              <div>
                <slot name="modalCloseButton">
                  <button aria-label="chiudi modale">
                    <z-icon name="multiply-circle-filled"></z-icon>
                  </button>
                </slot>
              </div>
            </header>
            <div class="modal-content" id="modal-content" style="--overflow-value: hidden auto;">
              <slot name="modalContent"></slot>
            </div>
          </div>
          <div class="modal-background" data-action="modalBackground"></div>
        </dialog>
        </mock:shadow-root>
        <div slot="modalContent">Contenuto dello <b>slot</b></div>
      </z-modal>
    `);
  });
  it("Test render ZModal with slotted content and close button", async () => {
    const page = await newSpecPage({
      components: [ZModal],
      html: `<z-modal><div slot="modalContent">Contenuto dello <b>slot</b></div><button slot="modalCloseButton" aria-label="close">X</button></z-modal>`,
    });

    expect(page.root).toEqualHtml(`
      <z-modal>
        <mock:shadow-root>
        <dialog aria-describedby="modal-content" aria-labelledby="modal-title" open="true">
          <div class="modal-container">
            <header>
              <div>
                <slot name="modalCloseButton">
                  <button aria-label="chiudi modale">
                    <z-icon name="multiply-circle-filled"></z-icon>
                  </button>
                </slot>
              </div>
            </header>
            <div class="modal-content" id="modal-content" style="--overflow-value: hidden auto;">
              <slot name="modalContent"></slot>
            </div>
          </div>
          <div class="modal-background" data-action="modalBackground"></div>
        </dialog>
        </mock:shadow-root>
        <div slot="modalContent">Contenuto dello <b>slot</b></div>
        <button aria-label="close" slot="modalCloseButton">X</button>
      </z-modal>
    `);
  });
});
