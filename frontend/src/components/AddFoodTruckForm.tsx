import { useState } from 'react'
import {
  createFoodTruck,
  type FoodTruck,
  type CreateFoodTruckRequest,
} from '../api/foodTruckApi'

interface AddFoodTruckFormProps {
  onTruckCreated: (truck: FoodTruck) => void
}

export default function AddFoodTruckForm({
  onTruckCreated,
}: AddFoodTruckFormProps) {
  const [form, setForm] = useState<CreateFoodTruckRequest>({
    businessName: '',
    ownerName: '',
    licenseNumber: '',
    contactEmail: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setForm(previous => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const createdTruck = await createFoodTruck(form)
      onTruckCreated(createdTruck)

      setForm({
        businessName: '',
        ownerName: '',
        licenseNumber: '',
        contactEmail: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add truck')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Food Truck</h2>

      <input
        name="businessName"
        placeholder="Business name"
        value={form.businessName}
        onChange={handleChange}
        required
      />

      <input
        name="ownerName"
        placeholder="Owner name"
        value={form.ownerName}
        onChange={handleChange}
        required
      />

      <input
        name="licenseNumber"
        placeholder="License number"
        value={form.licenseNumber}
        onChange={handleChange}
        required
      />

      <input
        name="contactEmail"
        type="email"
        placeholder="Contact email"
        value={form.contactEmail}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Food Truck'}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  )
}