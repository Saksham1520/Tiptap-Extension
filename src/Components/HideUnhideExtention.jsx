// HideUnhideExtension.jsx
import { Node, mergeAttributes } from "@tiptap/core";

const HideUnhide = Node.create({
  name: "hideUnhide",

  group: "block",
  content: "inline*",
  defining: true,

  addAttributes() {
    return {
      hidden: {
        default: false,
        parseHTML: (element) => element.hasAttribute("hidden"),
        renderHTML: (attributes) => {
          if (attributes.hidden) {
            return { hidden: true };
          }
          return {};
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[hidden]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleHidden:
        () =>
        ({ chain }) => {
          return chain()
            .toggleNode("hideUnhide", "hideUnhide", { hidden: true })
            .run();
        },
      showContent:
        () =>
        ({ chain }) => {
          return chain()
            .toggleNode("hideUnhide", "hideUnhide", { hidden: false })
            .run();
        },
    };
  },
});

export default HideUnhide;
