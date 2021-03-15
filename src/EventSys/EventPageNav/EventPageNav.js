import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../../CircleButton/CircleButton';
import ApiContext from '../../ApiContext';
import {findEvent} from '../events-helpers';
import PropTypes from 'prop-types';

import './EventPageNav.css';

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
        const { events, timelines} = this.context;
        const { event_id } = this.props.match.params;
        const timeline_event = findEvent(events, event_id) || {};

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