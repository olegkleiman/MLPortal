/* flow */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

type Props = {
    title: string,
    description: string
}

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const Sidebar = ({content}) => {

    const { title, description, topics } = content;
    const classes = useStyles();

    return (
        <Grid item xs={4} md={4}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
                {
                    topics.map( (topic, index) => {
                        return <Link key={index}
                                     href={`#regression/#${topic.link}`}>
                                    <Typography>{topic.title}</Typography>
                                </Link>
                    })
                }
            </Paper>
        </Grid>
    )
}

export default Sidebar;