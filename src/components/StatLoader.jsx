import React from 'react'
import ReactLoading  from 'react-loading'

export default function StatLoader() {
    return (
        <div className="statload-container">
            <div className='stat-loader'>
                <ReactLoading type={'bars'} color={'black'} height={'70px'} width={'70px'} />
            </div> 
        </div>
    )
}
