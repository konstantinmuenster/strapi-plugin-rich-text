import styled from "styled-components";
import { FILE_EXTENSION_COLORS } from "../../../lib/media";

export const StyledAttachment = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-style: solid;
  align-items: center;
  gap: 0.8rem;

  .file {
    display: flex;
    gap: 0.75rem;

    .filename {
      display: flex;
      flex-direction: column;
      color: ${({ theme }) => theme.colors.neutral900};

      span {
        color: ${({ theme }) => theme.colors.neutral500};
      }
    }
  }

  .options {
    > div {
      gap: 0.5rem;
      button {
        border-radius: 0.75rem;
        border: none;

        svg {
          width: 5rem;
          height: 5rem;

          path {
            fill: transparent !important;
          }
        }

        &.neutral {
          color: ${({ theme }) => theme.colors.neutral600};
        }

        &.danger {
          color: ${({ theme }) => theme.colors.danger600};
        }
      }
    }
  }
`;

export const ExtensionParagraph = styled.p<{
  extension: keyof typeof FILE_EXTENSION_COLORS;
}>`
  background-color: ${(props) => FILE_EXTENSION_COLORS[props.extension]};
  padding: 0.75rem 0.5rem;
  align-content: center;
  border-radius: 0.5rem;
  text-transform: uppercase;
  color: white;
  font-weight: 700;
`;
