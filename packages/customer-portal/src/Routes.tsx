import { Routes, Route,  useLocation, redirect, useNavigate, Navigate  } from 'react-router-dom'
import Home from 'pages/home'
import Reservations from 'pages/reservations'
import Signin from 'pages/signin'
import Signup from 'pages/signup'
import { isExpired, token, getToken } from 'states/token'
import { interval, combineLatest } from 'rxjs'
import React, { useState, useEffect } from 'react'
import MyNav from 'components/nav'

function Protected() {
  return <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservations/*" element={<Reservations />} />
    </Routes>
}

function RequireAuthencated({children}: {children: React.ReactNode}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    const token = getToken()
    if (token && !isExpired(token)) {
      return true
    }
    return false
  })
  useEffect(() => {
    const subscription = combineLatest([token, interval(1000 * 60 * 5)]).subscribe(([t]) => {
      if (!t || isExpired(t)) {
        setAuthenticated(false)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (authenticated) { 
    return <><MyNav /><div css={`padding: 16px;`}>{children}</div></>
  }
  return <Navigate to={`/signin?redirect=${location.pathname}`}  />
}

export default function MyRoutes() {
  const location = useLocation()
  

  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route
        path="/*"
        element={
          <RequireAuthencated>
            <Protected />
          </RequireAuthencated>
        }
      />
    </Routes>
  )
}

