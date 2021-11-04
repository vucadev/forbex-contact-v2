import PropTypes from 'prop-types'
import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { defaultDateStringFormat } from '../commons/global-utils'

/**
 * Componente DatePicker
 * @return {Object} TextFieldComponent
*/
export const DatePickerComponent = ({control,
  name,
  label,
  requiredField,
  placeholder = label,
  defaultValue = new Date()}) => {
  DatePickerComponent.propTypes = {
    control: PropTypes.instanceOf(Object).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    requiredField: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.instanceOf(Date),
  }
  return (
    <div>
      <Controller
        name="date"
        control={control}
        defaultValue={defaultValue}
        render={({ field }) =>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item>
              <DatePicker
                {...field}
                disableToolbar
                inputFormat={defaultDateStringFormat}
                label={label}
                required={requiredField}
                renderInput={(params) => <TextField {...params} />}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </LocalizationProvider>
        }
      />
    </div>
  )
}
