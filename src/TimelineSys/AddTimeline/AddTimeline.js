import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../config';
import ApiContext from '../../ApiContext';
import '../../App.css';


class AddTimeline extends Component {
  static contextType = ApiContext;

  handleSubmit(event) {
    event.preventDefault();
    let timelineName = event.target[0].value;
    let url = `${config.API_ENDPOINT}/timelines`;

    const options = {
      method: 'POST',
      body: JSON.stringify({
        timeline_name: timelineName,
        tl_owner_id: this.context.user_id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch( url, options)
      .then( res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        else {
          console.log('No issues with request');
          return res.json();
        }
      })
      .then( timeline => {
        this.props.history.push('/');
        this.context.AddTimeline(timeline);
      })
      .catch(err => {
        console.log('Error during AddTimeline.js');
      });
  }

  render() {

    return (
      <form className='addTimeline-form' onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Timeline</h2>
        <label htmlFor='timelineName'>Timeline name: </label>
        <input
          type='text'
          className='addTimelineName'
          name='timelineName'
          id='timelineName'
          required
        />
        <button type='submit' className='saveButton'>Save</button>
      </form>
      
    )
  }
}

export default withRouter(AddTimeline);

AddTimeline.propTypes = {
    history: PropTypes.object,
    onAddTimeline: PropTypes.func
}