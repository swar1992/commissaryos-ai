
export interface HealthResponse {
  status: string
  application: string
  version: string
}

export async function getBackendHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/v1/health')

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`)
  }

  return response.json() as Promise<HealthResponse>
}
