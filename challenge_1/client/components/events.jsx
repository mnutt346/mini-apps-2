import React from "react";

const Events = props =>
  props.currentEvents.map((event, index) => {
    return parseInt(event.date) < 0 ? (
      <div key={index} className="event-container">
        <p>
          {parseInt(event.date) * -1}BC: {event.description}
        </p>
      </div>
    ) : (
      <div key={index} className="event-container">
        <p>
          {event.date}: {event.description}
        </p>
      </div>
    );
  });

export default Events;
