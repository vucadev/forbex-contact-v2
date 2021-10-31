import { getLabelFor } from './wkis'
import { formatDate } from '../commons/global-utils'

export const handleGetRowId = (row) => {
  return row.contact_number
}

const smallWidth = 100
const mediumWidth = 200
const largeWidth = 400
export const columnsGrid = [
  {
    headerName: 'Nro consulta',
    field: 'contact_number',
    sortable: true,
    filterable: true,
  },
  {
    headerName: 'Fecha',
    field: 'date',
    type: 'date',
    valueFormatter: (params) => formatDate(params.value.toDate()),
    sortable: true,
  },
  {
    headerName: 'Canal origen',
    field: 'channel',
    valueFormatter: (params) => getLabelFor('channel', params.value),
    sortable: true,
  },
  {
    headerName: 'Nombre y Apellido',
    field: 'contact_name',
    sortable: true,
    editable: true,
    width: mediumWidth,
  },
  {
    headerName: 'Deporte',
    field: 'sport',
    valueFormatter: (params) => getLabelFor('sport', params.value),
    sortable: true,
  },
  {
    headerName: 'Teléfono',
    field: 'phone',
    sortable: true,
    editable: true,
    width: mediumWidth,
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    editable: true,
    width: mediumWidth,
  },
  {
    headerName: 'País',
    field: 'country',
    sortable: true,
    width: smallWidth,
  },
  {
    headerName: 'Provincia',
    field: 'province',
    sortable: true,
    width: mediumWidth,
  },
  {
    headerName: 'Localidad',
    field: 'city',
    sortable: true,
    width: mediumWidth,
  },
  {
    headerName: 'Referencias',
    field: 'references',
    valueFormatter: (params) => getLabelFor('references', params.value),
    sortable: true,
    width: smallWidth,
  },
  {
    headerName: 'Consulta',
    field: 'comments',
    sortable: true,
    width: largeWidth,
    editable: true,
  },
  {
    headerName: 'Vendedor',
    field: 'sales',
    valueFormatter: (params) => getLabelFor('sales', params.value),
    sortable: true,
  },
  {
    headerName: 'Feedback del cliente',
    field: 'client_feedback',
    sortable: true,
    width: largeWidth,
    editable: true,
    filterable: false,
  },
]
