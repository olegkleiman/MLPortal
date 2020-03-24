// @flow
import React, {useState, useEffect} from 'react';
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

import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis'

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

    const [trainSet, setTrainSet] = useState();
    const [trainLabels, setTrainLabels] = useState();

    const [testSet, setTestSet] = useState();
    const [testLabels, setTestLabels] = useState();

    const [classAValues, setClassAValues] = useState();
    const [classBValues, setClassBValues] = useState();
    const [lineData, setLineData] = useState()
    const [weights, setWeights] = useState();
    const [activationFunctionName, setActivationFunctionName] = useState(activationFunctions[0].value);

    useEffect( () => {

        const TRAIN_SET_SIZE = 100
        let _dataSet = generateDataSet(TRAIN_SET_SIZE, [-1.,-1.], [1.,1.]) // returns 2D tensor with shape(200,3)
        let slice = _dataSet.slice([0,0], [TRAIN_SET_SIZE * 2,2]) // get values only - slice array of (200,2) from start point (0,0)
        setTrainSet(slice); 
        slice = _dataSet.slice([0,0], [100,2]); // slice array of (100,2) from start point (0,0)
        setClassAValues(slice)
        slice = _dataSet.slice([100, 0], [100, 2]); // slice array of (100,2) from start point (100,0)
        setClassBValues(slice)

        const _labels = _dataSet.slice([0,2], 200)
        setTrainLabels(_labels);

        const TEST_SET_SIZE = 20
        // Generate validation set
        _dataSet = generateDataSet(TEST_SET_SIZE, [-1.,-1.], [1.,1.]) // <= tensor2d
        slice = _dataSet.slice([0,0], [TEST_SET_SIZE * 2, 2])
        setTestSet(slice);
    }, [])

    const getClassAValues = () => {
        const tensor = classAValues;
        if( tensor ) {
            const _data = tensor.arraySync()
            return _data.map( item => {
                return {
                    x: item[0],
                    y: item[1]
                }
            })
        }
    }

    const getClassBValues = () => {
        const tensor = classBValues;
        if( tensor ) {
            const _data = tensor.arraySync()
            return _data.map( item => {
                return {
                    x: item[0],
                    y: item[1]
                }
            })
        }        
    }

    const reStart = (ev) => {
        console.log(ev)
    }

    const valueClick = (datapoint, event) => {
        console.log(datapoint);
    }

    const onBatchEnd = (batch, logs) => {
        console.log('Accuracy', logs.acc);
    }

    const generateDataSet = (N, point0, point1) => {
        const _data1 = tf.randomNormal(
            [N, 2], // shape 
            point0[0], // mean
            1, // stdDev
            'float32' //dtype 
        );
        const _data2 = tf.randomNormal([N, 2], point1[0], 1, 'float32');
        const axis = 0;
        const _values = _data1.concat(_data2, axis)

        const _labels1 = tf.zeros([N,1])    
        const _labels2 = tf.ones([N,1])
        const _labels = _labels1.concat(_labels2, axis)

        return _values.concat(_labels, 1);
     
    }

    const buildModel = async () => {


        // Layers API:
        // see https://www.tensorflow.org/js/guide/train_models for start point
        const model = tf.sequential(
            {
                layers: [
                    tf.layers.dense({
                        inputShape: [2], units: 1, activation: 'relu'
                    }),
                    // Add an output layer
                    // tf.layers.dense({units: 1, useBias: true}))  
                ]
            }
        )

        model.compile({loss: 'binaryCrossentropy', 
                        optimizer: 'sgd', 
                        metrics: ['accuracy']});

        const info = await model.fit(trainSet, trainLabels, {
            epochs: 100,
            batchSize: 16,
            callbacks: {onBatchEnd},
            validationData: testSet
        })
        const surface = tfvis.visor().surface({ name: 'Accuracy', tab: 'Charts' });

        console.log('Final accuracy:', info.history.acc[info.history.acc.length-1]);
        const accuMetrics = info.history.acc.map( (item, index) => {
            return {
                index: index,
                value: item
            }
        })
        // tfvis.render.linechart(surface, data, { zoomToFit: true });
        tfvis.render.barchart(surface, accuMetrics, {});

        // const lossMetrics = info.history.loss.map( (item, index) => {
        //     return {
        //         index: index,
        //         value: item
        //     }
        // });
        // tfvis.render.barchart(surface, lossMetrics, {});

        const predictions = model.predict(testSet, {
            verbose: true
        });
        predictions.print();
    }

    const classifyTF =async () => {
        await buildModel();
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
                                data={getClassAValues()} />
                    <MarkSeries animation={'noWobble'}
                                className="responsive-vis-scatterplot"
                                colorType="literal"
                                color='blue'
                                onValueClick={ (datapoint, event) => valueClick(datapoint, event) }
                                data={getClassBValues()} />                            
                    <LineSeries data={lineData} color='red'/> 
                    <VerticalGridLines />
                    <HorizontalGridLines />                          
                    <XAxis />        
                    <YAxis />                    
                </XYPlot>
                <Button variant="outlined" color="primary"
                        onClick={ () => classifyTF() }>{t('solve')}</Button>
                <Button variant="outlined" color="primary"
                    onClick={ (ev) => reStart(ev)}>{t('classification.shuffle')}
                </Button>
                <ANNResults weights={weights} />
            </Grid>
            <Grid item xs={7}>
                <Typography variant="body1">
                    <Trans i18nKey="classification.1" />
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