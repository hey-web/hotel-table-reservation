export enum Status {
  Initial = 'initial',
  Completed = 'completed',
  Canceled = 'canceled'
}

export interface Reservation {
  id: string,
  user_id: string,
  status: Status
  created_at: string
  updated_at: string
  guest_name: string
  guest_email: string
  guest_phone: string
  arrival_time: string
  reserved_tables: string[]
  journey: {message: string, created_at: string}[]
}