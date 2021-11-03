import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox } from '@mui/material'
import { Controller } from 'react-hook-form'

/**
 * Componente Checkbox
 * @return {Object} CheckboxFieldComponent
*/
export const CheckboxFieldComponent = ({control,
  name,
  label,
  defaultValue,
  value}) => {
  CheckboxFieldComponent.propTypes = {
    control: PropTypes.instanceOf(Object).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.bool,
    value: PropTypes.bool,
  }

  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => <FormControlLabel label={label}
          control={<Checkbox {...field} color="primary"
            checked={field.value} />}
        />
        }
      />
    </div>
  )
}

