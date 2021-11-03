import PropTypes from 'prop-types'
import { MenuItem, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

/**
 * Componente Select
 * @return {Object} SelectFieldComponent
*/
export const SelectFieldComponent = ({control,
  name,
  label,
  requiredField,
  placeholder = label,
  defaultValue,
  value,
  options}) => {
  SelectFieldComponent.propTypes = {
    control: PropTypes.instanceOf(Object).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    requiredField: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    options: PropTypes.instanceOf(Array).isRequired,
    value: PropTypes.string,
  }

  return (
    <div>
      <Controller
        control={control}
        name={name}
        required={requiredField}
        value={value ?? defaultValue}
        render={({ field,
          fieldState: { invalid, isTouched, isDirty, error } }) =>
          <TextField select {...field}
            label={label} >
            <MenuItem key={'none'} disabled>
              selecciona un elemento
            </MenuItem>
            {options?.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value} >
                  {option.label}
                </MenuItem>
              );
            })}
          </TextField>}
      />
    </div>
  )
}

