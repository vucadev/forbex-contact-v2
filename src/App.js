/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Summary from './components/Summary'
import New from './components/New'
import NavBar from './components/NavBar'
import List from './components/List'
import { Container } from '@mui/material'
import { DataAccess } from './commons/dataaccess'
import { useCallback, useEffect, useState } from 'react'
import {
  sendmail,
  showGlobalError,
  showLoading,
  hideLoading,
} from './commons/global-utils'

// analytics.setCurrentScreen('HOME')
// analytics.logEvent('app_initialized')

/**
 * CRUD App.
 * @return {Object} The main component.
 */
function App() {
  const [contactsCount, setContactsCount] = useState(-1)
  const [lastDate, setLastDate] = useState(null)
  const [firstDate, setFirstDate] = useState(null)
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    getCountData()
  }, [])

  const getCountData = useCallback(() => {
    DataAccess.getCountData()
      .then(({ lastDate, count }) => {
        console.log('Contacts count:' + count)
        console.log('Contacts last date:' + lastDate)
        setContactsCount(count)
        setLastDate(lastDate)
        // Cambiar por (firstDate)
        setFirstDate(lastDate)
        setShowSummary(true)
      })
      .catch((error) => {
        showGlobalError('Error al obtener datos', error)
      })
  })

  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <NavBar count={contactsCount} />
        </header>
        <Container className="container">
          <Switch>
            <Route path="/new">
              <New />
            </Route>
            <Route path="/list/:filterField/:filterValue">
              <List />
            </Route>
          </Switch>
          <Route path="/" >
            { showSummary ? <Summary firstDate={ firstDate }
              lastDate={ lastDate } /> : null
            }
          </Route>
        </Container>
      </div>
    </Router>
  )
}

export default App
