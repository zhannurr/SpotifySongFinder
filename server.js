require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the Spotify API client
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

// Retrieve access token
spotifyApi.clientCredentialsGrant().then(
    data => spotifyApi.setAccessToken(data.body['access_token']),
    err => console.error('Error retrieving token', err)
);

// Homepage with a search form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Handle user search request
app.post('/search', async (req, res) => {
    try {
        const query = req.body.song;
        const data = await spotifyApi.searchTracks(query);
        const results = data.body.tracks.items.map(track => ({
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
            link: track.external_urls.spotify,
            image: track.album.images[0]?.url || ''  // Get album cover image
        }));
        

        let resultHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Spotify Search Results</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Search Results:</h1>
            <div class="results-container">
    `;
    
    results.forEach(song => {
        resultHtml += `
            <div class="track">
                <img src="${song.image}" alt="Album Cover">
                <p><strong>${song.name}</strong> - ${song.artist}</p>
                <p><em>Album: ${song.album}</em></p>
                <a href="${song.link}" target="_blank">Listen on Spotify</a>
            </div>
        `;
    });
    
    resultHtml += `</div></body></html>`;
    res.send(resultHtml);
    } catch (error) {
        res.status(500).send('Error searching for the song');
    }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
