import {html} from "lit";
import {ICONS} from "../../../constants/iconset";
import {type ClassInfo, classMap} from "lit/directives/class-map.js";
import "../../z-icon/index";
import "./index.stories.css";

export default {
  title: "ZLink",
  argTypes: {
    "colorVariant": {
      options: ["default", "z-link-black", "z-link-white"],
      control: {
        type: "inline-radio",
      },
    },
    "icon": {
      options: [null, ...Object.keys(ICONS)],
      control: {
        type: "select",
        labels: {
          null: "No icon",
        },
      },
    },
    "z-link-icon": {
      if: {
        arg: "icon",
        truthy: true,
      },
    },
  },
  args: {
    "colorVariant": "default",
    "text": "Zanichelli.it",
    "icon": null,
    "z-link-active": false,
    "z-link-inverse": false,
    "z-link-disabled": false,
    "z-link-underline": false,
    "z-link-icon": false,
    "z-link-sb": false,
  },
};

const getClasses = (args): ClassInfo => ({
  "z-link": true,
  "z-link-black": args.colorVariant === "z-link-black",
  "z-link-white": args.colorVariant === "z-link-white",
  "z-link-active": args["z-link-active"],
  "z-link-inverse": args["z-link-inverse"],
  "z-link-disabled": args["z-link-disabled"],
  "z-link-underline": args["z-link-underline"],
  "z-link-icon": args["z-link-icon"],
  "z-link-sb": args["z-link-sb"],
});

export const ZLink = {
  render: (args) => html`
    <div class="z-link-story">
      <a
        href="zanichelli.it"
        class=${classMap(getClasses(args))}
      >
        ${args.icon ? html`<z-icon name=${args.icon}></z-icon>` : ""} ${args.text}
      </a>
    </div>
  `,
};

export const ZLinkButton = {
  render: (args) => html`
    <div class="z-link-story">
      <button class=${classMap(getClasses(args))}>
        ${args.icon ? html`<z-icon name=${args.icon}></z-icon>` : ""} ${args.text}
      </button>
    </div>
  `,
};
