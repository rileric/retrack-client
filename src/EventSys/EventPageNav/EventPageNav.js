import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../CircleButton/CircleButton';
import ApiContext from '../../ApiContext';
import PropTypes from 'prop-types';

import './EventPageNav.css';
import '../../App.css';

// Currently this Component is used only in the AddEvent/Timeline/TimeEvent Forms
// because there is no detailed Event Page
export default class EventPageNav extends Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    };
    static contextType = ApiContext;

    render() {

        return (
            <div className='EventPageNav'>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='EventPageNav__back-button'
                >
                    <FontAwesomeIcon icon='chevron-left' />
                    <br />
                    Back
                </CircleButton>
            </div>
        );
    }
}

EventPageNav.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
};