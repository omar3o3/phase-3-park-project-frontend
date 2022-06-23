import React, { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function YourEvents() {

  const [eventsData, setEventsData] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/your-events')
      .then(resp => resp.json())
      .then(data => setEventsData(data))
    // .then(data => console.log(data))
    // .then(data => console.log(timeConverter(data[0].your_events[0].start_date_time)))
  }, []) 

  // Thie function transfer date to the format we want
  let dateConverter = (data) => {
    let dateEndIdx = data.indexOf("T")
    let date = data.slice(0, dateEndIdx).split('-')
    let newDateFormat = date.join('/')
    return (newDateFormat)
  }

  // Thie function transfer 24hr time format to 12hr time format
  let timeConverter = (data) => {
    let timeStartIdx = data.indexOf("T") + 1
    let hours = data.slice(timeStartIdx, timeStartIdx + 2)
    let hoursInTwelve = (parseInt(hours) % 12) || 12;
    let AMOrPM = parseInt(hours) >= 12 ? 'PM' : 'AM';
    let minutes = data.slice(timeStartIdx + 3, timeStartIdx + 5)
    let ampmFormat = hoursInTwelve + ":" + minutes + " " + AMOrPM
    return (ampmFormat)
  }
  // console.log(eventsData)
  // console.log("above is eventsData")
  // console.log(eventsData[0].borough_name)
  // console.log("this level contains borough_name, event_types and your_events object")
  //console.log(eventsData[0].your_events)


  return (
    <div>
      <Row xs={1} md={2} lg={4} className="justify-content-center">
      {eventsData.map(borough => borough.your_events).map(events => events.map(event => console.log(event.friend)))}
      </Row>
    </div>











    // <div>
    //   <Row xs={1} md={2} lg={4} className="justify-content-center">
    //     {eventsData.map(event => {
    //       return (
    //         <Col className="m-3" key={event.your_events.id}>
    //           <Card style={{ width: '18rem' }} bg="light">

    //             <Card.Body>
    //               <Card.Title className="fs-3">{event.your_events.event_name}</Card.Title>
    //               <Card.Text>
    //                 <span className="fw-bold">Location:</span>
    //                 <span className="mx-2">{event.your_events.event_location}</span>
    //               </Card.Text>
    //             </Card.Body>

    //             <ListGroup className="list-group-flush">

    //               <ListGroup.Item>
    //                 <span className="fw-bold">Borough:</span>
    //                 <span className="mx-2">{event.borough_name}</span>
    //               </ListGroup.Item>

    //               {/* <ListGroup.Item>
    //                 <span className="fw-bold">Start Date:</span>
    //                 <span className="mx-2">{dateConverter(event.your_events.start_date_time)}</span>
    //               </ListGroup.Item>

    //               <ListGroup.Item>
    //                 <span className="fw-bold">Start Time:</span>
    //                 <span className="mx-2">{timeConverter(event.your_events.start_date_time)}</span>
    //               </ListGroup.Item>

    //               <ListGroup.Item>
    //                 <span className="fw-bold">End Time:</span>
    //                 <span className="mx-2">{timeConverter(event.your_events.end_date_time)}</span>
    //               </ListGroup.Item> */}

    //               <ListGroup.Item>
    //                 <span className="fw-bold">Event Type:</span>
    //                 <span className="mx-2">{event.event_types.event_type_name}</span>
    //               </ListGroup.Item>

    //             </ListGroup>

    //           </Card>
    //         </Col>
    //       )
    //     })}
    //   </Row>
    // </div>
  )
}

export default YourEvents