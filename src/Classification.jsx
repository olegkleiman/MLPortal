// @flow
import React, {useState} from 'react';
import { useTranslation, Trans } from "react-i18next";
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, YAxis, XAxis, 
        VerticalGridLines,
        HorizontalGridLines,
        MarkSeries, LineSeries, LabelSeries} from 'react-vis';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';  

import {Tex} from 'react-tex';

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

for(let i of range(0, 8)) {
    const x = Math.round(Math.random() * 10)
    const y = Math.round(Math.random() * 10)
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

const Classification = () => {

    const { t } = useTranslation();

    const [lineData, setLineData] = useState()
    const [weights, setWeights] = useState();

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
        const p = new Perceptron(ActivationFunctions.sigmoid, 2);
        p._train(_data, labels, redraw);
    }

    const redraw = async (coefficients) => {
        const weights = await coefficients;
        
        const [bias, w1, w2] = weights;
        setWeights(weights);
        const _lineData = [
            {x: 0, y: -bias/w2},
            {x: 8, y: (-bias - w1*8)/w2}
        ];
        
        setLineData(_lineData)
    }

    return (
        <Grid container spacing={3}>
            <Grid item>
                <XYPlot height={300} width={300}>
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
                        onClick={ () => classify() }>{t('classification.solve')}</Button>
                <Button variant="outlined" color="primary"
                    onClick={ (ev) => reStart(ev)}>{t('classification.shuffle')}
                </Button>
                <ANNResults weights={weights} />
            </Grid>
            <Grid item xs>
                <Typography variant="h6" gutterBottom>{t('Classification')}</Typography>
                <Divider />
                <Typography variant="body1">
                    <Trans i18nKey="classification.1">
                        {t('classification.1')}
                    </Trans>
                </Typography> 
                <Typography variant="body1" gutterBottom>
                    {t('classification.5')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <Tex texContent={'\\vec\\theta^{t+1} = \\theta^t - \\alpha \\dfrac{\\partial E(x, \\theta^t)}{\\partial \\theta}'}/>
                </Typography>                    
                <Typography variant="body1" gutterBottom>
                    {t('classification.6')}
                </Typography>
                <Typography>
                    {t('classification.7') } <Tex texContent={`\\vec \\theta`} />
                    {t('classification.8') } <Tex texContent={`\\vec \\theta=[w_0,w_1,...,w_n]`} />
                    {t('classification.then') }
                </Typography>
                <Typography>
                    <Tex texContent={`w^k_{i+1}=w^k_i-\\alpha \\frac{\\partial E}{\\partial w^k}`} />
                </Typography>
                <Typography>
                    {t('classification.10') }:
                </Typography>
                <Typography>
                    <Tex texContent={`E(X,\\theta)= \\frac{1}{2N}\\sum_{i=0}^N(\\hat{y}-y)^2`} />
                </Typography>
                <Typography>
                    {t('classification.where') } 
                    <Tex texContent={`y_i`} />
                    {t('classification.11') }
                    <Tex texContent={`(\\vec{x_i}, y_i)`} /> {t('classification.and') }
                    <Tex texContent={`\\hat{y}`} /> {t('classification.12')} <Tex texContent={`\\vec{x_i}`} />.
                </Typography>
                <Typography>
                  {t('classification.thus')}:
                </Typography>
                <Typography>
                    <Tex texContent={`\\frac{\\partial E(X, \\theta)}{\\partial w^k_{ij}}=\\frac{1}{N}\\sum_{d=1}^N\\frac{\\partial}{\\partial w^k_{ij}}(\\frac{1}{2}(\\hat{y}_d-y)^2)=\\frac{1}{N}\\sum_{d=1}^N\\frac{\\partial E_d}{\\partial w^k_{ij}}`} />
                </Typography>
                <Typography>
                  {t('classification.13')}:
                </Typography>
                <Typography>
                    <Tex texContent={`\\frac{\\partial E}{\\partial w^k_{ij}}=\\frac{\\partial E}{\\partial S^k_j} \\frac{\\partial S^k_j}{\\partial w^k_{ij}}`} />,
                </Typography>                    
                <Typography>
                    {t('classification.where') } <Tex texContent={`S^k_j`} />
                    {t('classification.14')} <Tex texContent={`j`} /> {t('classification.15')} <Tex texContent={`k`} /> 
                    {t('classification.16')}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Classification;