import React from 'react'
import Activity from './Activity'
import ChatList from './ChatList'
import Requests from './Requests/Requests'

const MiddleContainer = ({showTerm}) => {

  return (
    <div className='w-25 mh-100-vh px-3 bg-light'>
      {showTerm === 'chats' && <ChatList />}
      {showTerm === 'notifications' && <Activity />}
      {showTerm === 'requests' && <Requests/>}
    </div>
  )
}

export default MiddleContainer