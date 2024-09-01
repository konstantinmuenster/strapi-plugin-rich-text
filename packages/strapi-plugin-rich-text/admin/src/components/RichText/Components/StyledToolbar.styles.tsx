import styled from "styled-components";

export const StyledToolbar = styled("div")`
  .is-active {
    background: ${({ theme }) => theme.colors.primary200};
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
