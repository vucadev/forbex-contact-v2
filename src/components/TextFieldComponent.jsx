import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

/**
 * Componente TextField
 * @return {Object} TextFieldComponent
*/
export const TextFieldComponent = ({control,
  name,
  label,
  requiredField,
  placeholder = label,
  defaultValue,
  value,
  inputProps,
  multiline}) => {
  TextFieldComponent.propTypes = {
    control: PropTypes.instanceOf(Object).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    requiredField: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    inputProps: PropTypes.instanceOf(Object),
    multiline: PropTypes.bool,
  }
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={value ?? defaultValue}
        render={
          ({ field }) =>
            <TextField {...field} placeholder={placeholder}
              inputProps={inputProps}
              required={requiredField}
              label={label}
              multiline={multiline} />
        }
      />
    </div>
  )
}

// inputProps={{style: {textTransform: 'capitalize'}}}
