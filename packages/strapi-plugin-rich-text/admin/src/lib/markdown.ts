import MarkdownIt from "markdown-it";

export function createHTMLFromMarkdown(markdown: string): string {
  const markdownRenderer = MarkdownIt({ html: true, breaks: true });
  return markdownRenderer.render(markdown);
}
