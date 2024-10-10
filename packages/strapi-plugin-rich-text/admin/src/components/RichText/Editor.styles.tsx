import styled from "styled-components";

export const StyledEditor = styled("div")`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.neutral0};

  .tiptap {
    outline: none;
    overflow-y: auto;
    line-height: 1.25rem;
    color: ${({ theme }) => theme.colors.neutral800};
    min-height: 80px;
    max-height: 70vh;
    padding: 0 1.5rem 1.5rem 1.5rem;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.neutral150};
    border-top: transparent;

    > * + * {
      margin-top: 0.75em;
    }

    .ProseMirror-selectednode {
      position: relative;
      outline: none;
    }

    .ProseMirror-selectednode:after {
      content: "";
      position: absolute;
      left: -2px;
      right: -2px;
      top: -2px;
      bottom: -2px;
      border: 2px solid ${({ theme }) => theme.colors.neutral800};
      pointer-events: none;
      border-radius: 5px;
    }

    p:where(.warning, .success, .info, .danger) {
      border-radius: 0.5rem;
      padding: 1rem;
      margin-block: 1rem;
      word-break: break-word;
    }

    p.warning {
      color: rgba(242, 157, 65, 1);
      background: rgba(253, 244, 220, 1);
      text-align: center;
    }

    p.success {
      color: rgba(92, 177, 118, 1);
      background: rgba(234, 251, 231, 1);
      text-align: left;
    }

    p.info {
      color: rgba(102, 183, 241, 1);
      background: rgba(234, 245, 255, 1);
      text-align: left;
    }

    p.danger {
      color: rgba(238, 94, 82, 1);
      background: rgba(252, 236, 234, 1);
      text-align: center;
    }

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }

    ul,
    ol {
      margin-left: 1rem;
      padding: 0 1rem;

      > li > ul,
      > li > ol {
        margin-top: 0.5rem;
      }

      > * + * {
        margin-top: 0.5rem;
      }
    }

    ul {
      li {
        list-style: disc;
      }
    }

    ol {
      li {
        list-style: decimal;
      }
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.75em;
    }

    h3 {
      font-size: 1.5em;
    }

    h4 {
      font-size: 1.25em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    abbr[title] {
      text-decoration: underline dotted;
      cursor: help;
      text-decoration-skip-ink: none;
    }

    code {
      background: ${({ theme }) => theme.colors.neutral100};
      font-family: monospace;
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }

    pre {
      background: ${({ theme }) => theme.colors.neutral1000};
      color: ${({ theme }) => theme.colors.neutral0};
      font-family: monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid ${({ theme }) => theme.colors.neutral200};
      margin: 1rem 0;
    }

    hr {
      border: 0;
      border-top: 2px solid ${({ theme }) => theme.colors.neutral200};
      margin: 1rem 0;
    }

    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 1px solid ${({ theme }) => theme.colors.neutral300};
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: ${({ theme }) => theme.colors.neutral100};
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: ${({ theme }) => theme.colors.neutral200};
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: ${({ theme }) => theme.colors.primary500};
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }

    .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }

    [data-youtube-video],
    .video-wrapper {
      position: relative;
      width: 100%;
      height: 0px;
      padding-bottom: 56.25%;

      > iframe,
      > video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
  }
`;
