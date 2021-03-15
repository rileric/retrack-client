import React from 'react';

export default React.createContext({
    events: [],
    timelines: [],
    timelineEvents: [],
    addTimeline: () => {},
    addEvent: () => {},
    addTimelineEvent: () => {}
});