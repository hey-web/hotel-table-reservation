import { useEffect, useState, useCallback } from 'react'
import Badge from 'react-bootstrap/Badge'
import dayjs from 'dayjs'
import DateTimePicker from 'react-datetime-picker'
import { useObservable } from 'rxjs-hooks'
import relativeTime from 'dayjs/plugin/relativeTime'
import { get, update, create } from 'services/reservation'
import { tables$ } from 'states/table'
import { Reservation, Status } from 'types/reservation'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import * as yup from 'yup'

dayjs.extend(relativeTime)

function NewReservation() {
  const [show, setShow] = useState<boolean>(false)
  const tables = useObservable(() => tables$)
  const [arrival_time, onArrivalTimeChange] = useState(new Date())
  const { values, handleSubmit, handleChange, isValid, setFieldValue } = useFormik({
    initialValues: {
      guest_name: '',
      guest_email: '',
      guest_phone: '',
      arrival_time: '',
      reserved_tables: [],
    },
    validationSchema: yup.object({
      guest_name: yup.string().required(),
      guest_email: yup.string().required(),
      guest_phone: yup.string().required(),
      arrival_time: yup.string().required(),
      reserved_tables: yup.array(),
    }),
    onSubmit: async (values, helper) => {
      try {
        const resp = await create(values)
        setShow(false)
      } catch (err) {
        console.error(err)
      }
    },
  })

  useEffect(() => {
    setFieldValue('arrival_time', dayjs(arrival_time).format())
  }, [arrival_time])
  return (
    <>
      <Button onClick={() => setShow(true)}>New Reservation</Button>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Reservation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Guest Name</Form.Label>
              <Form.Control type="text" placeholder="Enter guest name" name="guest_name" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Guest Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter guest email" name="guest_email" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Guest Phone No.</Form.Label>
              <Form.Control type="phone" placeholder="Enter guest phone" name="guest_phone" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicArrivalTime">
              <Form.Label>Arrival Time</Form.Label>
              <DateTimePicker
                amPmAriaLabel="Select AM/PM"
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                hourAriaLabel="Hour"
                maxDetail="second"
                minuteAriaLabel="Minute"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date and time"
                onChange={onArrivalTimeChange}
                secondAriaLabel="Second"
                value={arrival_time}
                yearAriaLabel="Year"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTables">
              <Form.Label>Tables</Form.Label>
              {tables?.map((table) => (
                <Form.Check inline label={table} name="reserved_tables" type="checkbox" onChange={handleChange} value={table} />
              ))}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  const [err, setErr] = useState<string | null>(null)
  const [showDetails, setShow] = useState<boolean>(false)
  const handleCancel = useCallback(() => {
    reservation.status = Status.Canceled
    const asyncCall = async () => {
      try {
        const resp = await update(reservation)
        const body = await resp.json()
        if (resp.status <= 300) {
          setErr(null)
        } else {
          const err = body.error
          setErr(err.message)
        }
      } catch (err: unknown) {
        setErr((err as any).msssage)
      }
    }
    asyncCall()
  }, [reservation])
  return (
    <Card
      css={`
        width: 18rem;
      `}>
      <Card.Body>
        <Card.Text>
          <div
            css={`
              display: flex;
              flex-flow: row wrap;
              gap: 8px;
            `}>
            {reservation.reserved_tables.map((t) => (
              <span>Table-{t}</span>
            ))}
          </div>
          <div>{dayjs().to(reservation.arrival_time)}</div>
          <Badge bg="secondary">{reservation.status}</Badge>
        </Card.Text>
        <Button onClick={() => setShow(true)}>View details</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        <Offcanvas show={showDetails} onHide={() => setShow(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Reservation Details</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div>
              Reservated Tables:
              <div
                css={`
                  display: flex;
                  flex-flow: row wrap;
                  gap: 8px;
                `}>
                {reservation.reserved_tables.map((t) => (
                  <span key={t}>Table-{t}</span>
                ))}
              </div>
            </div>
            <div
              css={`
                padding: 8px 0;
              `}>
              <h2
                css={`
                  font-size: 16px;
                  margin: 0;
                `}>
                Guest Information:
              </h2>
              name: {reservation.guest_name}
              <br />
              email: {reservation.guest_email}
              <br />
              phone: {reservation.guest_phone}
            </div>
            <div>arrive time: {dayjs(reservation.arrival_time).format('MMM DD YYYY, HH:mm')}</div>
            <div>created {dayjs(reservation.created_at).fromNow()}</div>
          </Offcanvas.Body>
        </Offcanvas>
      </Card.Body>
    </Card>
  )
}

export default function Home() {
  const [err, setErr] = useState<string | null>(null)
  const [reservations, setReservation] = useState<Reservation[]>()
  useEffect(() => {
    const asyncCall = async () => {
      try {
        const resp = await get()
        const body = await resp.json()
        if (resp.status <= 300) {
          setReservation(body as Reservation[])
        } else {
          const err = body.error
          setErr(err.message)
        }
      } catch (err) {
        setErr((err as any).msssage)
      }
    }

    asyncCall()
  }, [])
  return (
    <div>
      <div>
        <NewReservation />
      </div>
      {reservations?.map((r) => (
        <ReservationCard reservation={r} key={r.id} />
      ))}
    </div>
  )
}
