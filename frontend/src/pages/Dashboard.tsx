
import StatCard from '../components/StatCard'
import DashboardHeader from '../components/DashboardHeader'
import type {
  DashboardStat,
  CommissaryVisit,
} from '../types/operations'

interface DashboardProps {
  apiConnected: boolean
}

const stats: DashboardStat[] = [
  { label: 'Registered Trucks', value: 12, icon: '🚚' },
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

export default function Dashboard({
  apiConnected,
}: DashboardProps) {
  return (
    <main className="dashboard">
      <DashboardHeader apiConnected={apiConnected} />

      <section className="stats-grid">
        {stats.map(stat => (
          <StatCard key={stat.label} stat={stat} />
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
