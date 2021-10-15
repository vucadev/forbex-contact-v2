import { format } from 'date-fns'
import { getLabelFor } from './wkis'

export const columnsGrid = [
  {
    headerName: 'Nro consulta',
    field: 'contact_number',
    sortable: true,
  },
  {
    headerName: 'Fecha',
    field: 'date',
    type: 'date',
    valueFormatter: (params) => format(params.value, 'dd/MM/yyyy'),
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
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    editable: true,
  },
  {
    headerName: 'País',
    field: 'country',
    sortable: true,
  },
  {
    headerName: 'Provincia',
    field: 'province',
    sortable: true,
  },
  {
    headerName: 'Localidad',
    field: 'city',
    sortable: true,
  },
  {
    headerName: 'Referencias',
    field: 'references',
    valueFormatter: (params) => getLabelFor('references', params.value),
    sortable: true,
    width: 20,
  },
  {
    headerName: 'Consulta',
    field: 'comments',
    sortable: true,
    width: 80,
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
    width: 60,
    editable: true,
  },
]
