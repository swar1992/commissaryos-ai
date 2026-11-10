
import type { DashboardStat } from '../types/operations'

interface StatCardProps {
  stat: DashboardStat
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <article className="stat-card">
      <span className="stat-icon" aria-hidden="true">
        {stat.icon}
      </span>
      <h2>{stat.value}</h2>
      <p>{stat.label}</p>
    </article>
  )
}
