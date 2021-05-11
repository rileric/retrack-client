const STORE = {
    "timelines": [
        {
            "timeline_id": "10",
            "timeline_name": "Dummy TL 10",
            "tl_owner_id": "1"
        },
        {
            "timeline_id": "11",
            "timeline_name": "Dummy TL 11",
            "tl_owner_id": "117404874156041511981"
        },
        {
            "timeline_id": "12",
            "timeline_name": "Dummy TL 12",
            "tl_owner_id": "1"
        },
    ],

    "events": [
        {
            "event_id": "10",
            "event_name": "Dummy event 10",
            "event_type": "Other",
            "relevant_date": "2022-07-12",
            "event_owner_id": "1"
        },
        {
            "event_id": "11",
            "event_name": "Dummy game 11",
            "event_type": "Game",
            "relevant_date": "2021-12-13",
            "event_owner_id": "117404874156041511981"
        },
        {
            "event_id": "12",
            "event_name": "Dummy video 12",
            "event_type": "Video",
            "relevant_date": "2021-06-28",
            "event_owner_id": "1"
        },
    ],

    "timelineEvents": [
        {
           "timeline_id": "11",
           "tl_owner_id": "117404874156041511981",
           "event_id": "10",
           "event_name": "Dummy event 10",
            "event_type": "Other",
            "relevant_date": "2022-07-12",
            "event_owner_id": "1"
        },
        {
            "timeline_id": "11",
            "tl_owner_id": "117404874156041511981",
            "event_id": "11",
            "event_name": "Dummy game 11",
            "event_type": "Game",
            "relevant_date": "2021-12-13",
            "event_owner_id": "117404874156041511981"
         },
         {
            "timeline_id": "11",
            "tl_owner_id": "117404874156041511981",
            "event_id": "12",
            "event_name": "Dummy video 12",
            "event_type": "Video",
            "relevant_date": "2021-06-28",
            "event_owner_id": "1"
         },
         {
            "timeline_id": "12",
            "tl_owner_id": "1",
            "event_id": "12",
            "event_name": "Dummy video 12",
            "event_type": "Video",
            "relevant_date": "2021-06-28",
            "event_owner_id": "1"
         },
    ]
}

export default STORE;