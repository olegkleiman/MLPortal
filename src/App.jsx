/**
 * @flow
 */
import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";
import translations from './translations';
import AppDrawer from './AppDrawer';
import Home from './Home';
import Classification from './Classification';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

const App = (props) => {

    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Open drawer"
                            edge="start"
                            onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                    <Typography variant="h6" noWrap>
                        {t('PortalName')}
                    </Typography>
                </Link>                              
            </Toolbar>
        </AppBar>
        <AppDrawer isOpen={open} />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/class' component={Classification} />
        </Switch>
    </>
}

export default withRouter(App);