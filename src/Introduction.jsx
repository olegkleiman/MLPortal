import React from 'react';
import { useTranslation, Trans } from "react-i18next";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,      
  }
}));

const Introduction = (props) => {

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div  className={classes.root}>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">     
                <Typography className={classes.heading}>{t('Intro')}</Typography>   
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ul>
                    <li>
                        <Typography>
                            <Trans i18nKey='intro.terms.1' />
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <Trans i18nKey='intro.terms.2' />
                        </Typography>
                    </li>
                </ul>
            </ExpansionPanelDetails>    
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary 
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header">
                <Typography className={classes.heading}>{t('Basic')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    <Grid item xs>
                    {t('intro.1')}
                    </Grid> 
                </Grid>            
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    )
}

export default Introduction;