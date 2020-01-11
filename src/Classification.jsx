// @flow
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, YAxis, XAxis, 
        VerticalGridLines,
        HorizontalGridLines,
        MarkSeries, LineSeries, LabelSeries} from 'react-vis';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';  

import {Tex} from 'react-tex';
import MathJax from 'react-mathjax';

import Perceptron from './Perceptron';
import * as ActivationFunctions from './ActivationFunctions';
import ANNResults from './ANNResults';

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

let data = [];

// let data = [{x:1, y:6},
//                 {x:6,y:2},
//                 {x:7,y:7},
//                 {x:7,y:0},
//                 {x:9,y:1},
//                 {x:7,y:3},
//                 {x:2,y:10},
//                 {x:0,y:5},
//                 {x:4,y:6}];
let labels = [];

// data.forEach( (el) => {
//     let label = (el.x < el.y) ? 1 : 0;
//     labels.push(label)
// })

for(let i of range(0, 100)) {
    const x = Math.round(Math.random() * 50)
    const y = Math.round(Math.random() * 50)
    data.push( {x,y} );
    let label = x < y ? 1 : 0;
    labels.push(label)
}

const dataClassA = data.filter( point => {
    return point.x < point.y
})
const dataClassB = data.filter( point => {
    return point.x >= point.y
})

const activationFunctions = [{
        value: 'sigmoid',
        label: 'sigmoid',
        func: ActivationFunctions.sigmoid
    }, {
        value: 'tanh',
        label: 'tanh',
        func: ActivationFunctions.tanh
    }, {
        value: 'ReLU',
        label: 'ReLU',
        func: ActivationFunctions.relu
    }
]

const Classification = () => {

    const { t } = useTranslation();

    const [lineData, setLineData] = useState()
    const [weights, setWeights] = useState();
    const [activationFunctionName, setActivationFunctionName] = useState(activationFunctions[0].value);

    const reStart = (ev) => {
        console.log(ev)
    }

    const valueClick = (datapoint, event) => {
        console.log(datapoint);
    }

    const classify = () => {
        const x_data = data.map( item => [1, item.x] )
        const y_data = data.map( item => [item.y] )
        const _data = data.map( item => [1, item.x, item.y])
        const _activationFunction = activationFunctions.find( item => {
            return activationFunctionName == item.label ? true : false
        }) 
        const sigmoid = ActivationFunctions.SIGMOID;
        const p = new Perceptron(sigmoid, 2);
        p._train(_data, labels, redraw);
    }

    const redraw = async (coefficients) => {
        const weights = await coefficients;
        
        const [bias, w1, w2] = weights;
        setWeights(weights);
        const _lineData = [
            {x: 0, y: -bias/w2},
            {x: 50, y: -w1*50/w2}
        ];
        
        setLineData(_lineData)
    }

    const onActivationFunctionChanged = event => {
        setActivationFunctionName(event.target.value)
    }

    return (
        <Grid container spacing={3} alignContent={'center'}
            >
            <MathJax.Provider>
            <Grid item xs={5}>
                <Box>
                <TextField 
                    value={activationFunctionName}
                    label={t('select')}
                    select
                    onChange={onActivationFunctionChanged}
                    helperText={t('activation_function')}
                    >
                    {
                        activationFunctions.map( (item, index) => {
                            return <MenuItem key={index} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                        })
                    }
                </TextField>    
                </Box>
                <XYPlot height={400} width={400}>
                    <MarkSeries animation={'noWobble'}
                                className="responsive-vis-scatterplot"
                                colorType="literal"
                                color='green'
                                onValueClick={ (datapoint, event) => valueClick(datapoint, event) }
                                data={dataClassA} />
                    <MarkSeries animation={'noWobble'}
                                className="responsive-vis-scatterplot"
                                colorType="literal"
                                color='blue'
                                onValueClick={ (datapoint, event) => valueClick(datapoint, event) }
                                data={dataClassB} />                            
                    <LineSeries data={lineData} color='red'/> 
                    <VerticalGridLines />
                    <HorizontalGridLines />                          
                    <XAxis />        
                    <YAxis />                    
                </XYPlot>
                <Button variant="outlined" color="primary"
                        onClick={ () => classify() }>{t('solve')}</Button>
                <Button variant="outlined" color="primary"
                    onClick={ (ev) => reStart(ev)}>{t('classification.shuffle')}
                </Button>
                <ANNResults weights={weights} />
            </Grid>
            <Grid item xs={7}>
                <Typography variant="body1">
                    <Trans i18nKey="classification.1">
                        {t('classification.1')}
                    </Trans>
                </Typography> 
                <MathJax.Node formula={`E=\\frac{1}{n} \\sum(y-\\hat y)^2`} />
                <Typography>
                    {t('where') } 
                    <Tex texContent={`\\hat y`} /> 
                    {t('classification.2') }
                    {t('and') } 
                    <Tex texContent={`y`} /> 
                    {t('classification.3') } 
                </Typography>
                <Typography>
                    {t('classification.4') }
                    <Tex texContent={`J(w)`} />
                </Typography>
                <Typography>
                    {t('classification.41') }
                </Typography>
                <Tex texContent={`J'(w)=0`} />
                <Typography>
                    {t('classification.42') }  
                    <Link to={'/grad'}>
                        {t('classification.43') }
                    </Link>
                </Typography>  
                <Typography>
                    {t('classification.44')}
                </Typography>
            </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default Classification;