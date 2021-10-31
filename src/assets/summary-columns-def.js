import { Button } from '@mui/material'
import { getLabelFor } from './wkis'

const dataFieldWidth = 150

const quantityFieldDef = {
  headerName: 'Cantidad',
  field: 'quantity',
  type: 'number',
  width: 100,
  valueFormatter: (params) => Number(params.value).toFixed(),
  sortable: true,
}

// Action default de ejemplo
// eslint-disable-next-line no-unused-vars
const actionsFieldDef = {
  field: 'actions',
  headerName: 'Acciones',
  width: 130,
  renderCell: (values) => (
    <Button
      // href={history.push(`/list/country/${values.row.id}`)}
      variant="contained"
      color="primary"
      size="small"
      style={{ marginLeft: 16, lineHeight: 1 }}
    >
      Listar
    </Button>
  ),
}

export const channelColumnsDef = [
  {
    headerName: 'Canal origen',
    field: 'id',
    valueFormatter: (params) => getLabelFor('channel', params.value),
    width: dataFieldWidth,
    sortable: true,
  },
  quantityFieldDef,
]

export const sportsColumnsDef = [
  {
    headerName: 'Deporte',
    field: 'id',
    valueFormatter: (params) => getLabelFor('sport', params.value),
    width: dataFieldWidth,
    sortable: true,
  },
  quantityFieldDef,
]

export const countryColumnsDef = [
  {
    headerName: 'País',
    field: 'id',
    sortable: true,
    width: dataFieldWidth,
  },
  quantityFieldDef,
]

export const referencesColumnsDef = [
  {
    headerName: 'Referencias',
    field: 'id',
    valueFormatter: (params) =>
      getLabelFor('references', params.value.value || params.value),
    sortable: true,
    width: dataFieldWidth,
  },
  quantityFieldDef,
]

export const salesColumnsDef = [
  {
    headerName: 'Vendedor',
    field: 'id',
    valueFormatter: (params) => getLabelFor('sales', params.value),
    width: dataFieldWidth,
    sortable: true,
  },
  quantityFieldDef,
]
