import { newSpecPage } from "@stencil/core/testing";

import { ZButton } from "./index";

describe("Suite test ZButton", () => {
  it("Test render ZButton", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button></z-button>`,
    });
    expect(page.root).toEqualHtml(`
    <z-button size="big" target="_blank" variant="primary">
      <button class="big primary" type="button"></button>
      </z-button>
    `);
  });

  it("Test render ZButton con testo", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button text="text"></z-button>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button size="big" target="_blank" text="text" variant="primary">
          <button type="button" class="big primary">
          <span>text</span>
          </button>
     </z-button>
    `);
  });

  it("Test render ZButton con icon", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button icon="icon"></z-button>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button size="big" variant="primary" icon="icon" target="_blank"  >
          <button type="button" class="big primary">
            <z-icon name="icon" height="16" width="16"></z-icon>
          </button>
      </z-button>
    `);
  });

  it("Test render ZButton variant", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button variant="secondary"></z-button>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button size="big"  target="_blank" variant="secondary">
          <button type="button" class="big secondary">       
          </button>
      </z-button>
    `);
  });

  it("Test render ZButton small", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button size="small"></z-button>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button size="small" target="_blank" variant="primary" >
          <button type="button" class="small  primary">
          </button>
      </z-button>
    `);
  });

  // it("Test render ZButton disabled", async () => {
  //   const page = await newSpecPage({
  //     components: [ZButton],
  //     html: `<z-button disabled></z-button>`
  //   });
  //   expect(page.root).toEqualHtml(`
  //     <z-button size="big" variant="primary" disabled style="pointer-events: none;">
  //     <mock:shadow-root>
  //       <slot name="element">
  //         <button type="button" class="big primary" disabled>
  //           <slot></slot>
  //         </button>
  //       </slot>
  //     </mock:shadow-root>
  //     </z-button>
  //   `);
  // });

  // it("Test render ZButton with slotted button", async () => {
  //   const page = await newSpecPage({
  //     components: [ZButton],
  //     html: `<z-button>
  //       <button>invio</button>
  //     </z-button>`
  //   });

  //   expect(page.root).toEqualHtml(`
  //     <z-button size="big" variant="primary" style="pointer-events: auto;">
  //       <mock:shadow-root>
  //         <slot name="element">
  //           <button type="button" class="big primary">
  //             <slot></slot>
  //           </button>
  //         </slot>
  //       </mock:shadow-root>
  //       <button>invio</button>
  //     </z-button>
  //   `);
  // });

  // it("Test render ZButton with link and variant", async () => {
  //   const page = await newSpecPage({
  //     components: [ZButton],
  //     html: `<z-button variant="primary">
  //       <a href="https://wikipedia.com">Link</button>
  //     </z-button>`
  //   });

  //   expect(page.root).toEqualHtml(`
  //     <z-button size="big" variant="primary" style="pointer-events: auto;">
  //       <mock:shadow-root>
  //         <slot name="element">
  //           <button type="button" class="big primary">
  //             <slot></slot>
  //           </button>
  //         </slot>
  //       </mock:shadow-root>
  //       <a href="https://wikipedia.com">Link</button>
  //     </z-button>
  //   `);
  // });
});
