import React, { Component } from 'react';
import { format } from 'date-fns';
import ApiContext from '../../ApiContext';
import config from '../../config';
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
           this.context.DeleteEvent(event_id);
       })
       .catch(error => {
           console.error({error});
       });
    }

    handleClickRemove = e => {
        e.preventDefault();
        const event_id = this.props.event_id;
        const timeline_id = this.props.timeline_id;
       
       fetch( `${config.API_ENDPOINT}/timelines/${timeline_id}/timelineEvents/${event_id}`, {
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
           this.props.onDeleteEvent(event_id); // currently pushes to '/'
           this.context.DeleteTimelineEvent(timeline_id,event_id);
       })
       .catch(error => {
           console.error({error});
       });
    }

    render() {
        const {event_name, relevant_date, event_owner_id, timeline_owner } = this.props;
        let formattedDate = '';
        // Special date handling because the YYYY-MM-DD format causes timezone issues
        if( relevant_date) {
            let date = relevant_date.substring(0,10).split('-');
            let splitDate = date[1] + '-' + date[2] + '-' + date[0];
            formattedDate = format(new Date(splitDate), 'do MMM yyyy');
        }

        return (
            <div className='Event'>
                <h2 className='Event__title'>
                    {/* Possible feature: add link to delve into Event details */}
                    {event_name}
                </h2>
                {((this.context.user_id === event_owner_id) && (this.context.user_id !== "1")) ? 
                    <button
                        className='Event__delete'
                        type='button'
                        onClick={this.handleClickDelete}
                    >
                        {' '}
                        Delete
                    </button> : ''}
                {((this.context.user_id === timeline_owner) && (this.context.user_id !== "1")) ? 
                    <button
                        className='Event__remove'
                        type='button'
                        onClick={this.handleClickRemove}
                    >
                        {' '}
                        Remove
                    </button> : ''}

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
    event_owner_id: PropTypes.string,
    relevant_date: PropTypes.string,
    timeline_id: PropTypes.string,
    timeline_owner: PropTypes.string,
    onDeleteEvent: PropTypes.func
}