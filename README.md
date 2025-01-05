Here’s the README in English:

---

# Spotify Song Search

🎵 **Spotify Song Search** is a simple web app that allows users to search for songs on Spotify and view the search results in a user-friendly format.

## Description

This app uses **Node.js**, **Express**, and the **Spotify Web API** to search for songs on the Spotify platform. Users can enter a song title in a form, and the app will display results with information about the tracks, including the name, artist, album, album artwork, and a link to listen to the track on Spotify.

## Technologies Used

- **Node.js** - server-side platform
- **Express** - web framework for Node.js
- **Spotify Web API** - to interact with the Spotify platform
- **body-parser** - to handle form data
- **dotenv** - to securely store sensitive information in environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:zhannurr/SpotifySongFinder.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spotify-song-search
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add your Spotify API credentials:

   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and go to [http://localhost:8080](http://localhost:8080) to start using the app.

## Usage

1. Go to the homepage of the app.
2. Enter a song title in the search field.
3. Click the "Search" button to search for songs.
4. View the search results, including the song's name, artist, album, and a link to Spotify.
