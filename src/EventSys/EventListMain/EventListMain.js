import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import CircleButton from '../../CircleButton/CircleButton';
import ApiContext from '../../ApiContext';
import {getEventsForTimeline} from '../events-helpers';
import Event from '../Event/Event';
import './EventListMain.css';
import '../../App.css';

function ShowAddEventButton() {
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    if(pathParts.length === 3) {
        let timeline_id = pathParts[2];
        if(timeline_id) {
            return (
                <div className='EventListMain__button-container'>
                    <CircleButton
                        tag={Link}
                        to={`/timelines/${timeline_id}/add-event`}
                        type='button'
                        className='EventListMain__add-event-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        Event
                        <br />
                    </CircleButton>
                </div>
            );
        }
    }
    else {
        return null;
    } 
}

export default class EventListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };
    static contextType = ApiContext;

    render() {
        const { timeline_id } = this.props.match.params;
        const { timelineEvents=[], events=[] } = this.context;
        const eventsForTimeline = getEventsForTimeline(timelineEvents, timeline_id, events);

        return (
            <section className='EventListMain'>
                <ul>
                    {eventsForTimeline.map( event =>
                        <li key={event.event_id} className='EventListMain__event-block'>
                            <div className='EventListMain__img' />
                            <Event
                                event_id={event.event_id}
                                event_name={event.event_name}
                                event_type={event.event_type}
                                relevant_date={event.relevant_date}
                            />
                        </li> 
                    )}
                </ul>
                <ShowAddEventButton />
            </section>
        )
    }
}

EventListMain.propTypes = {
    match: PropTypes.object
}