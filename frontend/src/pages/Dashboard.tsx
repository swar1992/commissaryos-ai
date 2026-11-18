
import StatCard from '../components/StatCard'
import DashboardHeader from '../components/DashboardHeader'

import { useEffect, useState } from 'react'
import {
  getFoodTrucks,
  getFoodTruckById,
} from '../api/foodTruckApi'
import type { FoodTruck } from '../api/foodTruckApi'
import AddFoodTruckForm from '../components/AddFoodTruckForm'


import type {
  DashboardStat,
  CommissaryVisit,
} from '../types/operations'

interface DashboardProps {
  apiConnected: boolean
}



export default function Dashboard({
  apiConnected,
}: DashboardProps) {

const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
const [searchTerm, setSearchTerm] = useState('')
const [trucksLoading, setTrucksLoading] = useState(true)
const [trucksError, setTrucksError] = useState<string | null>(null)
const [selectedTruck, setSelectedTruck] = useState<FoodTruck | null>(null)
const [detailsLoading, setDetailsLoading] = useState(false)
const [detailsError, setDetailsError] = useState<string | null>(null)

useEffect(() => {
  let cancelled = false

  async function loadFoodTrucks() {
    try {
      const trucks = await getFoodTrucks()

      if (!cancelled) {
        setFoodTrucks(trucks)
      }
    } catch (error) {
      if (!cancelled) {
        setTrucksError(
          error instanceof Error ? error.message : 'Unknown error'
        )
      }
    } finally {
      if (!cancelled) {
        setTrucksLoading(false)
      }
    }
  }

  void loadFoodTrucks()

  return () => {
    cancelled = true
  }
}, [])

const stats: DashboardStat[] = [
  { label: 'Registered Trucks', value: foodTrucks.length, icon: '🚚' },
  { label: "Today's Visits", value: 8, icon: '📅' },
  { label: 'Pending Check-ins', value: 3, icon: '⏰' },
  { label: 'Compliance Alerts', value: 2, icon: '⚠️' },
]

const visits: CommissaryVisit[] = [
  {
    id: 1,
    truckName: 'Taco Express',
    scheduledTime: '09:00 AM',
    status: 'CHECKED_IN',
  },
  {
    id: 2,
    truckName: 'Rolling Kitchen',
    scheduledTime: '11:30 AM',
    status: 'SCHEDULED',
  },
  {
    id: 3,
    truckName: 'Street Bites',
    scheduledTime: '02:00 PM',
    status: 'ACTION_NEEDED',
  },
]
const filteredFoodTrucks = foodTrucks.filter((truck) => {
  const query = searchTerm.toLowerCase().trim()

  return (
    truck.businessName.toLowerCase().includes(query) ||
    truck.ownerName.toLowerCase().includes(query) ||
    truck.licenseNumber.toLowerCase().includes(query)
  )
})
async function handleTruckClick(truckId: string) {
  setDetailsLoading(true)
  setDetailsError(null)
  setSelectedTruck(null)

  try {
    const truck = await getFoodTruckById(truckId)
    setSelectedTruck(truck)
  } catch (error) {
    setDetailsError(
      error instanceof Error ? error.message : 'Unable to load truck'
    )
  } finally {
    setDetailsLoading(false)
  }
}
  return (
    <main className="dashboard">
      <DashboardHeader apiConnected={apiConnected} />

      <section className="stats-grid">
        {stats.map(stat => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

         <div>
      {trucksLoading
        ? 'Loading food trucks...'
        : trucksError
          ? `API Error: ${trucksError}`
          : `Loaded ${foodTrucks.length} food truck(s) from PostgreSQL`}
    </div>
    <section className="add-truck-section">
  <AddFoodTruckForm
    onTruckCreated={(newTruck) => {
      setFoodTrucks(previous => [...previous, newTruck])
    }}
  />
</section>
    <section>
  <h2>Registered Food Trucks</h2>
  <input
  type="search"
  placeholder="Search by business, owner, or license..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>

   {/* {filteredFoodTrucks.map((truck) =>(
  //foodTrucks.map((truck) => (
    <div key={truck.id}>
      <h3>{truck.businessName}</h3>
      <p>Owner: {truck.ownerName}</p>
      <p>License: {truck.licenseNumber}</p>
      <p>Status: {truck.active ? 'Active' : 'Inactive'}</p>
    </div>
  ))}  */}
  {filteredFoodTrucks.map((truck) => (
  <div key={truck.id}>
    <button
      type="button"
      onClick={() => handleTruckClick(truck.id)}
    >
      {truck.businessName}
    </button>

    <p>Owner: {truck.ownerName}</p>
    <p>License: {truck.licenseNumber}</p>
    <p>Status: {truck.active ? 'Active' : 'Inactive'}</p>
  </div>
))}
</section>
<section className="truck-details">
  <h2>Food Truck Details</h2>

  {detailsLoading && <p>Loading truck details...</p>}

  {detailsError && (
    <p role="alert">Error: {detailsError}</p>
  )}

  {selectedTruck && (
    <div>
      <h3>{selectedTruck.businessName}</h3>
      <p>Truck ID: {selectedTruck.id}</p>
      <p>Owner: {selectedTruck.ownerName}</p>
      <p>License: {selectedTruck.licenseNumber}</p>
      <p>Email: {selectedTruck.contactEmail}</p>
      <p>
        Status: {selectedTruck.active ? 'Active' : 'Inactive'}
      </p>
    </div>
  )}
</section>
      <section className="activity-card">
        <div className="section-heading">
          <h2>Today's Commissary Activity</h2>
          <span className="demo-label">Demo Data</span>
        </div>

        <div className="activity-list">
          {visits.map(visit => (
            <div className="activity-row" key={visit.id}>
              <div>
                <strong>{visit.truckName}</strong>
                <p>{visit.scheduledTime}</p>
              </div>

              <span className={`visit-status ${visit.status.toLowerCase()}`}>
                {visit.status.replaceAll('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
