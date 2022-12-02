import Script from 'next/script'
import * as React from "react";
import Layout from '../components/layout'
import { accessToken } from '../lib/spotify';

export default function Backroom() {

    /* React.useEffect(() => {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            let element = document.getElementById('embed-iframe');
            let options = {
                width: '60%',
                height: '200',
                uri: 'spotify:track:2luWadHsYhuZJF54vw4bTb'
            };
            let callback = (EmbedController) => {
                document.querySelectorAll('ul#episodes > li > button').forEach(
                    episode => {
                        episode.addEventListener('click', () => {
                            EmbedController.loadUri(episode.dataset.spotifyId)
                        });
                    })
            };
            IFrameAPI.createController(element, options, callback);
        };



    }, []); */

    return (
        <Layout>
            <Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" />
            <div>
                <div>empty</div>
                {/* <iframe  src="https://open.spotify.com/embed/track/4KpjGfTqyHkLG4Yyhs6DGh?utm_source=generator"  loading="lazy"></iframe> */}
            </div>
        </Layout>


    )
}
