// flex
import React from 'react';
import { useTranslation, Trans } from "react-i18next";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';  

import {Tex} from 'react-tex';
import MathJax from 'react-mathjax';


const Bayes = () => {

    const { t } = useTranslation();

    return (
        <Grid container spacing={3} alignContent={'center'}>
            <MathJax.Provider>
                <Grid item xs>
                    <Typography variant="body1">
                        {t('bayes.1')}
                    </Typography>
                    <MathJax.Node formula={`\\label{theorem} p(x \\cap y) = p(x \\mid y)p(y)=p(y \\mid x)p(x)`} />
                    <Typography>
                        {t('bayes.2')} <Tex texContent={`p(y) \\neq 0`} /> 
                        {t('then')}
                    </Typography>
                    <MathJax.Node formula={`p(x \\mid y)=\\frac{p(x) p(y \\mid x)}{p(y)}`} />
                    <Typography>
                        {t('bayes.3')} <Tex texContent={`p(x \\mid y)`} />
                        {t('bayes.4')},  <Tex texContent={`p(x)`} />
                        {t('bayes.5')}, <Tex texContent={`p(y \\mid x)`} />
                        {t('bayes.6')} <Tex texContent={`x`} /> 
                        {t('bayes.7')} <Tex texContent={`y`} />.
                    </Typography>
                    <Typography>
                        {t('bayes.8')}:
                    </Typography>
                    <MathJax.Node formula={`p(x \\mid y) \\propto p(y \\mid x)`} />
                    <Typography>
                        {t('bayes.9')}.
                    </Typography>
                </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default Bayes;