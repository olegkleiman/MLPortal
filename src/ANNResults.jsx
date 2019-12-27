// @flow
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography'; 
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
 weights: ?Array<number>
}

const ANNResults = (props: Props) => {
    const {weights} = props;
    if( weights == null ) 
        return null;

    const classes = useStyles();

    const [w0, w1, w2] = weights;
    const slope = (-w0-w1)/w2 
    const bias = -w0/w2

    const _weights = Array.from(weights); 

    const getSignedDigit = (x, digits = 4) => {
        const abs = Math.abs(x);
        return (Math.sign(x) == 1 ? '+' : '-') + abs.toFixed(digits);
    }

    return <>
            <Typography>
                y={getSignedDigit(slope)}*x{getSignedDigit(bias)}
            </Typography>
            <Table className={classes.table} stickyHeader>
                <TableHead>
                   <TableRow>
                    <TableCell align="center" colSpan={2}>Weights</TableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
                {
                    _weights.map( (w, index) => {
                        return <TableRow key={index}> 
                                <TableCell>w{index}</TableCell>
                                <TableCell align="left">{w}</TableCell>
                        </TableRow>
                    })
                }
                </TableBody>
            </Table>
        </>
        
}

export default ANNResults;