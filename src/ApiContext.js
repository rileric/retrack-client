import React from 'react';

export default React.createContext({
    events: [],
    timelines: [],
    timelineEvents: [],
    addTimeline: () => {},
    addEvent: () => {},
    deleteEvent: () => {},
    addTimelineEvent: () => {},
    deleteTimelineEvent: () => {},
    userLogin: () => {},
    user_id: '1'
});