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


  let dateConverter = (data) => {
    let d = new Date(data);
    // console.log(d.getUTCHours());
    // console.log(d.getHours());
    return d.toDateString();

    // let dString = d.toString();
    // return dString;

    // return dString.getUTCHours();
  }

  function parseIsoDatetime(dtstr) {
    var dt = dtstr.split(/[: T-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
  }

  return (
    <div className="m-3">
      {events.map(event => {
        return (
          <Card key={event.event_id} className="m-3" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className="fs-3">{event.event_name}</Card.Title>
              <Card.Text>
                <span className="fw-bold">Location:</span>
                <span className="mx-2">{event.event_location}</span>
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">

              <ListGroup.Item>
                <span className="fw-bold">Borough:</span>
                <span className="mx-2">{event.event_borough}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className="fw-bold">Start Time:</span>
                <span className="mx-2">{dateConverter(event.start_date_time)}</span>
                {/* <span className="mx-2">{parseIsoDatetime(event.start_date_time)}</span> */}
              </ListGroup.Item>

              <ListGroup.Item>
                <span className="fw-bold">Event Type:</span>
                <span className="mx-2">{event.event_type}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )
      })}
    </div>
  )
}

export default HomePage