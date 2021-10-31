import { format, parse } from 'date-fns'
import { getLabelFor } from '../assets/wkis'

const defaultLoadingMessage = 'Aguarde un instante...'

// const electron = window.require('electron')
// const dialog = electron.dialog

export const logError = (error, errorInfo) => {
  // Send error logs to server
}

export const showGlobalError = (message, data) => {
  let dataMessage = ''
  if (data) {
    dataMessage = '' + data
  }
  alert(message + dataMessage)
}

export const defaultDateStringFormat = 'dd/MM/yyyy'

/**
 * Transforma un string con formato default de la app en un Date
 * @param {string} dateString Fecha en string con formato default de la app
 * @return {Date} Fecha a partir del string
 */
export const parseDate = (dateString) => {
  return parse(dateString, defaultDateStringFormat, new Date())
}
/**
 * Transforma un Date a un String con formato default de la app
 * @param {Date} dateObject Fecha en Date
 * @return {string} Fecha en string formateado
 */
export const formatDate = (dateObject) => {
  return format(dateObject, defaultDateStringFormat)
}


// export const showDialog = (message, data, yesCallback) => {
//   const defaultMessage = '¿Está seguro?'
//   var dataMessage = ''
//   if (data) {
//     dataMessage = '' + data
//   }

//   const options  = {
//     buttons: ['No','Sí'],
//     defaultId: 0,
//     message: (message || defaultMessage) + dataMessage
//    }
//    return dialog.showMessageBox(window, options, yesCallback)
// }

export const showConfirmDialog = (message, data) => {
  const defaultMessage = '¿Está seguro?'
  // eslint-disable-next-line no-var
  var dataMessage = ''
  if (data) {
    dataMessage = '' + data
  }
  return window.confirm((message || defaultMessage) + dataMessage)
}

export const showLoading = (message, callbackProgress) => {
  if (!message) {
    message = defaultLoadingMessage
  }
}

export const hideLoading = (message, callbackProgress) => {}

export const sendmail = (model, emailTo) => {
  const dateString = format(new Date(model.date), defaultDateStringFormat)
  const emailAddress = ''
  if (emailTo) {
    emailAddress = emailTo
  } else if (model.sales) {
    emailAddress = `${model.sales}@forbex.com`
  }

  const channel = getLabelFor('channel', model.channel)
  const references = getLabelFor('references', model.references)
  const sport = getLabelFor('sport', model.sport)
  const sales = getLabelFor('sales', model.sales)

  const body = `Número de consulta: ${model.contact_number}\n\
Fecha: ${dateString}\n\
Se contactó vía: ${channel}\n\
Nombre y Apellido: ${model.contact_name || ''}\n\
País: ${model.country || ''}\n\
Provincia: ${model.province || ''}\n\
Localidad: ${model.city || ''}\n\
Deporte: ${sport}\n\
Teléfono: ${model.phone || ''}\n\
Email: ${model.email || ''}\n\
Nos conoció por: ${references}\n\
Consulta: ${model.comments || ''}\n\
Feedback del cliente: ${model.client_feedback || ''}\n\
Vendedor asignado: ${sales}\n`

  const subject = `Consulta ${model.contact_number} - ${channel}`

  const url = encodeURI(
    `mailto:${emailAddress}?subject=${subject}&body=${body}`,
  )
  const winopened = window.open(url, '_blank')
  console.log(winopened)
  winopened.close()
}
