const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8080
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

const SUPERVISORS_URL = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
const NAME_PATTERN = /^[a-zA-Z]*$/
const PHONE_NUMBER_PATTERN = /^\d?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get('/api/supervisors', (req, res) => {
  try {
    const fetchData = async () => {
      const response= await fetch(SUPERVISORS_URL)
      if (response.ok) {
        const supervisors = await response.json()
        supervisors.sort(compare)
        /* formatting supervisors fields to match a format: '<jurisdiction> - <lastName>, <firstName>' */
        for (let i in supervisors) {
          supervisors[i] = supervisors[i].jurisdiction + ' - ' + supervisors[i].lastName + ', ' + supervisors[i].firstName
        }

        res.send(supervisors)
      } else {
        throw new Error(`An error has occured: ${response.status}: ${response.statusText}`)
      }
    }
    fetchData()
  } catch(error) {
    console.log(error)
    res.send(error)
  }
})

app.post('/api/submit', (req, res) => {
  /* validating submitted fields, and collecting errors into errArr */
  let errArr = []
  if (!validateInput(req.body.firstName, NAME_PATTERN)) {
    errArr.push(`First Name: '${req.body.firstName}' must only contain letters.`)
  }
  if (!validateInput(req.body.lastName, NAME_PATTERN)) {
    errArr.push(`Last Name: '${req.body.lastName}' must only contain letters.`)
  }
  if (req.body.phoneNumber && !validateInput(req.body.phoneNumber, PHONE_NUMBER_PATTERN)) {
    errArr.push(`Phone Number: '${req.body.phoneNumber}' is invalid.`)
  }
  if (req.body.email && !validateInput(req.body.email, EMAIL_PATTERN)) {
    errArr.push(`Email address: '${req.body.email}' is invalid.`)
  }

  /* if there were no errors, responding with SUCCESS message to console and user */
  if (errArr.length === 0) {
    console.log('SUCCESS!')
    console.log({ body: req.body })
    res
      .status(200)
      .send()
  } else {
    /* if there were errors, responding with FAILURE message and errors to console and user */ 
    console.log('FAILURE!')
    console.log({body: req.body, errors: [...errArr]})
    res
    .status(400)
    .json({ error: errArr })
    .send()
  }
})

/* functions to validate input against a pattern */
const validateInput = (input, pattern) => {
  return input.match(pattern)
}

/* function to sort supervisors by juristiction, then by last name, then by first name */
const compare = (a, b) => {
  if (a.jurisdiction < b.jurisdiction) return -1
  if (a.jurisdiction > b.jurisdiction) return 1

  if (a.lastName < b.lastName) return -1
  if (a.lastName > b.lastName) return 1

  if (a.firstName < b.firstName) return -1
  if (a.firstName > b.firstName) return 1

  return 0
}


app.listen(PORT, () => console.log(`LightFeather coding challenge app is listening on port ${PORT}!`))
