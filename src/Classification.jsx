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
            <MathJax.Provider>
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
                        onClick={ () => classify() }>{t('solve')}</Button>
                <Button variant="outlined" color="primary"
                    onClick={ (ev) => reStart(ev)}>{t('classification.shuffle')}
                </Button>
                <ANNResults weights={weights} />
            </Grid>
            <Grid item xs>
                <Typography variant="body1">
                    <Trans i18nKey="classification.1">
                        {t('classification.1')}
                    </Trans>
                </Typography> 
                <MathJax.Node formula={`E=\\frac{1}{n} \\sum(y-\\hat y)^2`} />,
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
            </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default Classification;