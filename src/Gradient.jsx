import React from 'react';
import { useTranslation, Trans } from "react-i18next";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';

import {Tex} from 'react-tex';

const Gradient = (props) => {

    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item>
            </Grid>
            <Grid  item xs>
                <Typography variant="h6" gutterBottom>{t('GradientDescent')}</Typography>
                <Divider />
                <Typography variant="body1">
                    {t('grad.1')}
                </Typography> 
                <Tex texContent={'\\vec\\theta^{t+1} = \\theta^t - \\alpha \\dfrac{\\partial E(x, \\theta^t)}{\\partial \\theta}'}/>
                <Typography variant="body1">
                   {t('where')} <Tex texContent={`\\vec \\theta`} /> {t('grad.2')}
                   <Tex texContent={`t+1`} /> {t('grad.3')}.
                </Typography>
                <Typography>
                    {t('grad.4') } <Tex texContent={`\\vec \\theta`} />
                    {t('grad.5') } <Tex texContent={`\\vec \\theta=[w_0,w_1,...,w_n]`} />
                    {t('then') }
                </Typography>
                <Tex texContent={`w^k_{i+1}=w^k_i-\\alpha \\frac{\\partial E}{\\partial w^k}`} />
                <Typography>
                    {t('grad.6') }:
                </Typography>
                <Typography>
                    <Tex texContent={`E(X,\\theta)= \\frac{1}{2N}\\sum_{i=0}^N(\\hat{y}-y)^2`} />
                </Typography>
                <Typography>
                    {t('where') } 
                    <Tex texContent={`y_i`} />
                    {t('grad.7') }
                    <Tex texContent={`(\\vec{x_i}, y_i)`} /> {t('and') }
                    <Tex texContent={`\\hat{y}`} /> {t('grad.18')} <Tex texContent={`\\vec{x_i}`} />.
                </Typography>
                <Typography>
                  {t('thus')}:
                </Typography>
                <Tex texContent={`\\frac{\\partial E(X, \\theta)}{\\partial w^k_{ij}}=\\frac{1}{N}\\sum_{d=1}^N\\frac{\\partial}{\\partial w^k_{ij}}(\\frac{1}{2}(\\hat{y}_d-y)^2)=\\frac{1}{N}\\sum_{d=1}^N\\frac{\\partial E_d}{\\partial w^k_{ij}}`} />
                <Typography>
                  {t('grad.8')}:
                </Typography>
                <Tex texContent={`\\frac{\\partial E}{\\partial w^k_{ij}}=\\frac{\\partial E}{\\partial S^k_j} \\frac{\\partial S^k_j}{\\partial w^k_{ij}}`} />,
                <Typography>
                    {t('where') } <Tex texContent={`S^k_j`} />
                    {t('grad.9')} <Tex texContent={`j`} /> {t('grad.10')} <Tex texContent={`k`} /> 
                    {t('grad.11')}
                </Typography>
                <Typography>
                    {t('grad.12')}
                </Typography>
                <Tex texContent={`\\delta^k_j = \\frac{\\partial E}{\\partial S^k_j}`} />
                <Typography>
                    {t('grad.13')}
                </Typography>
                <Tex texContent={`\\frac{\\partial S^k_j}{\\partial w^k_{ij}}=\\frac{\\partial}{\\partial w^k_{ij}} (\\sum^{r_{k-1}}_{l=0} w^k_{lj} o^{k-1}_l)=o^{k-1}_{i}`} />
                <Typography>
                    {t('where')} <Tex texContent={`o^k_i`} />
                    {t('grad.14')} <Tex texContent={`i`} />
                    {t('grad.15')} <Tex texContent={`k`} />
                    {t('_and')} <Tex texContent={`r_k`} /> {t('grad.16')} <Tex texContent={`k`} />.
                </Typography>
                <Typography>
                    {t('thus')}
                </Typography>
                <Tex texContent={`\\frac{\\partial E}{\\partial w^k_{ij}}=\\delta^k_jo^{k-1}_i`} />  
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
        </Grid>
    )
}

export default Gradient;