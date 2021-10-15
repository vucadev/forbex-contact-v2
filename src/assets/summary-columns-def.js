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

const actionsFieldDef = {
  field: 'actions',
  headerName: 'Acciones',
  width: 130,
  renderCell: () => (
    <Button
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
  actionsFieldDef,
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
  actionsFieldDef,
]

export const countryColumnsDef = [
  {
    headerName: 'País',
    field: 'id',
    sortable: true,
    width: dataFieldWidth,
  },
  quantityFieldDef,
  actionsFieldDef,
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
  actionsFieldDef,
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
  actionsFieldDef,
]
