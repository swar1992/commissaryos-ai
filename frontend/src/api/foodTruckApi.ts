
export interface FoodTruck {
  id: string
  commissaryId: string
  businessName: string
  ownerName: string
  licenseNumber: string
  contactEmail: string
  active: boolean
}

const COMMISSARY_ID =
  '91acacb2-73e1-4d82-8e18-4593bae8d514'

export async function getFoodTrucks(): Promise<FoodTruck[]> {
  const response = await fetch(
    `/api/v1/commissaries/${COMMISSARY_ID}/food-trucks`
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch food trucks: ${response.status}`
    )
  }

  return response.json() as Promise<FoodTruck[]>
}

export interface CreateFoodTruckRequest {
  businessName: string
  ownerName: string
  licenseNumber: string
  contactEmail: string
}

export async function createFoodTruck(
  request: CreateFoodTruckRequest
): Promise<FoodTruck> {
  const response = await fetch(
    `/api/v1/commissaries/${COMMISSARY_ID}/food-trucks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to create food truck: ${response.status}`
    )
  }
  return response.json() as Promise<FoodTruck>
}

export async function getFoodTruckById(
  truckId: string
): Promise<FoodTruck> {
  const response = await fetch(
    `/api/v1/commissaries/${COMMISSARY_ID}/food-trucks/${truckId}`
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch food truck ${truckId}: ${response.status}`
    )
  }

  return response.json() as Promise<FoodTruck>
}
