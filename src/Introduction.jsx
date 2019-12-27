import React from 'react';
import { useTranslation } from "react-i18next";

const Introduction = (props) => {

    const { t } = useTranslation();

    return (
        <div>{t('Intro')}</div>
    )
}

export default Introduction;