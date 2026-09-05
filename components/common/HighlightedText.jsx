import styled from 'styled-components';

const HighlightedText = styled.span`
  position: relative;
  -webkit-text-fill-color: #0000;
  background: linear-gradient(120deg, #7541FF, #5412FF);
  -webkit-background-clip: text;
  background-clip: text;
  color: #652AFF;
  text-shadow: 0 0 1em #652AFF4d;
`;

export default HighlightedText;
