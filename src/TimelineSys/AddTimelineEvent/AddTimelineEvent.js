import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ApiContext from '../../ApiContext';
import config from '../../config';
import '../../App.css';
import { getEventsForTimeline } from '../../EventSys/events-helpers';

class AddTimelineEvent extends React.Component {

    static defaultProps = {
        history: {
            push: () => {}
        },
        match: {
            params: {}
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            event_id: '',
            timeline_id: this.props.match.params.timeline_id,
            choiceTouched: false
        };
    }
    
    static contextType = ApiContext;
    


    validateEvent() {
        const eventSelected = this.state.event_id;
        const eventsInTimeline = getEventsForTimeline(this.context.timelineEvents, this.state.timeline_id, this.state.event_id);
        let eventAlreadyIn = false;
        eventsInTimeline.forEach( timelineEvent => {
            if(timelineEvent.event_id === eventSelected) {
                eventAlreadyIn = true;
            }
        });
        if(eventAlreadyIn) {
            return ("Event is already in this timeline");
        }

        if(eventSelected === 'none' || !this.state.choiceTouched) { // default value for the dropdown menu
            return ("Event is required");
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const timelineId = parseInt(this.state.timeline_id);
        const eventId = parseInt(this.state.event_id);
        const url = `${config.API_ENDPOINT}/timelines/1/timelineEvents`;
        
        const options = {
            method: 'POST',
            body: JSON.stringify({
                timeline_id: timelineId,
                event_id: eventId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(url, options)
            .then( res => {
                if(!res.ok) {
                    throw new Error('Something went wrong, please try again later');
                }
                else {
                    console.log('No issues with request!');
                    return res.json();
                } 
            })
            .then( timelineEvent => {
                this.props.history.goBack();
                this.context.AddTimelineEvent(timelineEvent);
            })
            .catch(err => {
                console.log('Error during AddTimelineEvent.js');
            });
    }

    handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        this.setState({
            [inputName]: inputValue
        });

        if(inputName === 'event_id') {
            this.setState({
                choiceTouched: true
            });
        }

    }

    render() {

        const eventMenu = this.context.events.map(
            (timelineEvent) =>
                <option value={timelineEvent.event_id} key={timelineEvent.event_id}>
                    {timelineEvent.event_name}
                </option>
        );

        return (
        <form className='addTimelineEvent-form' onSubmit={e => this.handleSubmit(e)}>
            <h2>Add event to timeline:</h2>

            <label htmlFor='event_id'>Type: </label>
            <select id='event_id' name='event_id' onChange={this.handleInputChange}>
                <option value='none'>Select one...</option>
                {eventMenu}
            </select>

            <button type='submit' className='saveButton' disabled={this.validateEvent()}>Save</button>
        </form>

        )
        }
}

export default withRouter(AddTimelineEvent);

AddTimelineEvent.propTypes = {
    timelineId: PropTypes.string,
    onAddTimelineEvent: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object
}

