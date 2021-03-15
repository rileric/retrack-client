import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MainErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    render() {

        if(this.state.hasError) {
            return(
                <h2>Unable to perform action</h2>
            );
        }
        return this.props.children;
    }
}

MainErrorBoundary.propTypes = {
    children: PropTypes.array
}