import React from 'react';

export default React.createContext({
    events: [],
    timelines: [],
    timelineEvents: [],
    addTimeline: () => {},
    addEvent: () => {},
    addTimelineEvent: () => {},
    user_id: '1'
});