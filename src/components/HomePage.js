import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function HomePage() {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetch('https://data.cityofnewyork.us/resource/tvpp-9vvx.json')
      .then(resp => resp.json())
      // .then(data => displayData(data))
      .then(data => setEvents(data.slice(0, 20)))
  }, [])

  return (
    <div className="m-3">
      {events.map(event => {
        return (
          <Card className="m-3" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className="fs-3">{event.event_name}</Card.Title>
              <Card.Text>
                <span className="fw-bold">Location:</span> {event.event_location}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <span className="fw-bold">Event Type:</span>
                {event.event_type}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )
      })}
    </div>
  )
}

export default HomePage

{/* <li key={event.event_id}>
{event.event_name}
</li> */}