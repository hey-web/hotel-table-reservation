import myServiceClient from './my-service-client'
import { Reservation } from 'types/reservation'

export async function get() {
  return myServiceClient.request('/orders', { method: 'get' })
}

export async function getById(id: string) {
  return myServiceClient.request(`/orders/${id}`, { method: 'get' })
}

export async function update(reservation: Reservation) {
  return myServiceClient.request(`/orders/${reservation.id}`, { method: 'patch', body: reservation })
}

export async function create(reservation: Omit<Reservation, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status' | 'journey'>) {
  return myServiceClient.request(`/orders`, { method: 'post', body: reservation })
}
