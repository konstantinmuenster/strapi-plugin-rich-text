import styled from "styled-components";

export const StyledToolbar = styled("div")`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-bottom: transparent;

  .is-active {
    background: ${({ theme }) => theme.colors.primary200};
    color: ${({ theme }) => theme.colors.neutral0};
  }

  div[role="combobox"] {
    min-width: 150px;
  }

  button {
    svg {
      height: 100%;
      width: 100%;
      flex-shrink: 0;

      rect {
        height: 3px;
        fill: ${({ theme }) => theme.colors.neutral700};
      }
    }
    svg.extra-icon {
      height: 125%;
      width: 125%;

      #bulb {
        fill: ${({ theme }) => theme.colors.neutral100} !important;
      }
    }
  }
`;
