import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';
import {Tex} from 'react-tex';

import BackPropImage from './assets/images/backprop.mp4';
import ReactPlayer from 'react-player'

const BackProp = (props) => {

    const { t } = useTranslation();

    const [plaing, setPlaing] = useState(true)

    const tooglePlay = () => {
        setPlaing(!plaing)
    }

    return (
        <Grid container spacing={3}>
            <Grid item>
                <ReactPlayer url={BackPropImage} playing={plaing} onClick={tooglePlay} loop={true} />
                <div>Click on image to stop/continue playing</div>
            </Grid>
            <Grid  item xs>
                <Typography variant="h6" gutterBottom>{t('BackProp')}</Typography>
                <Divider />
                <Typography variant="body1">
                    {t('backprop.1')}
                    <Link to={'/grad'}>
                        {t('backprop.2')}
                    </Link>
                </Typography> 
            </Grid>
        </Grid>
    )
}

export default BackProp;