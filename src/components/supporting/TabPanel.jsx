import React from 'react';

const TabPanel = (props) => {
    const {children, tabPosition, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={tabPosition !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {tabPosition === index && (<div>{children}</div>)}
        </div>
    );
};

export default TabPanel;