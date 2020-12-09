import React from 'react';
import LoadingIndicator from './AnimatedLoader';

const withSpinner = Comp => ({ isLoading, children, ...props }) => {
    if (isLoading) {
        return <LoadingIndicator isLoading={isLoading} />
    } else {
        return (
            <Comp {...props}>
                {children}
            </Comp>
        )
    }
};

export default withSpinner;