
import StatCard from '../components/StatCard'
import DashboardHeader from '../components/DashboardHeader'

import { useEffect, useState } from 'react'
import { getFoodTrucks } from '../api/foodTruckApi'
import type { FoodTruck } from '../api/foodTruckApi'

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
const [trucksLoading, setTrucksLoading] = useState(true)
const [trucksError, setTrucksError] = useState<string | null>(null)

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
    <section>
  <h2>Registered Food Trucks</h2>

  {foodTrucks.map((truck) => (
    <div key={truck.id}>
      <h3>{truck.businessName}</h3>
      <p>Owner: {truck.ownerName}</p>
      <p>License: {truck.licenseNumber}</p>
      <p>Status: {truck.active ? 'Active' : 'Inactive'}</p>
    </div>
  ))}
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
