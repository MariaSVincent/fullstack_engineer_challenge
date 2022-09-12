import React from 'react'
import { useState, useEffect } from 'react'

import './App.css'

const SUCCESS = 'Request submitted successfully!'
const FAILER = 'Failed to submit request!'

const App = () => {
  const [supervisors, setSupervisors] = useState([])
  const [emailChecked, setEmailChecked] = useState(false)
  const [phoneChecked, setPhoneChecked] = useState(false)
  const [submitResponse, setSubmitResponse] = useState('')
  const [error, setError] = useState([])

  /* initial set up with GET requeset for supervisrs list */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/supervisors')
        if (response.ok) {
          const data = await response.json()
          setSupervisors(data)
        } else {
          throw new Error(`An error has occured: ${response.status}: ${response.statusText}`)
        }
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  /* this function is called on submit and is using POST request with user input */
  const handleSubmit = (e) => {
    e.preventDefault()

    const postRequest = async () => {
      /* POST request body with minimal inormation required */
      const body = {
        firstName: e.target['firstName'].value,
        lastName: e.target['lastName'].value,
        supervisor: e.target['supervisor'].value 
      }
      /* if Phone is entered, adding it to a body of a request */
      if (e.target.phoneNumber.value.length > 0) {
        body['phoneNumber'] = e.target['phoneNumber'].value
      }
      /* if email is entered, adding it to a body of a request */
      if (e.target.email.value.length > 0) {
        body['email'] = e.target['email'].value
      }

      /* assembling request object */
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
      
      try {
        /* submitting POST request */
        const response = await fetch('/api/submit', request)
        if (response.ok) {
          /* on SUCCESS clearing components state and resetting form */
          setSubmitResponse(SUCCESS)
          setEmailChecked(false)
          setPhoneChecked(false)
          setError([])
          e.target.reset()
        } else {
          /* on Failer setting an errors array to render to a user */ 
          const message = await response.json()
          setSubmitResponse(FAILER)
          setError(message.error)
          throw new Error(`An error has occured: ${ response.status }: ${ response.statusText }; ${ message.error }`)
        }
      } catch(error) {
        console.log(error)
      }
    } 
    postRequest()
  }

  return (
    <div className='container'>
      <h1>Notification Form</h1>
      <div>
        <form className='form' onSubmit={ handleSubmit }>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <br />
            <input type='text' name='firstName' required/>
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <br />
            <input type='text' name='lastName' required/>
          </div>
          <div className='notification-row'>
            <label htmlFor='notificaitons'>How would you prefer to be notified?</label>
          </div>
          <div>
            <div className='checkbox'>
              <input type='checkbox' id='email-checkbox' name='email-checkbox' checked={ emailChecked } onChange={() => setEmailChecked(!emailChecked) }/>
              <label htmlFor='email-checkbox'>Email</label>
            </div>
            <input type='email' id='email' name='email' disabled={ !emailChecked }/>
          </div>
          <div>
            <div className='checkbox'>
              <input type='checkbox' id='phone-checkbox' name='phone-checkbox' checked={ phoneChecked } onChange={() => setPhoneChecked(!phoneChecked)} />
              <label htmlFor='phone-checkbox'>Phone Number</label>
            </div>
            <input type='tel' id='phoneNumber' name='phoneNumber' disabled={ !phoneChecked } />
          </div>
          <div className='supervisor-row'>
            <div>
              <label htmlFor='supervisor' id='supervisor-name'>Supervisor
                <br />
                <select id='supervisor' name='supervisor' required>
                  <option default value=''>Select...</option>
                  {
                    supervisors.map((supervisor, i) => <option key={ i }>{ supervisor }</option>)
                  }
                </select>
              </label>
            </div>
          </div>
          <div className='submit'>
            <input type='submit' value="SUBMIT"></input>
          </div>
          <div className='response'>
            <div style={{textAlign: 'center' }}>{ submitResponse }</div>
            <div>
              {
                error.map((e, i) => <div key={ i }>{ e }</div>)
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
