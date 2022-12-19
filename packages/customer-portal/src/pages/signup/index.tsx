import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { signup } from 'services/user'
import * as yup from 'yup'

export default function Signin() {
  const [errMsg, setErrMsg] = useState<string | null>()
  const navigate = useNavigate()
  const { values, errors, isValid, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        const resp = await signup(values)
        if (resp.status === 200) {
          navigate('/signin')
        } else {
          setErrMsg('unknown error occurs')
        }
      } catch (err: any) {
        setErrMsg(err.message)
      }
    },
  })

  useEffect(() => {
    setErrMsg(null)
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
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
          <Form.Text className="text-muted" name="email">
            We'll never share your email with anyone else.
          </Form.Text>
          <br />
          <Form.Text
            className="text-muted"
            name="email"
            css={`
              color: red !important;
            `}>
            {errors.email}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleChange} />
          <Form.Text
            id="passwordHelpBlock"
            className="text-muted"
            name="email"
            css={`
              color: red !important;
            `}>
            {errors.username}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
          <Form.Text
            name="password"
            className="text-muted"
            css={`
              color: red !important;
            `}>
            {errors.password}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p
          css={`
            color: red;
          `}>
          {errMsg}
        </p>
      </Form>
    </Card>
  )
}
