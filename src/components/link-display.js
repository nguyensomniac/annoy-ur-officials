import React from 'react';
import styled from 'styled-components';
import Button from './button';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  border: 2px solid #CCC;
  align-items: center;
  margin: 16px 0;
`

const LinkText = styled.div`
  flex: 1 0 auto;
  user-select: all;
  font-size: 20px;
`

const LinkDisplay = ({ link }) => {
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(link);
    } else {
      console.log("You are using an outdated browser. Please upgrade.")
    }
  }
  return (
    <Container>
      <LinkText>{link}</LinkText>
      <Button onClick={copyToClipboard}>Copy</Button>
    </Container>
  )
}

export default LinkDisplay;