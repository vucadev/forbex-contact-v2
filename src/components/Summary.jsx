/* eslint-disable no-unused-vars */
import { Fragment, useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import { Button, Card, Divider } from '@mui/material'
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
import { showGlobalError } from '../commons/global-utils'

/**
 *
 * @return {Object} Component for Listing entities
 */
export default function Summary() {
  const [dateFilter, setDateFilter] = useState([new Date(), new Date()])
  // [null, null]
  // const [dataList, setDataList] = useState(mockData)
  // const [countryColumns, setCountryColumns] = useState(countryColumnsDef)
  const [resultLength, setResultLength] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [countryRows, setCountryRows] = useState([])
  const [sportsRows, setSportsRows] = useState([])
  const [channelRows, setChannelRows] = useState([])
  const [salesRows, setSalesRows] = useState([])
  const [referencesRows, setReferencesRows] = useState([])

  const search = () => {
    setShowResults(false)
    // Show loading animation

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
            }}
            renderInput={(startProps, endProps) => (
              <Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> a </Box>
                <TextField {...endProps} />
                <div className="searchButtonDiv">
                  <Button variant="contained" onClick={search}>
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
                <DataTable dataRows={salesRows} dataColumns={salesColumnsDef} />
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
    </div>
  )
}
