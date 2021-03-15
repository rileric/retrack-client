import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../../CircleButton/CircleButton';
import ApiContext from '../../ApiContext';
import './EventListNav.css';

export default class EventListNav extends Component {

    static contextType = ApiContext;

    render() {
        const { timelines = [], events = [] } = this.context;

        return (
            <div className='EventListNav'>
                <ul className='EventListNav__list'>
                    {timelines.map( timeline =>
                        <li key={timeline.timeline_id}>
                            <NavLink
                                className='EventListNav__timeline-link'
                                to={`/timeline/${timeline.timeline_id}`}
                            >
                                <span className='EventListNav__num-events'>
                                    {/* TODO count number of events in a timeline? */}
                                </span>
                                {timeline.timeline_name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='EventListNav__button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-timeline'
                        type='button'
                        className='EventListNav__add-timeline-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Timeline
                    </CircleButton>
                </div>
            </div>
        );
    }
}