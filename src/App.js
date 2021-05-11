import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';
import ApiContext from './ApiContext';
import config from './config';
import './App.css';

import AddTimeline from './TimelineSys/AddTimeline/AddTimeline';
import AddEvent from './EventSys/AddEvent/AddEvent';
import AddTimelineEvent from './TimelineSys/AddTimelineEvent/AddTimelineEvent';
import MainErrorBoundary from './MainErrorBoundary/MainErrorBoundary';
import EventPageNav from './EventSys/EventPageNav/EventPageNav';
import EventListNav from './EventSys/EventListNav/EventListNav';
import EventPageMain from './EventSys/EventPageMain/EventPageMain';
import EventListMain from './EventSys/EventListMain/EventListMain';
import AuthNav from './LoginSys/login-helpers';

class App extends Component {
  state = {
    events: [],
    timelines: [],
    timelineEvents:[],
    user_id: '1', // default user
    isLogged_in: false,
    showNav: false
  };

  /* This is a quickfix for an issue caused by the fetch returning an inner join with the events table.
      A better fix would be to include searching for events listed in the timelineEvents table*/
  fetchTimelineEvents() {
    fetch(`${config.API_ENDPOINT}/timelines/1/timelineEvents`) // shows all timelineEvents, different from the table
    .then((timelineEventsRes) => {
      if(!timelineEventsRes.ok)
          return timelineEventsRes.json().then(e => Promise.reject(e));
      return timelineEventsRes.json();
    })
    .then((timelineEvents) => {
      this.setState({timelineEvents});
    })
    .catch(error => {
      console.error({error});
    });
  }

  componentDidMount() {

    Promise.all([
      fetch(`${config.API_ENDPOINT}/events`),
      fetch(`${config.API_ENDPOINT}/timelines`),
    ])
      .then(([ eventsRes, timelinesRes]) => {
        if(!eventsRes.ok)
          return eventsRes.json().then(e => Promise.reject(e));
        if(!timelinesRes.ok)
          return timelinesRes.json().then(e => Promise.reject(e));

        return Promise.all([eventsRes.json(), timelinesRes.json() ]);
      })
      .then(([events, timelines, timelineEvents]) => {
        this.setState({events, timelines});
      })
      .catch(error => {
        console.error({error});
      });

    this.fetchTimelineEvents();
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

  handleAddTimelineEvent = () => {
    /* this.setState({
      timelineEvents: [...this.state.timelineEvents, newTimelineEvent]
    }); */
    this.fetchTimelineEvents(); // QUICKFIX = re-fetch so that timelineEvents includes the event data
  }

  handleLogin = (logStatus, contextUserId) => {

    let logStatusChange = false;
    let userChange = false;

    if(this.state.isLogged_in !== logStatus) {
      logStatusChange = true;
    }
    if(contextUserId !== this.state.user_id) {
      userChange = true;
    }

    if(logStatusChange && userChange) {
      this.setState({
        isLogged_in: logStatus,
        user_id: contextUserId
      });
    }

  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/timelines/:timeline_id'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={EventListNav}
          />
        ))}
        {['/timelines/:timeline_id/add-event'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={EventPageNav}
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
        {['/', '/timelines/:timeline_id'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={EventListMain}
          />
        ))}
        <Route path='/events/:event_id' component={EventPageMain} />
        <MainErrorBoundary>
          <Route path='/add-timeline'
            render = {({history}) => 
            <AddTimeline /> }
          />
          <Route path='/add-event'
            render = {({history}) => 
            <AddEvent /> }
          />
          <Route path='/timelines/:timeline_id/add-event'
            render = {({history}) => 
            <AddTimelineEvent /> }
          />
        </MainErrorBoundary>
      </>
    );
  }

  handleShowNavButton = e => {
    e.preventDefault();

    this.setState({
      showNav: !this.state.showNav
    });
  }

  render() {
    const value = {
      events: this.state.events,
      timelines: this.state.timelines,
      timelineEvents: this.state.timelineEvents,
      AddTimeline: this.handleAddTimeline,
      AddEvent: this.handleAddEvent,
      AddTimelineEvent: this.handleAddTimelineEvent,
      userLogin: this.handleLogin,
      user_id: this.state.user_id
    };

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Retrack</Link>
            </h1>
            <Link to='/add-event' className='App-header__add-event-button'>New Event</Link>
            <AuthNav />
          </header>
          <main className='App__main'>
            {this.state.showNav ? this.renderNavRoutes() :this.renderMainRoutes() }
            <button 
              className='App__showNavButton'
              type='button'
              onClick={this.handleShowNavButton}
            >
              {this.state.showNav ? 'Events' : 'Timelines' }
            </button>
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;