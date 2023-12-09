import styled from "styled-components";

export const StyledEditor = styled("div")`
  margin-top: 10px;

  .tiptap {
    outline: none;
    line-height: 1.25rem;
    color: ${({ theme }) => theme.colors.neutral800};
    min-height: 80px;
    padding: 1rem 0.5rem;

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

    pre {
      background: #0d0d0d;
      color: #fff;
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

    [data-youtube-video] {
      position: relative;
      width: 100%;
      height: 0px;
      padding-bottom: 56.25%;

      > iframe {
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
