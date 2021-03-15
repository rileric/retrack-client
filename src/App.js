import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ApiContext from './ApiContext';
import config from './config';
import './App.css';

import AddTimeline from './TimelineSys/AddTimeline/AddTimeline';
import AddEvent from './EventSys/AddEvent/AddEvent';
import MainErrorBoundary from './MainErrorBoundary/MainErrorBoundary';
import EventPageNav from './EventSys/EventPageNav/EventPageNav';
import EventListNav from './EventSys/EventListNav/EventListNav';
import EventPageMain from './EventSys/EventPageMain/EventPageMain';
import EventListMain from './EventSys/EventListMain/EventListMain';
import CircleButton from './CircleButton/CircleButton';

import STORE from './dummy-store';
let myDebug = console.log;


class App extends Component {
  state = {
    events: STORE.events,
    timelines: STORE.timelines,
    timelineEvents:STORE.timelineEvents
  };

  componentDidMount() {
    myDebug('ComponentDidMount in App.js');
  }

  handleAddTimeline = newTimeline => {
    this.setState({
      timelines: [...this.state.timelines, newTimeline]
    });
  }

  handleAddEvent = newEvent => {
    this.setState({
      events: [...this.state.events, newEvent]
    });
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/timeline/:timeline_id'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={EventListNav}
          />
        ))}
        <Route path='/add-timeline' component={EventPageNav} />
        <Route path='/add-event' component={EventPageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/timeline/:timeline_id'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={EventListMain}
          />
        ))}
        <Route path='/event/:event_id' component={EventPageMain} />
        <MainErrorBoundary>
          <Route path='/add-timeline'
            render = {({history}) => 
            <AddTimeline onAddTimeline={this.handleAddTimeline} /> }
          />
          <Route path='/add-event'
            render = {({history}) => 
            <AddEvent onAddEvent={this.handleAddEvent} /> }
          />
        </MainErrorBoundary>
      </>
    );
  }

  render() {
    const value = {
      events: this.state.events,
      timelines: this.state.timelines,
      timelineEvents: this.state.timelineEvents,
      AddTimeline: this.handleAddTimeline,
      AddEvent: this.handleAddEvent
    };

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Retrack</Link>
              <Link to='/add-event' className='App-header__add-event-button'>Add Event</Link>
            </h1>
          </header>
          <main className='App__main'>{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;