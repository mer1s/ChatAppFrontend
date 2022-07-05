import React, { } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'

const dymmyMessages = [
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },{
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },{
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },{
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },{
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 1,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
    {
        senderId: 2,
        content: 'Lorem ipsum'
    },
]

const ChatWindow = ({room}) => {

  return (
    <div className='px-3 bg-light-transparent rounded h-100 d-flex flex-column'>
        <h2 className='py-3 m-0'>{room.name}</h2>
        <div className='flex-fill p-3 border overflow-auto d-flex flex-column justify-content-end'>
            {/* mapirane poruke */}
            {dymmyMessages.map(n =>
                <div key={n.senderId} className={n.senderId === 1 ? 'd-flex justify-content-end' : 'd-flex justify-content-start'}>
                    <p className={`p-2 px-4 rounded ${n.senderId !== 1 ? 'bg-primary text-light':'bg-light text-dark'}`}>{n.content}</p>
                </div>
            )}
        </div>
        <Form style={{height:'100px'}} className=''>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Enter your messagge..."
                aria-label="Enter your messagge..."
                aria-describedby="basic-addon2"
                />
                <Button className='px-5' variant="outline-secondary" id="button-addon2">
                    Send
                </Button>
            </InputGroup>
        </Form>
    </div>
  )
}

export default ChatWindow