 import React from 'react';
 import { useTranslation } from "react-i18next";

 const Regression = (props) => {

    const { t } = useTranslation();

     return (
         <div>{t('Regression')}</div>
     )

 }

 export default Regression;