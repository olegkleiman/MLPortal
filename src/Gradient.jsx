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
                <img src='http://rasbt.github.io/mlxtend/user_guide/general_concepts/gradient-optimization_files/ball.png'
                    height='200px'/>
            </Grid>
            <Grid  item xs>
                <Typography variant="body1">
                    {t('grad.1')}
                </Typography> 
                <div>
                    <Tex texContent={'\\vec\\theta^{i+1} = \\theta^i - \\alpha \\dfrac{\\partial E(x, \\theta^i)}{\\partial \\theta}'}/> 
                    <div style={{float: 'right'}}>[1]</div>
                </div>
                <Typography variant="body1">
                   {t('where')} <Tex texContent={`\\vec \\theta`} /> {t('grad.2')}
                   <Tex texContent={`i+1`} /> {t('grad.3')} 
                   ,{t('_and')} <Tex texContent={`\\alpha`} /> {t('grad.41')}.
                   {t('grad.42')} 
                </Typography>
                <Tex texContent={`\\lVert \\nabla f'(x) - \\nabla f'(y) \\rVert \\leq L \\lVert x - y \\rVert`}/>
                <Typography>
                {t('where')} <Tex texContent={'L'} /> - {t('grad.25')} <Tex texContent={`f''(x)`} /> 
                {t('thus')} {t('so_that')} <Tex texContent={`\\alpha < \\frac{2}{L}`} />
                {t('grad.26')} <Tex texContent={`f(x)`} />.
                </Typography>
                <Typography>
                    {t('grad.4') } <Tex texContent={`\\vec \\theta`} />
                    {t('grad.5') } <Tex texContent={`\\vec \\theta=[w_0,w_1,...,w_n]`} />
                    {t('then') }
                </Typography>
                <Tex texContent={`w^k_{i+1}=w^k_i-\\alpha \\frac{\\partial E}{\\partial w^k}`} />
                <Typography>
                    {t('grad.43')}
                    <a href='https://arxiv.org/abs/1811.03804'>{t('grad.44')}</a>
                    {t('grad.45')},
                </Typography>
                <Typography>
                    {t('grad.71')} <Tex texContent={`\\theta^i`} />.
                </Typography>

            </Grid>
        </Grid>
    )
}

export default Gradient;