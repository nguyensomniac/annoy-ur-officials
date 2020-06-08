import React from "react";
import "./App.css";
import Button from "./components/button";

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
          {shortenedLink}
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

  return (
    <>
      <span>To</span>
      <input onChange={onChange} name="to" type="text" />
      <span>Subject</span>
      <input onChange={onChange} name="subject" type="text" />
      <span>Message</span>
      <textarea onChange={onChange} name="message" type="text"></textarea>
      <Button onClick={onSubmit}>Submit</Button>
      {renderShortLink()}
    </>
  );
}

export default App;
