
export interface DashboardStat {
  label: string
  value: number
  icon: string
}

export type VisitStatus =
  | 'CHECKED_IN'
  | 'SCHEDULED'
  | 'ACTION_NEEDED'

export interface CommissaryVisit {
  id: number
  truckName: string
  scheduledTime: string
  status: VisitStatus
}
