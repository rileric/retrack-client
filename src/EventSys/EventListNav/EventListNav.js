import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavButton from '../../NavButton/NavButton';
import ApiContext from '../../ApiContext';
import '../../App.css';

export default class EventListNav extends Component {

    static contextType = ApiContext;

    render() {
        const { timelines = [] } = this.context;

        return (
            <div className='EventListNav'>
                <ul className='EventListNav__list'>
                    {timelines.map( timeline =>
                        <li key={timeline.timeline_id}>
                            <NavLink
                                className='EventListNav__timeline-link'
                                to={`/timelines/${timeline.timeline_id}`}
                            >
                                {timeline.timeline_name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='EventListNav__button-wrapper'>
                    <NavButton
                        tag={Link}
                        to='/add-timeline'
                        type='button'
                        className='EventListNav__add-timeline-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Timeline
                    </NavButton>
                </div>
            </div>
        );
    }
}