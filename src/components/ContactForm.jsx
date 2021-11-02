/* eslint-disable no-unused-vars */
import { Grid, Button, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { DatePickerComponent } from './DatePickerComponent'
import { SelectFieldComponent } from './SelectFieldComponent'
import { showGlobalError, showLoading } from '../commons/global-utils'
import { TextFieldComponent } from './TextFieldComponent'
import { channelNamesList, referencesNamesList, sportsNamesList,
  salesNamesList } from '../assets/wkis';
import { useState } from 'react'
import { DataAccess } from '../commons/dataaccess'

const defaultProvince = 'Buenos Aires'
const defaultCountry = 'Argentina'
/**
 * Formulario para creación/modificación de una consulta
 * @param {Object} model Datos para editar
 * @return {Object} ContactForm el formulario de consulta para completar
*/
export const ContactForm = ({ model = {}}) => {
  ContactForm.propTypes = {
    model: PropTypes.instanceOf(Object),
  }
  const [channelList] = useState(channelNamesList)
  const [referencesList] = useState(referencesNamesList)
  const [sportsList] = useState(sportsNamesList)
  const [salesList] = useState(salesNamesList)
  // eslint-disable-next-line no-unused-vars
  const { control, handleSubmit, formState, errors } =
    useForm({defaultValues: model})

  const handle = (model) => {
    console.log('About to submit')
    console.log(model)

    // if (!formState.isValid) {
    //   console.log('Form inválido, campos: ')
    //   console.log(formState.dirtyFields)
    //   showGlobalError('Faltan datos por completar: ', formState.dirtyFields)
    // } else {
    const missingFields = DataAccess.validFormCustom(model)
    if (missingFields.length !== 0) {
      const missingFieldPrefix = '\n- ';
      const missingFieldsText = missingFieldPrefix
        .concat(missingFields.join(missingFieldPrefix))
      showGlobalError('Faltan datos por completar: ', missingFieldsText)
      return
    }
    showLoading()
    //   // onSubmit(model, model.sendmail)
    // }
  }

  return (
    <div>
      <form noValidate validated='{validated}' className={'contact-form'}
        onSubmit={handleSubmit(handle)}>
        <Grid container direction={'column'} spacing={5}>
          <Grid item container className={'fields'} direction={'row'}
            spacing={3}>
            <Grid item>
              <DatePickerComponent
                requiredField={true}
                control={control}
                name='date'
                label='Fecha'/>
            </Grid>
            <Grid item>
              <SelectFieldComponent
                control={control}
                options={channelList}
                name={'channel'}
                label={'Canal'}
                placeholder={'Canal por donde se comunicó'}
              />
            </Grid>
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'contact_name'}
                placeholder={'Escribí el nombre'}
                requiredField={true}
                label={'Nombre'}
                inputProps={{style: {textTransform: 'capitalize'}}} />
            </Grid>
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'phone'}
                placeholder={'+999 (999) 999-9999'}
                label={'Teléfono'} />
            </Grid>
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'email'}
                placeholder={'name@example.com'}
                label={'Email'}
                inputProps={{style: {textTransform: 'lowercase'}}} />
            </Grid>
            <Grid item>
              <SelectFieldComponent
                control={control}
                options={sportsList}
                name={'sport'}
                label={'Deporte'}
                requiredField={true}
              />
            </Grid>
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'country'}
                placeholder={'País'}
                requiredField={true}
                label={'País'}
                defaultValue={defaultCountry}
                inputProps={{style: {textTransform: 'capitalize'}}} />
            </Grid>
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'province'}
                label={'Provincia'}
                defaultValue={defaultProvince}
                inputProps={{style: {textTransform: 'capitalize'}}} />
            </Grid>
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'city'}
                label={'Localidad'}
                inputProps={{style: {textTransform: 'capitalize'}}} />
            </Grid>
            <Grid item>
              <SelectFieldComponent
                control={control}
                options={referencesList}
                name={'references'}
                label={'¿Cómo nos conoció?'}
              />
            </Grid>
            <Grid item>
              <SelectFieldComponent
                control={control}
                options={salesList}
                name={'sales'}
                label={'Vendedor'}
              />
            </Grid>
          </Grid>
          {/* <div className={'longtext-fields'}> */}
          <Grid item container className={'longtext-fields'}
            direction={'row'} spacing={3} >
            <Grid item>
              <TextFieldComponent
                control={control}
                name={'comments'}
                placeholder={'Ingresá la consulta del interesado'}
                label={'Consulta'}
                multiline={true} />
            </Grid>

            <Grid item>
              <TextFieldComponent
                control={control}
                name={'client_feedback'}
                placeholder={'Ingresá el feedback que dio el cliente'}
                label={'Feedback del cliente'}
                multiline={true} />
            </Grid>
          </Grid>
          <Divider />
          <div className={'actions'}>
            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                        Guardar
              </Button>
            </Grid>
          </div>
        </Grid>

      </form>
    </div>
  )
}
