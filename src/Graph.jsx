import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';  


const Graph = (props) => {

    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item>
            </Grid>
            <Grid  item xs>
                <Typography variant="h6" gutterBottom>{t('Graph')}</Typography>
                <Divider />
                <Typography>
                    {t('graph.1')} 
                    <Link to={'/backprop'}>
                        {t('graph.2')}
                    </Link>
                </Typography>
                <Typography>
                    {t('graph.3')}
                </Typography>
             </Grid>   
        </Grid>
    )
}

export default Graph;