import React, { Component } from 'react'
import Loader from './Loader'
export class Spinner extends Component {
    render() {
        return (
            <div className='container d-flex justify-content-around flex-wrap align-items-end'>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
            </div>
        )
    }
}

export default Spinner