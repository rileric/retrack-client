import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import NavButton from '../../NavButton/NavButton';
import ApiContext from '../../ApiContext';
import {getEventsForTimeline, findTimeline} from '../events-helpers';
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
                    <NavButton
                        tag={Link}
                        to={`/timelines/${timeline_id}/add-event`}
                        type='button'
                        className='EventListMain__add-event-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        Event
                        <br />
                    </NavButton>
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
        const { timelineEvents=[], events=[], timelines=[] } = this.context;
        const eventsForTimeline = getEventsForTimeline(timelineEvents, timeline_id, events);
        let timeline_owner = '1';
        if(timeline_id) {
            let timelineObj = findTimeline(timelines, timeline_id);
            timeline_owner = timelineObj.tl_owner_id;
        }

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
                                event_owner_id = {event.event_owner_id}
                                relevant_date={event.relevant_date}
                                timeline_id = {timeline_id}
                                timeline_owner = {timeline_owner}
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