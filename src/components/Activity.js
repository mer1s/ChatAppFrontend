import React from 'react'
import { dummyFeed } from '../dummyData'

// Ovde ce biti aktivnosti, notifikacije i slicno...
const Activity = () => {
  return (
    <div>
        <div className='bg-light w-100 mb-3 border-bottom '>
            <h3 className='p-0 m-0 py-3 fw-light text-muted'>Feed</h3>
        </div>
        {dummyFeed.map(n => 
            <div 
                className='pb pt-3 px-3 border-bottom'
                key={n.feedId}
            >
                <h5 className='p-0 m-0 text-start fw-light'>{n.feedName}</h5>
                <p className='small p-0 m-0 text-end'>{n.since}</p>
            </div>
            )}
    </div>
  )
}

export default Activity