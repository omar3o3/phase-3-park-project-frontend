import React, { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function YourEvents() {

  const [yourEventsData, setYourEventsData] = useState([]);
  const [boroughsData, setBoroughsData] = useState([]);
  const [eventTypesData, setEventTypesData] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  const [editInputState, setEditInputState] = useState([]);
  const [editState, setEditState] = useState([]);
  


  useEffect(() => {

  })


  useEffect(() => {
    let arr = []
    for (let i = 0; i < yourEventsData.length; i++) {
      arr.push(false)
    }

    setEditState(arr)
  }, [yourEventsData])


  useEffect(() => {
    fetch('http://localhost:9292/your-events')
      .then(resp => resp.json())
      .then(data => setYourEventsData(data))

    fetch('http://localhost:9292/boroughs')
      .then(resp => resp.json())
      .then(data => setBoroughsData(data))

    fetch('http://localhost:9292/event_types')
      .then(resp => resp.json())
      .then(data => setEventTypesData(data))

    fetch('http://localhost:9292/friends')
      .then(resp => resp.json())
      .then(data => setFriendsData(data))
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

  const handleEdit = (id) => {
    setEditState(editState => editState.map((item, idx) => idx === id-1 ? !item : item))
  }

  console.log(editState)

  return (
    <div>
      <Row xs={1} md={2} lg={4} className="justify-content-center">
        {yourEventsData.map(event => {
          return (
            <Col className="m-3" key={event.id}>
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
                    <span className="mx-2">{(boroughsData.filter(borough => borough.id === event.borough_id)).map(borough => borough.borough_name)}</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="fw-bold">Event Date:</span>
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
                    <span className="mx-2">{(eventTypesData.filter(type => type.id === event.event_type_id)).map(type => type.event_type_name)}</span>
                  </ListGroup.Item>

                  {editState[event.id-1] ?
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <textarea className="form-control" placeholder="Invite Friends" aria-label="With textarea" onChange={(e) => setEditInputState(e.target.value)}>
                          {(friendsData.filter(friend => friend.your_event_id === event.id)).map(friend => friend.group_of_names)}
                        </textarea>
                      </InputGroup>
                    </ListGroup.Item>
                    :
                    <ListGroup.Item>
                      <span className="fw-bold">Friends:</span>
                      <span className="mx-2">{(friendsData.filter(friend => friend.your_event_id === event.id)).map(friend => friend.group_of_names)}</span>
                    </ListGroup.Item>
                  }

                  <Button variant="outline-dark" onClick={() => handleEdit(event.id)}>{editState[event.id-1] ? "Done Editing" : "Edit Invitation"}</Button>
                </ListGroup>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default YourEvents