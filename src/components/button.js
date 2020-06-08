import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 8px 16px;
  background: #1300FF;
  color: white;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  width: max-content;
`

const Button = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledButton role="button" {...rest}>{children}</StyledButton>
  )
}

export default Button;