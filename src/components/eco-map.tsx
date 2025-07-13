'use client'

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Skeleton } from './ui/skeleton'

const containerStyle = {
  width: '100%',
  height: '100%',
}

// Centered on a major city as a default
const center = {
  lat: 40.7128,
  lng: -74.006,
}

const ecoLocations = [
  { id: 1, pos: { lat: 40.7228, lng: -73.996 } },
  { id: 2, pos: { lat: 40.7528, lng: -74.009 } },
  { id: 3, pos: { lat: 40.7028, lng: -74.016 } },
]

export function EcoMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  if (!isLoaded) {
    return <Skeleton className="h-full w-full" />
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {ecoLocations.map((location) => (
        <Marker key={location.id} position={location.pos} />
      ))}
    </GoogleMap>
  )
}
