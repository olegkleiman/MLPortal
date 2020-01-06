// @flow
import React from 'react';
import { useTranslation, Trans } from "react-i18next";

import MathJax from 'react-mathjax';
import {Tex} from 'react-tex';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PerceptronImage from './assets/images/perceptron.png'

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '12px',
        marginRigth: '8px',
        marginTop: '12px'
    }
}));

const ANN = () => {

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid container fixed='true' className={classes.root}>
            <MathJax.Provider>
                <Grid item xs={8} > 
                    <Typography>
                    {t('ann.1')}
                    </Typography>
                    <img src={PerceptronImage} />
                </Grid>
                <Grid item xs>
                </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default ANN;