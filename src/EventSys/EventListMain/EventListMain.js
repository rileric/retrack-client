import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import CircleButton from '../../CircleButton/CircleButton';
import ApiContext from '../../ApiContext';
import {getEventsForTimeline} from '../events-helpers';
import Event from '../Event/Event';
import './EventListMain.css';

export default class EventListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };
    static contextType = ApiContext;

    render() {
        const { timeline_id } = this.props.match.params;
        const { timelineEvents=[] } = this.context;
        const eventsForTimeline = getEventsForTimeline(timelineEvents, timeline_id);
        console.log("EventListMain, eventsForTimeline: ", eventsForTimeline);
        console.log("timelineEvents = ", timelineEvents);
        console.log("timeline_id = ", timeline_id);

        return (
            <section className='EventListMain'>
                <ul>
                    {eventsForTimeline.map( event =>
                        <li key={event.event_id}>
                            <Event
                                event_id={event.event_id}
                                event_name={event.event_name}
                                event_type={event.event_type}
                                relevant_date={event.relevant_date}
                            />
                        </li> 
                    )}
                </ul>
                <div className='EventListMain__button-container'>
                    <CircleButton
                        tag={Link}
                        to='/add-event'
                        type='button'
                        className='EventListMain__add-event-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        Event
                        <br />
                    </CircleButton>
                </div>
            </section>
        )
    }
}

EventListMain.propTypes = {
    match: PropTypes.object
}