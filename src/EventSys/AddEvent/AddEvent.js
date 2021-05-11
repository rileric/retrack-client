import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from "../../config";
import ApiContext from '../../ApiContext';
import './AddEvent.css';
import '../../App.css';

class AddEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event_name: '',
            nameTouched: false,
            relevant_date: null,
            event_type: 'Other',
            typeTouched: false,
        };
    }
    static contextType = ApiContext;

    handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        this.setState({
            [inputName]: inputValue
        });

        if(inputName === 'event_name') {
            this.setState({
                nameTouched: true
            });       
        }

        if(inputName === 'event_type') {
            this.setState({
                typeTouched: true
            });
        }
    }

    validateName() {
        const trimName = this.state.event_name.trim();

        if(this.state.nameTouched) {
            if(trimName.length === 0) {
                return( "Name is required and cannot be whitespace.");
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let eventName = this.state.event_name;
        let eventType = this.state.event_type;
        let relevantDate = this.state.relevant_date;
        let eventOwnerId = this.context.user_id; 
        const url = `${config.API_ENDPOINT}/events`;

        const options = {
            method: 'POST',
            body: JSON.stringify({
                event_name: eventName,
                event_type: eventType,
                relevant_date: relevantDate,
                event_owner_id: eventOwnerId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch( url, options)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong, please try again');
                }
                else {
                    console.log('No issues with request!');
                    return res.json();
                }
            })
            .then( event => {
                this.props.history.push('/');
                this.context.AddEvent(event);
            })
            .catch( err => {
                console.log('Error during AddEvent.js');
            });
    }

    render() {

        const eventTypeList = ['Movie', 'Game', 'Book', 'Comic', 'Other']
        const eventTypeMenu = eventTypeList.map(
            (typeOption) => <option value={typeOption} key={typeOption}>{typeOption}</option>
        );

        return (
        <form className='addEvent-form' onSubmit={e => this.handleSubmit(e)}>
            <h2>Add Event</h2>
            <label htmlFor='event_name'>Event name: </label>
            <input
                type='text'
                className='addEventName'
                name='event_name'
                id='event_name'
                onChange={this.handleInputChange}
                required
            />

            <label htmlFor='event_type'>Type: </label>
            <select id='event_type' name='event_type' onChange={this.handleInputChange}>
                <option value='none'>Select one...</option>
                {eventTypeMenu}
            </select>

            <label htmlFor='relevant_date'>Relevant date: </label>
            <input
                type='date'
                className='addRelevantDate'
                name='relevant_date'
                id='relevant_date'
                onChange={this.handleInputChange}
            />

            <button type='submit' className='saveButton' disabled={ this.validateName()}>Save</button>
        </form>

        )
        }
}

export default withRouter(AddEvent);

AddEvent.propTypes = {
    onAddEvent: PropTypes.func,
    history: PropTypes.object
}

