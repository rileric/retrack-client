export const findEvent = (events=[], event_id) => (
    events.find(event => event.event_id === parseInt(event_id))
);

export const findTimeline = (timelines=[], timeline_id) => (
    timelines.find(timeline => timeline.timeline_id === timeline_id)
);

export const getEventsForTimeline = (timelineEvents=[], timeline_id) => (
    (!timeline_id)
        ? timelineEvents
        : timelineEvents.filter(timelineEvent => timelineEvent.timeline_id === timeline_id)
);