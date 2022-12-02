import { getNowPlaying } from '../../lib/spotify';

export default async (_, res) => {
    const response = await getNowPlaying();
    const { items } = await response.json();
    /* console.log('now-playing' ,items) */
    /* const tracks = items.slice(0, 10).map((track) => ({
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name
    })); */

    return res.status(200).json({ items });
};