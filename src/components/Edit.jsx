// import PropTypes from 'prop-types'
import { ContactForm } from './ContactForm'
import { TextField } from '@mui/material'

/**
 * Componente para la creación de una consulta
 */
export default function Edit({ model }) {
  return
  <div>
    Edición de una consulta
    <TextField
      id='contact_number'
      name='contact_number'
      label='Nro consulta'
      type='text'
      value={model.contact_number}
      disabled
    />

    <ContactForm />
  </div>
}
