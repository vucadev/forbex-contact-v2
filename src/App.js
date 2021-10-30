/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Summary from './components/Summary'
import New from './components/New'
import NavBar from './components/NavBar'
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
 * CRUD example App with React.
 * @return {Object} The main component.
 */
function App() {
  const [contactsCount, setContactsCount] = useState(-1)

  useEffect(() => {
    getCountData()
  }, [])

  const getCountData = useCallback(() => {
    DataAccess.getCountData()
      .then((count) => {
        console.log('Contacts count:' + count)
        setContactsCount(count)
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
            <Route exact path="/">
              <Summary />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  )
}

export default App
