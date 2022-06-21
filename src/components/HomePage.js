import React, { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function HomePage() {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetch('https://data.cityofnewyork.us/resource/tvpp-9vvx.json')
      .then(resp => resp.json())
      // .then(data => displayData(data))
      .then(data => {
        setEvents(data.slice(0, 20))
      })
  }, [])

  // Thie function transfer date to the format we want
  let dateConverter = (data) => {
    //console.log(data.slice(0, 11))
    let dateEndIdx = data.indexOf("T")
    let date = data.slice(0, dateEndIdx).split('-')
    let newDateFormat = date.join('/')
    return (newDateFormat)
  }

  // Thie function transfer 24hr time format to 12hr time format
  let timeConverter = (data) => {
    let timeStartIdx = data.indexOf("T") + 1
    //let timeEndIdx = timeStartIdx + 8
    //console.log("start idx = " + timeStartIdx + "end idx = " + timeEndIdx)
    //console.log(data.slice(11, 19))
    let hours = data.slice(timeStartIdx, timeStartIdx + 2)
    //console.log(hours +"this is hours")
    let hoursInTwelve = (parseInt(hours) % 12) || 12;
    let AMOrPM = parseInt(hours) >= 12 ? 'PM' : 'AM';
    //console.log(hoursInTwelve +" " + AMOrPM + " this is hours in 12hrs format")
    let minutes = data.slice(timeStartIdx + 3, timeStartIdx + 5)
    //console.log(hours + ":" + minutes + " " + AmOrPm + " this is hours in 12hrs format")
    let ampmFormat = hoursInTwelve + ":" + minutes + " " + AMOrPM
    return (ampmFormat)
  }


  function parseIsoDatetime(dtstr) {
    var dt = dtstr.split(/[: T-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
  }

  const handleClick = (event) => {
    console.log(event);
  }

  return (
    <div>
      {/* <CardGroup> */}
      <Row xs={1} md={2} lg={4} className="justify-content-center">
        {events.map(event => {
          return (
            // <CardGroup>
            <Col className="m-3" key={event.event_id}>
            <Card style={{ width: '18rem' }} bg="light">
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
                  <span className="fw-bold">Start Date:</span>
                  <span className="mx-2">{dateConverter(event.start_date_time)}</span>

                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="fw-bold">Start Time:</span>
                  <span className="mx-2">{timeConverter(event.start_date_time)}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="fw-bold">End Time:</span>
                  <span className="mx-2">{timeConverter(event.end_date_time)}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="fw-bold">Event Type:</span>
                  <span className="mx-2">{event.event_type}</span>
                </ListGroup.Item>
              </ListGroup>
              <Button variant="outline-dark" onClick={() => handleClick(event)}>Add To Your Events</Button>
            </Card>
            </Col>
            // {/* </CardGroup> */}
          )
        })}
        </Row>
      {/* </CardGroup> */}
    </div>
  )
}

export default HomePage