import React, { useContext } from 'react'
import { FiBell, FiUser, FiMessageSquare, FiLogOut } from 'react-icons/fi'
import { UserContext } from '../contexts/userContext';

const SideNavbar = ({onClickHandler}) => {
    const { user, logOut } = useContext(UserContext)

    const logOutHandler = () =>{
        if(window.confirm('Are you sure?')){
            // ovde ce ici logika za logovanje
            // uklanjanje iz state-a i slicno
            logOut()
        }

    }

  return (
    <div className='min-vh-100 bg-white border-right px-1 d-flex flex-column pt-5'>
        
        <button 
            className='btn btn-white w-100 button-block button-block-flex-column'
            onClick={() => onClickHandler('notifications')} 
        >
            <FiBell className='icon-fs' />
            <h5 className='small text-muted text-center fw-light'>feed</h5>
        </button>

        <button 
            className='btn btn-white button-block mt-4 w-100 button-block-flex-column'
            onClick={() => onClickHandler('chats')}    
        >
            <FiMessageSquare className='icon-fs' />
            <h5 className='small text-muted text-center fw-light'>chat</h5>
        </button>
        {user && 
            <button 
                className='btn btn-white button-block mt-4 w-100 button-block-flex-column'
                onClick={logOutHandler}    
            >
                <FiUser className='icon-fs' />
                <h5 className='small text-muted text-center fw-light'>profile</h5>
            </button>
        }
        <button 
            className='btn btn-white button-block mt-4 w-100 button-block-flex-column'
            onClick={logOutHandler}    
        >
            <FiLogOut className='icon-fs' />
            <h5 className='small p-0 m-0 text-muted text-center fw-light'>log out</h5>
        </button>

    </div>
  )
}

export default SideNavbar