import styled from "styled-components";

export const StyledToolbar = styled("div")`
  .is-active {
    background: ${({ theme }) => theme.colors.primary200};
    color: ${({ theme }) => theme.colors.neutral0};
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
