import React, { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function HomePage() {
  const [events, setEvents] = useState([]);
  const [inputState , setInputState] = useState([]);
  const [addEventState , setAddEventState] = useState(true);


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

  const handlePost = ({event , inputState}) => {
    // console.log(event);
    // console.log(inputState);
    // this.setAddEventState(true)

    fetch('http://localhost:9292/add-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        inputState
      }),
    })
  }

  return (
    <div>
      <Row xs={1} md={2} lg={4} className="justify-content-center">
        {events.map(event => {
          return (
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

                  <ListGroup.Item>
                    <InputGroup className="mb-3">
                      <textarea className="form-control" placeholder="Invite Friends" aria-label="With textarea" onChange={(e) => setInputState(e.target.value)}></textarea>
                    </InputGroup>
                  </ListGroup.Item>

                <Button variant="outline-dark" onClick={() => handlePost({event , inputState})}>Add To Your Events</Button>
                </ListGroup>
                  
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default HomePage