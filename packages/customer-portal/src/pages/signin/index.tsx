import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import * as yup from 'yup'
import { signin } from 'services/user'
import { setToken, isExpired, getToken } from 'states/token'

export default function Signin() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const token = getToken()
    if (token && !isExpired(token)) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const [err, setErr] = useState<string | null>(null)
  const { values, errors, isValid, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        const resp = await signin(values)
        const body = await resp.json()
        if (resp.status <= 300) {
          const token = body.token as string
          setToken(token)
          if (location.search) {
            const params = new URLSearchParams(location.search)
            const redirect = params.get('redirect')
            navigate(redirect ?? '/', { replace: true })
          } else {
            navigate('/', { replace: true })
          }
        } else {
          const err = body.error
          setErr(err.message)
        }
      } catch (err: unknown) {
        setErr((err as any).msssage)
      }
    },
  })

  useEffect(() => {
    if (err) {
      setErr(null)
    }
  }, [values])

  return (
    <Card
      css={`
        width: 18rem;
        margin: 0 auto;
        padding: 1rem;
      `}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label name="password">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isValid}>
          Submit
        </Button>
        <p>
          Don't have an account yet?<Link to="/signup">Sign Up</Link>
        </p>

        <p>{err}</p>
      </Form>
    </Card>
  )
}
