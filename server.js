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
            link: track.external_urls.spotify
        }));

        let resultHtml = '<h1>Search Results:</h1>';
        results.forEach(song => {
            resultHtml += `
                <p><strong>${song.name}</strong> - ${song.artist} (Album: ${song.album})</p>
                <a href="${song.link}" target="_blank">Listen on Spotify</a>
                <hr>
            `;
        });

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
