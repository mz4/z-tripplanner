import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Elements/Loader/Loader'
import PropTypes from 'prop-types'
import TripName from '../../components/Trip/TripName'
import ActivityForm from '../../components/Activity/ActivityForm'
import { Trip_main, Trip_inner } from './TripView.style'

import { Col_md_10 } from '../../components/Trip/Trip.style'

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
      <Trip_main>
        <Trip_inner>
          {isLoaded === false ? 
          <Loader 
            size='100' 
            color = '#34d100' 
            sizeUnit = 'px' 
          /> :
          <> 
            <ActivityForm
              tripId= 'aaaaa'
            />
          </>
        }
        </Trip_inner>
      </Trip_main>
    </React.Fragment>
  )
}


export default Trip;