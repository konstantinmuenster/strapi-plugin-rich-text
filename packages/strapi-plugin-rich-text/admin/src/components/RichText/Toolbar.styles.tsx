import styled from "styled-components";

export const StyledToolbar = styled("div")`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-bottom: transparent;

  .toolbar-controls {
    padding: 1.5rem 1.5rem;
  }

  .is-active {
    background: ${({ theme }) => theme.colors.primary200};
  }

  div[role="combobox"] {
    min-width: 150px;
  }

  button {
    svg {
      height: 100%;
      width: 100%;
      flex-shrink: 0;
    }
    svg.extra-icon {
      height: 125%;
      width: 125%;

      path {
        fill: transparent !important;
      }
    }
  }
`;
