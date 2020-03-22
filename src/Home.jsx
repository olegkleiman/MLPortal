import React from 'react';
import HomeVideo from './assets/videos/landing-hero-video.webm';
import HomePoster from './assets/images/landing-hero.png';

import Button from '@material-ui/core/Button';

const Home = (props) => {
    return (
        <div>
            <div>
                <video autoPlay loop muted preload="true" poster={HomePoster}
                        className='mlcc-landing-hero-video'>
                    <source src={HomeVideo} type="video/mp4"/>
                </video>
                <p class="course-description">Essential introduction to machine learning by Oleg Kleiman</p>
            </div>
            <div>
                <Button color="primary">Start</Button>
            </div>
        </div>
    )
}

export default Home;