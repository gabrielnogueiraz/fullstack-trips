'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyTrips = () => {
  const [reservations, setReservations] = useState()
  const { status, data } = useSession()

  const router = useRouter()

  useEffect(() => {
    if(status === 'unauthenticated' || !data?.user){
      router.push('/')
    }

    const fetchReservations = async () => {
      const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`)
      const json = await response.json()

      setReservations(json)
    }

    fetchReservations()
  },[status])

  return (
    <div>My Trips</div>
  );
}

export default MyTrips;