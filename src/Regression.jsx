 /* flow */
import React from 'react';
import { useTranslation, Trans } from "react-i18next";

import MathJax from 'react-mathjax';
import {Tex} from 'react-tex';

import Sidebar from './Sidebar';
import RidgeImage from './assets/images/ridge.png'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '12px',
        marginRigth: '8px',
        marginTop: '12px'
    }
}));


const Regression = (props) => {

    const classes = useStyles();
    const { t } = useTranslation();

    const sidebar = {
        title: "On this page",
        description: "Regression",
        topics: [ {
                    title: t('reg.topic_0'), 
                    link: 'task'
                  }, {
                    title: t('reg.topic_1'),
                    link: 'classic'
                 }, {
                     title: t('reg.topic_2'),
                     link: 'ridge'
                 }, {
                    title: t('reg.topic_3'),
                    link: 'complexity'
                 }]
    }


     return (<>
        <CssBaseline />
        <Grid container fixed='true' className={classes.root}>
            <MathJax.Provider>
                <Grid item xs={8}  id="task"> 
                    <Typography variant="h6">
                     {t('reg.topic_0')} 
                    </Typography>
                    <Typography variant="body1">
                        {t('reg.1')}.
                    </Typography>
                    <Typography variant="h6" id="classic">
                        {t('reg.ridge.0')}
                    </Typography>
                    <MathJax.Node formula={`\\nabla_w MSE = 0 \\href{http://www.sun.com} \\Rightarrow`} /> 
                    <MathJax.Node formula={`\\nabla_w \\frac{1}{m} \\lVert y - \\hat y \\rVert_2^{2} = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`\\frac{1}{m} \\nabla_w \\lVert X \\cdot w -y \\rVert_2^2 = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`\\nabla_w (X \\cdot w-y)^T (X \\cdot w-y) = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`\\nabla_w (w^T X^T X w - 2w^T X^T y + y^T y) = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`2X^T X w - 2X^T y + 0 \\Rightarrow`} />
                    <MathJax.Node formula={`\\boxed{ \\mathbf w = (X^T\\cdot X)^{-1} \\cdot X^T \\cdot y}`} />
                    <Typography>
                        <Trans i18nKey="reg.2'">
                            {t('reg.2')}
                        </Trans>.
                        {t('reg.8')} <Tex texContent={`n`} />. 
                        { t('indeed')}, {t('if')} <Tex texContent={`dim[X] = m \\times n`} />, {t('_and')} 
                        <Tex texContent={`y`} /> - {t('reg.9')} {t('then')}
                    </Typography>
                    <MathJax.Node formula={`dim[X^T \\cdot X] = m \\times m`} />
                    <Typography>    
                        {t('and')} 
                     </Typography>   
                    <MathJax.Node formula={`dim[X^T \\cdot y] = m \\times 1`} />    
                    <Typography>  
                        {t('then')} {t('reg.10')}:
                     </Typography>
                     <MathJax.Node formula={`dim[(X^T\\cdot X)^{-1} \\cdot X^T \\cdot y] = m \\times 1`} />
                     <Typography> 
                     {t('reg.13')} <Tex texContent={`X`} />.
                     {t('reg.14')}.
                     </Typography>
                </Grid>
                <Sidebar content={sidebar} />
                <Grid item xs={12} id="ridge">
                    <Typography variant="h6">
                        {t('reg.ridge.1')}
                    </Typography>
                    <Typography variant="body1">
                        {t('reg.ridge.2')} <Tex texContent={`\\Omega(w)`} />
                        {t('reg.ridge.3')} <Tex texContent={`\\lambda`} />
                        {t('reg.ridge.4')} <Tex texContent={`L_2`} />
                        {t('reg.ridge.5')} <Tex texContent={`\\lambda`} />.
                    </Typography>
                    <Typography variant="body1">
                        {t('reg.ridge.6')}
                    </Typography>
                    <MathJax.Node formula={`J(w) = E(x, w) + \\Omega(w)`} />
                    <MathJax.Node formula={`\\nabla_w ( \\lVert y - X w \\rVert_2^{2} + \\lambda \\lVert w \\rVert_2^{2}) = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`\\nabla_w( 2X^T(Xw - y) + 2\\lambda w) = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`2X^T w - 2X^Ty + 2\\lambda w = 0 \\Rightarrow`} />
                    <MathJax.Node formula={`(X^T X + \\lambda I)w = X^Ty \\Rightarrow`} />
                    <MathJax.Node formula={`\\boxed{ w=(X^TX+\\lambda I)^{-1} \\cdot X^T \\cdot y}` } />
                    <Typography>
                    {t('reg.ridge.7')} <Tex texContent={`X^T X`} />.
                    {t('reg.ridge.8')}. 
                    </Typography>
                    <img src={RidgeImage} width='780' />
                </Grid>
                <Grid item xs={12} id='complexity'>
                    <Typography variant="body1">
                        {t('reg.3')}
                    </Typography>
                    <Typography>
                        {t('reg.4')} <Tex texContent={`O(n^3)`} /> 
                        {t('reg.5')} <Tex texContent={`n \\times m`} /> {t('and')} <Tex texContent={`m \\times p`} />
                        {t('reg.6')} <Tex texContent={`O(nmp)`} /> {t('reg.7')}
                        ({t('reg.11')} <Tex texContent={`m`} />
                        {t('reg.12')} <Tex texContent={`n \\times p`} />)
                    </Typography>
                    <Divider />
                    <Typography> 
                     {t('reg.16')}
                    </Typography> 
                </Grid>
            </MathJax.Provider>                    
        </Grid>
     </>)

 }

 export default Regression;