import React from 'react'
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow';

const MainContainer = ({showTerm}) => {
    
  const { activeRoom } = useSelector((state) => state.chat);

  return (
    <div className='h-100-auto-overflow p-3 w-100'>
        {showTerm === 'chats' && activeRoom !== null ? <ChatWindow room={activeRoom} /> : ''}
        {showTerm === 'empty' && ''}
    </div>
  )
}

export default MainContainer