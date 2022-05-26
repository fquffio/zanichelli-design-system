import { newSpecPage } from "@stencil/core/testing";

import { ZFile } from "./index";

describe("Suite test ZFile", () => {
  it("Test render ZFile vuoto", async () => {
    const page = await newSpecPage({
      components: [ZFile],
      html: `<z-file></z-file>`,
    });
    // mock HTMLInputElement focus function
    HTMLInputElement.prototype.focus = jest.fn();

    expect(page.root).toEqualHtml(`
    <z-file>
       <z-chip filter="" id="chip-undefined" type="default">
         <div class="chip-content">
          <span class="body-3-sb" tabindex="-1"></span>
           <z-icon aria-label="Elimina file" height="15" name="multiply-circled" tabindex="0" width="15"></z-icon>
         </div>
       </z-chip>
      </z-file>
    `);
  });

  it("Test render ZFile with props", async () => {
    const page = await newSpecPage({
      components: [ZFile],
      html: `<z-file file-number="123" file-name="filename.png"></z-file>`,
    });
    // mock HTMLInputElement focus function
    HTMLInputElement.prototype.focus = jest.fn();

    expect(page.root).toEqualHtml(`
    <z-file file-number="123" file-name="filename.png">
       <z-chip filter="" id="chip-123" type="default">
         <div class="chip-content">
          <span class="body-3-sb" tabindex="-1">filename.png</span>
           <z-icon aria-label="Elimina file" height="15" name="multiply-circled" tabindex="0" width="15"></z-icon>
         </div>
       </z-chip>
      </z-file>
    `);
  });
});
