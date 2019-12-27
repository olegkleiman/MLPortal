import React from 'react';
import { useTranslation } from "react-i18next";

const Ridge = (props) => {

    const { t } = useTranslation();

    return (
        <div>{t('RigdeRegression')}</div>
    )

}

export default Ridge;