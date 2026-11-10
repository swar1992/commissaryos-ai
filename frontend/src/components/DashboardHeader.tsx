
interface DashboardHeaderProps {
  apiConnected: boolean
}

export default function DashboardHeader({
  apiConnected,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>CommissaryOS AI</h1>
        <p>Food Truck Commissary Operations</p>
      </div>

      <span
        className={
          apiConnected ? 'api-status connected' : 'api-status disconnected'
        }
      >
        {apiConnected ? '● API Connected' : '● API Disconnected'}
      </span>
    </header>
  )
}
