import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => (props.isFocused ? "#1300FF" : "#CCCCCC")};
`;

const Input = styled.input`
  flex: 1 0 auto;
  outline: 0;
  border: 0;
  padding: 8px 12px;
  caret-color: #1300ff;
  font-size: 16px;
  &::placeholder {
    color: #666;
  }
`;

const Label = styled.div`
  flex: 0 0 auto;
  padding: 8px 12px;
  background-color: #f5f5f5;
  color: ${props => (props.isFocused ? "#000" : "#666")};
  font-weight: 600;
`;

const LabeledInput = ({ label, onFocus, onBlur, ...props }) => {
  const internalOnFocus = () => {
    setIsFocused(true);
    if (onFocus && typeof onFocus === "function") {
      onFocus();
    }
  };

  const internalOnBlur = () => {
    setIsFocused(false);
    if (onBlur && typeof onBlur === "function") {
      onBlur();
    }
  };

  const { onChange, name, placeholder } = props;
  const inputProps = {
    name,
    onChange,
    placeholder
  };

  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Container {...props} isFocused={isFocused}>
      <Label isFocused={isFocused}>{label}</Label>
      <Input
        {...inputProps}
        onFocus={internalOnFocus}
        onBlur={internalOnBlur}
      />
    </Container>
  );
};

export default LabeledInput;
