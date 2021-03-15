import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../../ApiContext';
import config from '../../config';
import './Event.css';
import PropTypes from 'prop-types';

let myDebug=console.log;

export default class Event extends Component {
    static defaultProps = {
        onDeleteEvent: () => {}
    };
    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault();
        const event_id = this.props.event_id;

        myDebug('HandleClickDelete for event: ', event_id);
    }

    render() {
        const { event_id, event_name, event_type, relevant_date } = this.props;

        return (
            <div className='Event'>
                <h2 className='Event__title'>
                    {/* TODO add link to delve into Event details? */}
                    {event_name}
                </h2>
                <button
                    className='Event__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    Remove
                </button>
                <div className='Event__dates'>
                    <div className='Event__dates-relevant'>
                        Relevant date
                        {' '}
                        <span className='Date'>
                            {format(new Date(relevant_date), 'MM/dd/yyyy')}
                        </span>
                    </div>    
                </div>
            </div>
        )
    }
}

Event.propTypes = {
    event_id: PropTypes.number.isRequired,
    event_name: PropTypes.string.isRequired,
    event_type: PropTypes.string.isRequired,
    relevant_date: PropTypes.string,
    onDeleteEvent: PropTypes.func
}