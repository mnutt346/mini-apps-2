import React from "react";

const Events = props =>
  props.currentEvents.map((event, index) => {
    return (
      <div key={index} className="event-container">
        <p>
          {event.date} {event.description}
        </p>
      </div>
    );
  });

export default Events;
