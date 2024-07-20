import { StyledCountDisplay } from "./CountDisplay.styles";

interface CountDisplayProps {
  characters: number;
  words: number;
  limit: number | undefined;
}

export default function CountDisplay({
  characters,
  limit,
  words,
}: CountDisplayProps) {
  const percentage = limit ? Math.round((100 / limit) * characters) : 0;

  return (
    <StyledCountDisplay
      className={characters === limit ? "character-count--warning" : ""}
    >
      {limit && (
        <svg height="20" width="20" viewBox="0 0 20 20">
          <circle r="10" cx="10" cy="10" fill="#eaeaef" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`${(percentage * 31.4) / 100} 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>
      )}
      {characters}
      {limit && ` / ${limit}`} characters
      <br />
      {words} words
    </StyledCountDisplay>
  );
}
