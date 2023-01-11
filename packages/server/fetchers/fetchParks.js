import fetch from "node-fetch";

export default async function fetchParks(apiKey) {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&limit=1000`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        },
      }
    );
    const json = await response.json();
    json.name = json.fullName;
    delete json.fullName;

    return json;
  } catch (error) {
    console.log(`Sorry, unable to fetch parks because ${error}`);
  }
}
