import styled,  { css } from "styled-components";
 
type RadioProps = {
  name?: string;
  items: { value: string, label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

const Container = styled.div`
 `;
const StyledInput = styled.input`
  background-color: transparent;
  height: 1rem;
  padding: 7px;
  width: 80%;
    font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border-radius: 50%;
  place-content: center;
  display: grid;

  &::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  background-color: CanvasText;
  }

  &:checked::before {
  transform: scale(1);
}
  &:focus {
   outline-offset: max(2px, 0.15em);
} 
`

export function Radio({ name, items, value, onChange }: RadioProps) {
 

    
const StyledLabel = styled.label`
  color:  ${({ theme }) => theme.colors.font  })};
`
  return (
    < >
      {items.map((item) => (
        <Container   key={item.value}>
          <StyledInput 
            name={name}
            type="radio"
            value={item.value}
            id={name + item.value}
            checked={value === item.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <StyledLabel htmlFor={name + item.value}>{item.label}</StyledLabel>
        </Container>
      ))}
    </>
  );
}
