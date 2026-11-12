
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
