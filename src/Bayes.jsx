// flex
import React from 'react';
import { useTranslation, Trans } from "react-i18next";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {Tex} from 'react-tex';
import MathJax from 'react-mathjax';

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const Bayes = () => {

    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container spacing={3} alignContent={'center'}>
            <MathJax.Provider>
                <Grid item xs={8}>
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
                        {t('bayes.4')} <Tex texContent={`x`} />, <Tex texContent={`p(x)`} />
                        {t('bayes.5')}, <Tex texContent={`p(y \\mid x)`} />
                        {t('bayes.6')} <Tex texContent={`x`} /> 
                        {t('bayes.7')} <Tex texContent={`y`} />.
                    </Typography>
                    <Typography>
                         <Tex texContent={`p(y)`} />{t('bayes.10')}.
                    </Typography>    
                    <MathJax.Node formula={`p(y) = \\sum^N_{i=1} p(x_i) p(y \\mid x_i)`} />
                    <Typography>
                        {t('and')} {t('thus')}
                    </Typography>
                    <MathJax.Node formula={`p(x_i \\mid y) = \\frac{p(x_i) p(y \\mid x_i)}{\\sum^N_{i=1} p(x_i) p(y \\mid x_i)}`} />
                    <Typography> 
                        {t('bayes.8')}:
                    </Typography>
                    <MathJax.Node formula={`p(x \\mid y) \\propto p(y \\mid x)`} />
                    <Typography>
                        {t('bayes.9')}.
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Paper elevation={0} className={classes.sidebarAboutBox}>
                        <Typography variant="h6" gutterBottom>
                            {t('sample')}
                        </Typography>
                        <Typography>
                            {t('bayes.sample.1')}
                        </Typography>
                    </Paper>   
                </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default Bayes;