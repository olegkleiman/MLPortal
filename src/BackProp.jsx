import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';

import MathJax from 'react-mathjax';
import {Tex} from 'react-tex';

import BackPropImage from './assets/videos/backprop.mp4';
import ReactPlayer from 'react-player'

const BackProp = (props) => {

    const { t } = useTranslation();

    const [plaing, setPlaing] = useState(true)

    const tooglePlay = () => {
        setPlaing(!plaing)
    }

    return (
        <Grid container spacing={3}>
            <MathJax.Provider>
            <Grid item>
                <ReactPlayer url={BackPropImage} playing={plaing} onClick={tooglePlay} loop={true} 
                    width='500px'/>
                <div>Click on image to stop/continue playing</div>
            </Grid>
            <Grid  item xs>
                <Typography variant="body1">
                    {t('backprop.1')}
                    <Link to={'/grad'}>
                        {t('backprop.2')}
                    </Link>
                </Typography> 
                <Typography> 
                    {t('backprop.3')}
                </Typography>
                <br />
                <Typography>  
                    {t('backprop.4')} 
                    <Link to='/grad'>
                        {t('backprop.5')}
                    </Link>
                    {t('backprop.6')}
                </Typography> 
                <MathJax.Node formula={`E(X,\\theta)= \\frac{1}{2N}\\sum_{i=0}^N(\\hat{y}-y)^2`} />
                <Typography> 
                    {t('where')} <Tex texContent={`y_i`} /> {t('grad.7')}
                    <Tex texContent={`(\\vec{x_i}, y_i)`} /> {t('and') }
                    <Tex texContent={`\\hat{y}`} /> {t('grad.171')} <Tex texContent={`\\vec{x_i}`} />.
                </Typography>
                <MathJax.Node formula={`\\frac{\\partial E(X, \\theta)}{\\partial w^k_{ij}}=\\frac{1}{N}\\sum_{d=1}^N\\frac{\\partial}{\\partial w^k_{ij}}(\\frac{1}{2}(\\hat{y}_d-y)^2)=\\frac{1}{N}\\sum_{d=1}^N\\frac{\\partial E_d}{\\partial w^k_{ij}}`} />
                <Typography>
                    {t('where') } <Tex texContent={`S^k_j`} />
                    {t('grad.9')} <Tex texContent={`j`} /> {t('grad.10')} <Tex texContent={`k`} /> 
                    {t('grad.11')}
                </Typography>
                <Typography>
                    <Trans i18nKey='grad.12' />
                </Typography>
                <MathJax.Node formula={`\\delta^k_j = \\frac{\\partial E}{\\partial S^k_j}`} /> 
                <Typography>
                    {t('grad.13')}
                </Typography>
                <MathJax.Node formula={`\\frac{\\partial S^k_j}{\\partial w^k_{ij}}=\\frac{\\partial}{\\partial w^k_{ij}} (\\sum^{r_{k-1}}_{l=0} w^k_{lj} o^{k-1}_l)=o^{k-1}_{i}`} />
                <Typography>
                    {t('where')} <Tex texContent={`o^k_i`} />
                    {t('grad.14')} <Tex texContent={`i`} />
                    {t('grad.15')} <Tex texContent={`k`} />
                    {t('_and')} <Tex texContent={`r_k`} /> {t('grad.16')} <Tex texContent={`k`} />.
                </Typography>
                <Typography>
                    {t('thus')}
                </Typography>
                <MathJax.Node formula={`\\frac{\\partial E}{\\partial w^k_{ij}}=\\delta^k_jo^{k-1}_i`} />  
                <Typography>
                    {t('grad.17')} <Tex texContent={`\\delta^k_j`} /> 
                    {t('grad.18')} <Tex texContent={`j`}  />
                    {t('grad.10')} <Tex texContent={`k`} /> ,
                    {t('grad.19')} <Tex texContent={`o^{k-1}_i`} />
                    {t('grad.20')} <Tex texContent={`j`} />
                    {t('grad.15')} <Tex texContent={`k-1`} />!
                </Typography>
                <Typography>
                    {t('grad.21')} <Tex texContent={`w^k_{ij}`} /> 
                    {t('grad.22')} <Tex texContent={`i`}  />
                    {t('grad.10')} <Tex texContent={`k-1`}  />
                    {t('grad.23')} <Tex texContent={`j`}  />
                     {t('grad.10')} <Tex texContent={`k`}  />.
                </Typography>
                <Divider />
                <Typography>
                    {t('grad.24')}
                </Typography>                    

            </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default BackProp;