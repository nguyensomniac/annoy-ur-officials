import React from "react";
import styled from 'styled-components';
import ReactGA from 'react-ga';
import Button from "./components/button";
import FormContainer from "./components/form-container";
import LabeledInput from "./components/labeled-input";

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

const getCurrentYear = () => {
  return new Date().getFullYear();
}

const Container = styled.div`
  background: #FFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    background: #F5F5F5;
  }
`

const Form = styled.div`
  width: 100%;
  background: #FFF;
  padding: 24px;
  @media (min-width: 1024px) {
    max-width: 784px;
    margin: auto;
    margin-top: 24px;
    border-radius: 24px;
    box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.22);
  }
`

const StyledTextarea = styled.textarea`
  font-family: inherit;
  font-size: 16px;
  border: 2px solid #CCCCCC;
  border-radius: 2px;
  padding: 8px 12px;
  &:focus {
    border: 2px solid #1300FF;
  }
  &::placeholder {
    color: #666;
  }
`

const Caption = styled.caption`
  font-size: 14px;
  color: #666;
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
      <Form>
        <h2>Magic links that open in your email client ✨</h2>
        <FormContainer>
          <LabeledInput label="To" name="to" placeholder="bdeblasio@cityhall.nyc.gov"/>
        </FormContainer>
        <FormContainer>
          <LabeledInput label="Subject" name="subject" placeholder="Feedback on proposed 2020 budget"/>
        </FormContainer>
        <FormContainer>
          <StyledTextarea rows="20" onChange={onChange} name="message" placeholder="Type your message here..."></StyledTextarea>
        </FormContainer>
        <Button onClick={onSubmit}>Create</Button>
        {renderShortLink()}
      </Form>
      <span style={{ width: "100%", margin: "16px 0", display: "inline-flex", flexDirection: "column"}}>
        <Caption>
          &copy; {getCurrentYear()}. Feedback? Tweet <a href="https://twitter.com/lily___digital">@lily___digital</a>.
        </Caption>
        <Caption>
          #BLM forever and always
        </Caption>
      </span>
    </Container>
  );
}

export default App;
