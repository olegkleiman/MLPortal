/**
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";

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

import topics from './assets/data/topics.json';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }, 
    content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },     
  }      
}))

type Props = {
    isOpen: boolean,
    openChanged: Function
}

const AppDrawer = (props: Props) => {

    const { t } = useTranslation();

    const {isOpen} = props;
    const callback = props.openChanged;

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(isOpen);
    const history = useHistory();

    useEffect( () => {
        setOpen(isOpen)
    }, [isOpen]); // Only re-run the effect if open state changes

    const handleDrawerClose = () => {
        setOpen(false);
        if( callback )
          callback()
    }

    const topicSelected = (evt) => {
      handleDrawerClose()
      history.push(`${evt.link}`);
    }

    return  <Drawer variant="persistent"
                anchor="left"
                open={open}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>            
            </div>
             <Divider />
             <List>
                {topics.map((topic, index) => (
                    <ListItem button key={topic.title} onClick={ () => topicSelected(topic)}>
                        <ListItemText primary={ t(topic.title) } />
                    </ListItem>
                ))}             
             </List>
        </Drawer>
}

export default AppDrawer;