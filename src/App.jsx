import './App.css'
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const searchArtist = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      console.log("Searching for artist:", searchInput);
      // later you'll add your Spotify API logic here
    }
  };

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  return (
    <Container className="mt-5">
      <InputGroup>
        <FormControl
          placeholder="Search For Artist"
          type="input"
          aria-label="Search for an Artist"
          onKeyDown={searchArtist}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          style={{
            width: "300px",
            height: "35px",
            borderWidth: "3px",
            borderStyle: "solid",
            borderRadius: "5px",
            borderColor: "#1DB954",
            
            marginRight: "10px",
            paddingLeft: "10px",
          }}
        />

        <Button onClick={searchArtist}>Search</Button>
      </InputGroup>
    </Container>
  );
}

export default App;
