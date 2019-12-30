import React from 'react';
import { useTranslation } from "react-i18next";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';

const Introduction = (props) => {

    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item xs>
            {t('Intro')}
            </Grid> 
        </Grid>
    )
}

export default Introduction;