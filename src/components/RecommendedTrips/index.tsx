import { Trip } from '@prisma/client'
import React from 'react'
import TripItem from '../TripItem'
import { prisma } from '@/lib/prisma'

async function getTrips() {
  const trips = await prisma.trip.findMany({})

  return trips
}

const RecommendedTrips = async () => {
  const data = await getTrips()

  return(
    <div className='container mx-auto p-5'>
        <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Destinos recomendados</h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5 md:grid grid-cols-5 md:mt-10 md:gap-10">
        {data.map((trip: Trip) => (
          <TripItem 
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>
    </div>
  )
}

export default RecommendedTrips