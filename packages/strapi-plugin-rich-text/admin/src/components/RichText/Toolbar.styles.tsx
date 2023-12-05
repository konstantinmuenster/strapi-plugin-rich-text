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

  &.floating {
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    background: ${({ theme }) => theme.colors.neutral100};
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  button {
    svg {
      height: 100%;
      width: 100%;

      rect {
        height: 3px;
        fill: ${({ theme }) => theme.colors.neutral700};
      }
    }
  }
`;
