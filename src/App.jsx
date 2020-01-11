/**
 * @flow
 */
import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { makeStyles, fade, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import GitHubIcon from '@material-ui/icons/GitHub';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";
import translations from './translations';
import AppDrawer from './AppDrawer';
import Home from './Home';
import Introduction from './Introduction';
import Classification from './Classification';
import Regression from './Regression';
import Gradient from './Gradient';
import BackProp from './BackProp';
import Graph from './Graph';
import ANN from './ANN';
import Bayes from './Bayes';

import topics from './assets/data/topics.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: "ru",
    debug: true,
    interpolation: {
      escapeValue: false,
      ransSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      format: function(value, format, lng) {
          if( format === 'uppercase') return value.toUpperCase();
          if( value instanceof Date) return moment(value).format(format);
          return value;
      }
    }
  })

const useStyles = makeStyles( theme => ({
    home: {
        textDecoration: 'none', 
        color:'white'
    },    
    topic: {
        flexGrow: 1,
        align: "center",
    },    
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
    },

  },    
})
)

const App = (props) => {

    const path = props.location.pathname;
    const topic = topics.filter( topic => {
        return topic.link == path;
    })
    const topicName = topic.length > 0 ? topic[0].title : ""

    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState('en');

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const drawerClosed = () => {
        setOpen(false)
    }

    const changeLanguage = (evt) => {
        
        const nextLanguage = language == 'ru' ? 'en' : 'ru';
        
        i18n.use(initReactI18next) 
            .init({lng: language});

        setLanguage(nextLanguage);    

    }

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Open drawer"
                            className={classes.menuButton}
                            edge="start"
                            onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Link to={'/'} className={classes.home}>
                    <Typography variant="h6" className={classes.title} >
                        {t('PortalName')}
                    </Typography>
                </Link>  
                <div className={classes.grow} />
                <Typography className={classes.topic}>
                    {t(topicName)}
                </Typography>
                <Button color="inherit" onClick={changeLanguage}>{language}</Button>
                <MLink href={'https://github.com/olegkleiman/MLPortal'} className={classes.home}
                    target="_blank">
                    <GitHubIcon  />
                </MLink>
            </Toolbar>
        </AppBar>
        <AppDrawer isOpen={open} openChanged={drawerClosed} />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/intro' component={Introduction} />
            <Route path='/classification' component={Classification} />
            <Route path='/regression' component={Regression} />
            <Route path='/grad' component={Gradient} />
            <Route path='/backprop' component={BackProp} />
            <Route path='/graph' component={Graph} />
            <Route path='/ann' component={ANN} />
            <Route path='/bayes' component={Bayes} />
        </Switch>
    </>
}

export default withRouter(App);