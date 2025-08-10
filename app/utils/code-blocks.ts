import visit from "unist-util-visit";
import { CodeTitleOptions, Tree, CodeNode, TitleNode } from "../types";

export function codeTitle(options?: CodeTitleOptions) {
  return (tree: Tree) =>
    visit(tree, "code", (node: CodeNode, index: number) => {
      const nodeLang = node.lang || "";
      let language = "",
        title = "";

      if (nodeLang.includes(":")) {
        language = nodeLang.slice(0, nodeLang.search(":"));
        title = nodeLang.slice(nodeLang.search(":") + 1, nodeLang.length);
      }

      if (!title) {
        return;
      }

      const className = "remark-code-title";
      let langIcon = "";

      switch (language) {
        case "ts":
          langIcon = '<i class="devicon-typescript-plain"></i>';
          break;
        case "js":
          langIcon = '<i class="devicon-javascript-plain"></i>';
          break;
        case "bash":
          langIcon = '<i class="devicon-bash-plain"></i>';
          break;
        case "mysql":
          langIcon = '<i class="devicon-mysql-plain"></i>';
          language = "bash";
          break;
        case "json":
          if (title === "package.json") {
            langIcon = '<i class="devicon-nodejs-plain"></i>';
          } else {
            langIcon = "";
          }
          break;
      }

      const titleNode: TitleNode = {
        type: "html",
        value: `
          <div class="${className}">
            ${langIcon}  ${title}
          </div>
        `.trim(),
      };

      if (tree.children[index].type === "code") {
        tree.children.splice(index, 0, titleNode);
        node.lang = language;
      }
    });
}

export async function copyCode(block: Element | null): Promise<void> {
  if (block) {
    let code = block.querySelector("code");
    if (code) {
      let text = code.textContent || "";
      await navigator.clipboard.writeText(text);
    }
  }
}
