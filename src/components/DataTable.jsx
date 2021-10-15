/* eslint-disable react/prop-types */
import { useState, createRef, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
/**
 * @param {Object} dataRows Data to show in component
 * @param {Object} dataColumns Columnlist to configure Component
 * @return {Object} Configurable ListData Component
 */
export default function Data({
  dataRows,
  dataColumns,
  customPageSize,
  checkboxSeelectRow,
}) {
  // eslint-disable-next-line no-unused-vars
  const [rows, setRows] = useState(dataRows)
  // eslint-disable-next-line no-unused-vars
  // const [columns] = useState(dataColumns)
  const tableRef = createRef()
  const [pageSize, setPageSize] = useState(5)
  const [canSelectRow] = useState(checkboxSeelectRow || false)

  useEffect(() => {
    if (customPageSize) {
      setPageSize(customPageSize)
    }

    setTimeout(() => {
      executeScroll()
    }, 400)
  }, [])

  const executeScroll = () => {
    if (!tableRef || !tableRef.current) {
      return
    }
    tableRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ width: '95%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }} ref={tableRef}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={dataColumns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 50]}
            {...(canSelectRow ? checkboxSelection : null)}
            density={'compact'}
          />
        </div>
      </div>
    </div>
  )
}
