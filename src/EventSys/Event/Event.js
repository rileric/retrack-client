import React, { Component } from 'react';
import { format } from 'date-fns';
import ApiContext from '../../ApiContext';
// import config from '../../config';
import './Event.css';
import '../../App.css';
import PropTypes from 'prop-types';


export default class Event extends Component {
    static defaultProps = {
        onDeleteEvent: () => {}
    };
    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault();
        const event_id = this.props.event_id;

       console.log('HandleClickDelete for event: ', event_id);

       /* NOTE: Currently not allowing users to delete any events, will be tied to login system
       
       fetch( `${config.API_ENDPOINT}/events/${event_id}`, {
           method: "DELETE",
           headers: {
               "Content-Type": "application/json"
           }
       })
       .then( res => {
           if(!res.ok) {
               return res.json().then(e => Promise.reject(e));
           }
       })
       .then( () => {
           this.props.onDeleteEvent(event_id);
           this.context.deleteEvent(event_id);
       })
       .catch(error => {
           console.error({error});
       }); */
    }

    render() {
        const {event_name, relevant_date } = this.props;
        const formattedDate = (relevant_date) ? format(new Date(relevant_date), 'do MMM yyyy') : '';

        return (
            <div className='Event'>
                <h2 className='Event__title'>
                    {/* Possible feature: add link to delve into Event details */}
                    {event_name}
                </h2>
                {/* Delete button will be hidden in CSS file for the moment */}
                <button
                    className='Event__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    {' '}
                    Remove
                </button>
                <div className='Event__date'>
                    <div className='Event__date-relevant'>
                        Relevant date
                        {' '}
                        <span className='Date'>
                            {formattedDate}
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