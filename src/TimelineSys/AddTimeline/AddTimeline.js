import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class AddTimeline extends Component {

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted Timeline', event.target);
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
    onAddFolder: PropTypes.func
}