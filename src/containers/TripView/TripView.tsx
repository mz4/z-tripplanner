import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Elements/Loader/Loader'
import PropTypes from 'prop-types'
import TripName from '../../components/Trip/TripName'
import { App_main, App_inner } from '../App/App.style'

import { Trip_main, Col_md_10 } from '../../components/Trip/Trip.style'

const Trip = (props) => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  })

  return (
    <React.Fragment>
      <App_main>
        <App_inner>
          {isLoaded === false ? 
          <Loader 
            size='100' 
            color = '#34d100' 
            sizeUnit = 'px' 
          /> :
          <> 
            <h4>ID: {id}</h4>
          </>
        }
        </App_inner>
      </App_main>
    </React.Fragment>
  )
}


export default Trip;