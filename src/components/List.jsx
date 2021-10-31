/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import DataTable from './DataTable'
import {
  columnsGrid as columnsDef, handleGetRowId,
} from '../assets/list-columns-def'
import Box from '@mui/material/Box'
import { Card } from '@mui/material'
import { DataAccess } from '../commons/dataaccess'
import { showGlobalError } from '../commons/global-utils'
import { getLabelForFilter } from '../assets/wkis'
import { useParams, useLocation } from 'react-router'
import { parseDate } from '../commons/global-utils'

/**
 * @return {Object} Component for Listing entities
 */
export default function List() {
  const [resultLength, setResultLength] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [rows, setRows] = useState([])
  const { filterField, filterValue } = useParams(null, null);

  useEffect(() => {
    getData()

    return () => setRows([])
  }, [])

  /**
   * Obtiene los query params
   * @return {Object} Query params
   */
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  /* Obtenemos data list */
  const getData = () => {
    const filter = {field: filterField, value: filterValue}
    DataAccess.getData([filter],
      parseDate(query.get('since')),
      parseDate(query.get('upto')))
      .then(({size, data}) => {
        console.log('List - Data from Firebase: ')
        console.log(size)
        console.log(data)

        setResultLength(size)
        setRows(data)
        setShowResults(true)
      })
      .catch((error) => {
        showGlobalError('Error al obtener datos', error)
      })
  }

  return (
    <div>
      <div>
        {filterField ?
          <div>
            Filtrado por
            <b><i>
              {` ${getLabelForFilter(filterField)}: ${filterValue}`}
            </i></b>
          </div>: null}
      </div>
      {showResults ? (
        <Box sx={{ flexGrow: 1 }}>
          <div>Resultados de la búsqueda: {resultLength}</div>
          <div className="listSection">
            <Card sx={{ minWidth: '100%' }}>
              <DataTable
                dataRows={rows}
                dataColumns={columnsDef}
                showFilters={true}
                customPageSize={10}
                // getRowId={(row) => row.contact_number}
                // {handleGetRowId}
              />
            </Card>
          </div>
        </Box>
      ) : null}
    </div>
  )
}
