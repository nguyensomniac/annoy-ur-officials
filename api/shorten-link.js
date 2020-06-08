import fetch from "node-fetch";

const URL_SHORTENER_ENDPOINT = "https://tinyurl.com/api-create.php";

// POST REQUEST /api/shorten-link
// BODY:
//    link: string (must start with mailto:)
export default async (req, res) => {
  try {
    const {
      body: { link }
    } = req;
    const escapedLink = encodeURIComponent(link);
    console.log(escapedLink);
    const urlShortenerRequest = await fetch(
      `${URL_SHORTENER_ENDPOINT}?url=${escapedLink}`,
      {
        method: "GET"
      }
    );
    const data = await urlShortenerRequest.text();
    if (urlShortenerRequest.ok) {
      res.status(200).json({
        shortLink: data
      });
    } else {
      res
        .status(urlShortenerRequest.status)
        .json({ error: `Error from TinyURL API: ${data}` });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
