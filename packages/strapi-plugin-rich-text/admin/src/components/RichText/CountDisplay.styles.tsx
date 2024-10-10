import styled from "styled-components";

export const StyledCountDisplay = styled("div")`
  align-items: center;
  justify-content: flex-end;
  color: rgba(102, 102, 135, 1);
  display: flex;
  font-size: 0.75rem;
  gap: 0.5rem;
  margin: 1.5rem;

  svg {
    color: rgba(73, 69, 255, 1);
  }

  &--warning,
  &--warning svg {
    color: rgba(208, 43, 32, 1);
  }
`;
