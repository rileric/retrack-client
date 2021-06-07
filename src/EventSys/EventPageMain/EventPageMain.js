import React, { Component } from 'react';
import Event from '../Event/Event';
import ApiContext from '../../ApiContext';
import {findEvent} from '../events-helpers';
import '../../App.css';
import PropTypes from 'prop-types';

export default class EventPageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    handleDeleteEvent = event_id => {
        this.props.history.push('/');
    }

    render() {

        const { events=[] } = this.context;
        const { event_id } = this.props.match.params;
        const event = findEvent(events, event_id) || {};

        return (
            <section className='EventPageMain'>
                <Event
                    event_id={event.event_id}
                    event_name={event.event_name}
                    event_type={event.event_type}
                    relevant_date={event.relevant_date}
                    onDeleteEvent={this.handleDeleteEvent}
                />
            </section>
        );
    }
}

EventPageMain.propTypes = {
    match: PropTypes.object
}