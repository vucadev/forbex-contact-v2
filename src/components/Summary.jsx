/* eslint-disable no-unused-vars */
import { Fragment, useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import { Button, Card, Collapse, Divider } from '@mui/material'
import DataTable from './DataTable'
import {
  countryColumnsDef,
  channelColumnsDef,
  salesColumnsDef,
  referencesColumnsDef,
  sportsColumnsDef,
} from '../assets/summary-columns-def'
// import { rowsGrid as mockData } from '../assets/mockData'
import { DataAccess } from '../commons/dataaccess'
import { showGlobalError, formatDate } from '../commons/global-utils'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 *
 * @param {Date} lastDate Ultima fecha en sistema
 * @return {Object} Component for Listing entities
 */
export default function Summary({ firstDate, lastDate }) {
  const [dateFilter, setDateFilter] = useState([firstDate,
    lastDate ?? new Date()])
  const [resultLength, setResultLength] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [disabledSearch, setDisabledSearch] = useState(false)
  const [countryRows, setCountryRows] = useState([])
  const [sportsRows, setSportsRows] = useState([])
  const [channelRows, setChannelRows] = useState([])
  const [salesRows, setSalesRows] = useState([])
  const [referencesRows, setReferencesRows] = useState([])
  const history = useHistory()
  const [hidden, setHidden] = useState([false])

  Summary.propTypes = {
    lastDate: PropTypes.instanceOf(Date).isRequired,
    firstDate: PropTypes.instanceOf(Date).isRequired,
  }

  const hideSummary = () => {
    setHidden(true)
  }

  const getActionDef = (field) => {
    return {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (values) => {
        const onClick = (e) => {
          e.stopPropagation()
          const start = formatDate(dateFilter[0])
          const end = formatDate(dateFilter[1])
          const dateRangeFilter = `since=${start}&upto=${end}`
          hideSummary()
          history.push(`/list/${field}/${values.row.id}?${dateRangeFilter}`)
        }

        return <Button
          onClick={onClick}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16, lineHeight: 1 }}
        >
          Listar
        </Button>
      },
    }
  }

  const search = () => {
    setShowResults(false)
    // Show loading animation

    // Agrego actions a las tablas
    countryColumnsDef.push(getActionDef('country'))
    channelColumnsDef.push(getActionDef('channel'))
    salesColumnsDef.push(getActionDef('sales'))
    referencesColumnsDef.push(getActionDef('references'))
    sportsColumnsDef.push(getActionDef('sport'))

    // Do magic to get data filter by date range, result goes in setDataList
    getData(dateFilter)

    // Stop loading animation
    return true
  }

  /* Obtenemos data resumen */
  const getData = useCallback((dateRange) => {
    const fieldList = ['country', 'sport', 'channel', 'sales', 'references']

    console.log('getData - dateRange')
    console.log(dateRange)
    DataAccess.getSummary(fieldList, dateRange)
      .then(({size, data}) => {
        console.log('Data from Firebase: ')
        console.log(size)
        console.log(data)

        // setDataList(formData)
        setResultLength(size)
        setCountryRows(data.country)
        setSportsRows(data.sport)
        setChannelRows(data.channel)
        setSalesRows(data.sales)
        setReferencesRows(data.references)
        setDisabledSearch(true)
        setShowResults(true)
      })
      .catch((error) => {
        showGlobalError('Error al obtener datos', error)
      })
  })

  const getDetailData = useCallback((fieldName, fieldValue) => {
    DataAccess.getData()
      .then((docsData) => {
        console.log('Data from Firebase: ')
        console.log(docsData)
        console.log('getData:')
        const formData = DataAccess.fbData2tableData(docsData)
        // dispatchData({ type: 'SET_ITEMS', items: formData });

        // setPending(false)
        console.log(formData)
        setDataList(formData)
        setShowResults(true)
      })
      .catch((error) => {
        showGlobalError('Error al obtener datos', error)
      })
  })

  return (
    <div>
      {/* <Collapse in={hidden} timeout="auto"> */}
      <div className="filters">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            disableFuture
            inputFormat="dd/MM/yyyy"
            startText="Fecha desde"
            endText="Fecha hasta"
            value={dateFilter}
            onChange={(newValue) => {
              setDateFilter(newValue)
              setDisabledSearch(false)
            }}
            renderInput={(startProps, endProps) => (
              <Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> a </Box>
                <TextField {...endProps} />
                <div className="searchButtonDiv">
                  <Button variant="contained" onClick={search}
                    disabled={ disabledSearch }>
                    Buscar
                  </Button>
                </div>
              </Fragment>
            )}
          />
        </LocalizationProvider>

        <Divider />
        {showResults ? (
          <Box sx={{ flexGrow: 1 }}>
            <div>Resultados de la búsqueda: {resultLength}</div>
            <div className="summarySection">
              <Card sx={{ minWidth: 400 }}>
                <DataTable
                  dataRows={countryRows}
                  dataColumns={countryColumnsDef}
                />
              </Card>
              <Card sx={{ minWidth: 400 }}>
                <DataTable
                  dataRows={sportsRows}
                  dataColumns={sportsColumnsDef}
                />
              </Card>
              <Card sx={{ minWidth: 400 }}>
                <DataTable
                  dataRows={channelRows}
                  dataColumns={channelColumnsDef}
                />
              </Card>
              <Card sx={{ minWidth: 400 }}>
                <DataTable dataRows={salesRows}
                  dataColumns={salesColumnsDef} />
              </Card>
              <Card sx={{ minWidth: 400 }}>
                <DataTable
                  dataRows={referencesRows}
                  dataColumns={referencesColumnsDef}
                />
              </Card>
            </div>
          </Box>
        ) : null}
      </div>
      {/* </Collapse> */}
    </div>
  )
}
