import React from "react";
import styled from 'styled-components';
import ReactGA from 'react-ga';
import "./App.css";
import Button from "./components/button";
import FormContainer from "./components/form-container";

const getShortenedLink = async longLink => {
  try {
    const reqBody = JSON.stringify({
      link: longLink
    });
    const request = await fetch("/api/shorten-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: reqBody
    });
    const data = await request.json();
    if (request.ok) {
      const { shortLink } = data;
      return shortLink;
    } else {
    }
  } catch (e) {}
  return null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`

const StyledTextarea = styled.textarea`
  font-family: inherit;
`

function App() {
  const [emailData, setEmailData] = React.useState({
    to: "",
    subject: "",
    message: ""
  });

  const [shortenedLink, setShortenedLink] = React.useState("");

  const onChange = e => {
    const {
      target: { name, value }
    } = e;
    console.log(e);
    setEmailData({
      ...emailData,
      [name]: value
    });
  };

  const renderShortLink = () => {
    if (shortenedLink) {
      return (
        <>
          <h3>Your Short Link</h3>
          <a href={shortenedLink} target="_blank" rel="noopener noreferrer">{shortenedLink}</a>
        </>
      );
    }
  };

  const onSubmit = async () => {
    const { to, subject, message } = emailData;
    const longurl = `mailto:${encodeURIComponent(
      to
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      message
    )}`;
    const sl = await getShortenedLink(longurl);
    if (sl) {
      setShortenedLink(sl);
    }
  };

  React.useEffect(() => {
    ReactGA.initialize('UA-110467566-2');
    ReactGA.pageview("/");
  })

  return (
    <Container>
      <FormContainer>
        <strong>To</strong>
        <input onChange={onChange} name="to" type="text" />
      </FormContainer>
      <FormContainer>
        <strong>Subject</strong>
        <input onChange={onChange} name="subject" type="text" />
      </FormContainer>
      <FormContainer>
        <strong>Message</strong>
        <StyledTextarea rows="20" onChange={onChange} name="message"></StyledTextarea>
      </FormContainer>
      <Button onClick={onSubmit}>Submit</Button>
      {renderShortLink()}
    </Container>
  );
}

export default App;
