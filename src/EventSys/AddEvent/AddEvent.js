import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AddEvent.css';


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

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted Event', event.target);
    }

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
        const trimName = this.state.noteName.trim();

        if(this.state.nameTouched) {
            if(trimName.length === 0) {
            return( "Name is required and cannot be whitespace.");
            }
        }
    }

    render() {

        const eventTypeList = ['Movie', 'Game', 'Book', 'Comics', 'Other']
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
            />

            <button type='submit' className='saveButton'>Save</button>
        </form>

        )
        }
}

export default withRouter(AddEvent);

AddEvent.propTypes = {
    onAddEvent: PropTypes.func,
    history: PropTypes.object
}

