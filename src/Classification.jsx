// @flow
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, YAxis, XAxis, 
        VerticalGridLines,
        HorizontalGridLines,
        MarkSeries, LineSeries, LabelSeries} from 'react-vis';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {Tex} from 'react-tex';
import MathJax from 'react-mathjax';

import Perceptron from './Perceptron';
import * as ActivationFunctions from './ActivationFunctions';
import ANNResults from './ANNResults';

import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis'

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

const MODEL_NAME = 'me_classification_2D'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Classification = () => {

    const classes = useStyles();
    const { t } = useTranslation();

    const [openBackdrop, setOpenBackdrop] = useState(false); // material-ui loader

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

    const buildModel = () => {


        // Layers API:
        // see https://www.tensorflow.org/js/guide/train_models for start point
        const model = tf.sequential(
            {
                layers: [
                    tf.layers.dense({
                        inputShape: [2], units: 1, activation: 'sigmoid'
                    }),
                    // Add an output layer
                    // tf.layers.dense({units: 1, useBias: true}))  
                ]
            }
        )

        model.compile({loss: 'binaryCrossentropy', 
                        optimizer: 'sgd', 
                        metrics: ['accuracy']});
        return model;                        

    }

    const classifyTF = async () => {

        setOpenBackdrop(true);

        let model;
        try {
           model  = await tf.loadLayersModel('indexeddb://' + MODEL_NAME);
        }
        catch(ex) {

            model = buildModel();

            const info = await model.fit(trainSet, trainLabels, {
                epochs: 100,
                batchSize: 16,
                callbacks: {onBatchEnd},
                validationData: testSet
            })
            await model.save('indexeddb://' + MODEL_NAME)

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
        }

        const predictions = model.predict(tf.tensor2d([[-1., -1.], [1., 1.], [0.5,0.5]], [3,2]), {
        // const predictions = model.predict(testSet, {
            batchSize: 4,
            verbose: true
        });
        predictions.print();
        const res = predictions.argMax(1)
        res.print()

        console.log(tf.memory())

        setOpenBackdrop(false);

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
                <div>
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
                    <Backdrop className={classes.backdrop} open={openBackdrop}>
                        <CircularProgress color="inherit" />
                    </Backdrop>                
                </div>
                <Button variant="outlined" color="primary"
                        onClick={ () => classifyTF() }>{t('solve')}</Button>
                <Button variant="outlined" color="primary"
                    onClick={ (ev) => reStart(ev)}>{t('classification.shuffle')}
                </Button>
                <ANNResults weights={weights} />
            </Grid>
            <Grid item xs={7}>
                <Typography variant="body1">
                    <Trans i18nKey="classification.common.1" />
                    <Trans i18nKey="classification.common.2" />
                </Typography> 
                <Typography variant="body1">   
                    <Trans i18nKey="classification.common.3" />
                </Typography> 
                <MathJax.Node formula={`D_{KL} = \\sum_{i} p(x_i) log(\\frac{p(x_i)}{q(x_i)}`} />
                <Typography>
                    {t('where') } 
                    <Tex texContent={`P`} /> 
                    {t('classification.2') }
                    <Tex texContent={`Q`} /> 
                    {t('classification.3') } 
                </Typography>
                <Typography>
                    {t('classification.4') }
                </Typography>                    
                <MathJax.Node formula={`D_{KL} = \\int_X p(x) \\log(\\frac{p(x)}{q(x)} dx`} />
                <Typography>
                    <Trans i18nKey="classification.40" /> 
                    <Tex texContent={`X = R^d`} />.
                </Typography>
                <Typography>
                    {t('classification.41') }
                </Typography>
                <MathJax.Node formula={`H(p,q)=\\mathbb{E}_p[-log(q)] = - \\sum_y p(y) \\log q(y) `} />
                <Typography>
                    {t('classification.42') }  
                </Typography>
                <MathJax.Node formula={`D_{KL}(P|Q)= \\sum_y p(y) \\log \\frac{p(y)}{q(y)} = \\sum_y p(y) \\log p(y) - \\sum_y p(y) \\log q(y) = H(p) + H(p,q)`} />  
                <Typography>
                    {t('classification.5') }  <Tex texContent={`D = \\{ (x_i, y_i \\}_{i=1}^N`} />  
                    {t('classification.51') }
                </Typography>
                <MathJax.Node formula={`L(\\theta) = H(p_{data},q(\\theta)) = -\\frac{1}{N} \\sum_{i=1}^N (y_i \\log \\hat y_i(\\theta) + (1-y_i) \\log(1-\\hat y(\\theta) ))`} />
                <Typography>
                    {t('where') }  <Tex texContent={`\\hat y_i(\\theta)`} /> {t('classification.52') }
                </Typography>    
                <Link to={'/grad'}>
                    {t('classification.43') }
                </Link>
                <Typography>
                    {t('classification.44')}
                </Typography>
            </Grid>
            </MathJax.Provider>
        </Grid>
    )
}

export default Classification;