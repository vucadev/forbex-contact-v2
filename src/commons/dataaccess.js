/* eslint-disable camelcase */
/* eslint-disable no-multi-str */
import firebaseApp from './forbex/firebase-config'
import firebase from 'firebase/app'
import { getOptionObjectFor } from '../assets/wkis'

// export const analytics = firebase.analytics()

export const db = firebaseApp.firestore()

// Uncomment to debug firestore:
// firebase.firestore.setLogLevel('debug')

const queryOptions = {
  cache: true,
}

export const FirebaseInfo = {
  contactsCollectionName: 'contact-items',
}

/**
 * Función que agrega filtro de fechas a una query Firestore
 * @param {Object} queryRef Referencia de la query actual
 * @param {Date} start Fecha inicial del filtro
 * @param {Date} end Fecha final del filtro
 * @return {Object} queryRef Referencia de la query modificada
 */
const dateFilterAdd = (queryRef, start, end) => {
  queryRef = queryRef
    .where('date', '>=', start)
    .where('date', '<=', end)
  return queryRef
}

/**
 * Ejemplo de mapa resultante:
 * - resultMap: ['country': ['Argentina': 45, 'Uruguay': 20],
 *  'sport': ['footbal': 45, 'paddle': 20]]
 * @param {Array} data
 * @param {Array} resultMap
 * @param {Array} fieldList
 */
const consolidate = (data, resultMap, fieldList) => {
  // Para cada campo que quiero consolidar...
  fieldList.forEach((fieldItemName) => {
    // Busco si en el mapa resultante está este campo
    // const fieldResult = resultMap.find((resultField) => {
    //   return (resultField.fieldName == fieldItemName)
    // })

    if (!resultMap[fieldItemName]) {
      console.error('resultMap[fieldItemName] undefined')
      return
    }
    // Obtengo el valor de este registro para ese campo
    const value = data[fieldItemName]

    // Busco si en el mapa resultante está este campo
    const valueResult = resultMap[fieldItemName].find((resultFieldValue) => {
      return resultFieldValue.id == value
    })
    // Si no fue encontrado, lo agrego con valor == 1
    if (!valueResult) {
      console.log(`!valueResult / ${fieldItemName} / data: `)
      console.log(data)
      console.log(value)
      resultMap[fieldItemName].push({ id: value, quantity: 1 })
    } else {
      // Si fue encontrado, se incrementa el valor en 1
      valueResult.quantity++
    }
  })
  // console.log(resultMap)
}

mockData: [
  {
    contact_number: 2,
    date: '2021-08-28',
    channel: 'mail',
    contact_name: 'Kent Brockman',
    country: 'Argentina',
    city: 'Olivos',
    province: 'Buenos Aires',
    sport: 'hockey',
    phone: '1100000001',
    email: 'kent.brockman@email.fake',
    references: 'internet',
    comments:
      'Se comunica Kent solicitando un presupuesto \
      para el estadio de hockey de River',
    sales: 'Romina',
    client_feedback: 'sipodjaoe8rofih oaifj oiajdoij',
  },
  {
    contact_number: 1,
    date: '2021-08-28',
    channel: 'mail',
    contact_name: 'Ken Robinson',
    country: 'Argentina',
    city: 'CABA',
    province: 'CABA',
    sport: 'football',
    phone: '1100000000',
    email: 'sir.ken.robinson@email.fake',
    references: 'internet',
    comments:
      'Se comunica el Sir Robinson solicitando un \
      presupuesto para el estadio de River Plate',
    sales: 'Javier',
    client_feedback: 'asd asd asd asda',
  },
]
export const DataAccess = {
  getCountData: async () => {
    const collectionRef = db.collection(FirebaseInfo.contactsCollectionName)
    const query = collectionRef.orderBy('contact_number', 'desc').limit(1)

    return query
      .get(queryOptions)
      .then((querySnapshot) => {
        let max_contact_number = 0
        let max_contact_number_date = new Date()
        if (!querySnapshot.empty) {
          max_contact_number = querySnapshot.docs[0].data().contact_number
          max_contact_number_date = querySnapshot.docs[0].data().date.toDate()
        }
        FirebaseInfo.lastContactNumber = max_contact_number

        console.log(`Last contact number: ${max_contact_number}`)
        console.log(`Date: ${max_contact_number_date}`)
        return Promise.resolve({count: max_contact_number,
          date: max_contact_number_date})
      })
      .catch((error) => {
        console.log('Error getData from firebase')
        console.log(error)
        return Promise.reject(error)
      })
  },
  resetCountData: async () => {
    delete FirebaseInfo.lastContactNumber
    console.log(
      `resetCountData - FirebaseInfo.lastContactNumber: \
        ${FirebaseInfo.lastContactNumber}`,
    )
    return FirebaseUtils.getCountData()
  },
  getDataTotals: async () => {
    const queryRef = db
      .collection(FirebaseInfo.contactsCollectionName)
      .orderBy('contact_number', 'desc')

    return queryRef
      .get()
      .then((querySnapshot) => {
        const docsData = []
        querySnapshot.forEach((doc) => {
          docsData.push(doc.data())
        })
        return Promise.resolve(docsData)
      })
      .catch((error) => {
        console.log('Error getData from firebase')
        console.log(error)
        return Promise.reject(error)
      })
  },
  getSummary: async (fieldList, dateRange) => {
    if (!fieldList) {
      return Promise.reject(new Error('El parámetro fieldList está vacío'))
    }
    const resultMap = {}
    // Init result map
    fieldList.forEach((item) => {
      resultMap[item] = []
    })

    let queryRef = db
      .collection(FirebaseInfo.contactsCollectionName)
      .orderBy('date', 'desc')

    if (dateRange && dateRange.length > 0) {
      console.log('dateRange filter')
      console.log(dateRange)
      // Tomar rango de fechas para armar filtro
      // const start = new Date(dateRange[0]);
      // const end = new Date(dateRange[1]);
      const start = firebase.firestore.Timestamp.fromDate(
        dateRange[0]);
      const end = firebase.firestore.Timestamp.fromDate(
        dateRange[1]);
      queryRef = dateFilterAdd(queryRef, start, end)
      console.log(start)
      console.log(end)
    }

    return queryRef
      .get()
      .then((querySnapshot) => {
        const resultSize = querySnapshot.size
        querySnapshot.forEach((doc) => {
          consolidate(doc.data(), resultMap, fieldList)
        })
        console.log('getSummary result:')
        console.log(resultMap)
        return Promise.resolve({size: resultSize, data: resultMap})
      })
      .catch((error) => {
        console.log('Error getData from firebase')
        console.log(error)
        return Promise.reject(error)
      })
  },
  getData: async (filters, since, upto) => {
    let queryRef = db.collection(FirebaseInfo.contactsCollectionName)
      .orderBy('date', 'desc')

    queryRef = dateFilterAdd(queryRef, since, upto)

    if (filters.length > 0) {
      // Aplicar los filtros
      console.log('filters: ')
      filters.forEach((item) => {
        const symbol = (item.comparatorSymbol || '==')
        queryRef = queryRef
          .where(item.field, (symbol), item.value)
        console.log(`${item.field} ${symbol} ${item.value}`)
      })
    }
    console.log('get data queryRef')
    console.log(queryRef)
    return queryRef
      .orderBy('contact_number', 'desc')
      .get()
      .then((querySnapshot) => {
        const resultSize = querySnapshot.size
        const docsData = []
        querySnapshot.forEach((doc) => {
          const dataItem = doc.data()
          dataItem.id = dataItem.contact_number
          docsData.push(dataItem)
        })
        return Promise.resolve({size: resultSize, data: docsData})
      })
      .catch((error) => {
        console.log('Error getData from firebase')
        console.log(error)
        return Promise.reject(error)
      })
  },

  putData: async (data) => {
    console.log('New Data:')
    console.log(data)
    const persistenceId = ('' + data.contact_number).padStart(10, '0')

    console.log('Id a persistir: ' + persistenceId)

    return db
      .collection(FirebaseInfo.contactsCollectionName)
      .doc(persistenceId)
      .set(data)
      .then(() => {
        console.log('Document successfully written!')
        return Promise.resolve()
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
        return Promise.reject(error)
      })
  },
  removeItem: async (contact_number) => {
    console.log('Eliminando consulta: ' + contact_number)
    const persistenceId = ('' + contact_number).padStart(10, '0')

    console.log('Id a eliminar: ' + persistenceId)

    return db
      .collection(FirebaseInfo.contactsCollectionName)
      .doc(persistenceId)
      .delete()
      .then(() => {
        console.log('Document successfully removed!')

        return Promise.resolve()
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
        return Promise.reject(error)
      })
  },
  fbData2tableData: (fbListData) => {
    const formListData = fbListData.map(function(fbData) {
      const tableData = {
        id: fbData.contact_number,
        ...fbData,
      }

      tableData.date = fbData.date.toDate()

      /* Sanity */
      if (tableData.channel.value) {
        tableData.channel = tableData.channel.value
      }
      if (tableData.references.value) {
        tableData.references = tableData.references.value
      }
      if (tableData.sport.value) {
        tableData.sport = tableData.sport.value
      }
      if (tableData.sales.value || tableData.sales.label) {
        tableData.sales = tableData.sales.value
      }
      /* */

      return tableData
    })

    return formListData
  },
  data2formData: (data) => {
    const formData = {
      ...data,
    }

    formData.channel = getOptionObjectFor('channel', formData.channel)
    formData.sport = getOptionObjectFor('sport', formData.sport)
    formData.references = getOptionObjectFor('references', formData.references)
    formData.sales = getOptionObjectFor('sales', formData.sales)

    return formData
  },
  formData2fbData: (formData) => {
    // Si son datos nuevos, sin número de consulta, la crea
    // Convierte los datos en formato form en los datos formato Firebase
    console.log(
      `formData2fbData - formData.contact_number: ${formData.contact_number}`,
    )
    let contactNumber = 0
    if (!formData.contact_number) {
      FirebaseInfo.lastContactNumber = FirebaseInfo.lastContactNumber ?
        FirebaseInfo.lastContactNumber + 1 :
        1
      contactNumber = FirebaseInfo.lastContactNumber
    } else {
      contactNumber = formData.contact_number
    }

    console.log(`formData2fbData - contact_number: ${contactNumber}`)
    let sales = ''
    if (formData.sales.value || formData.sales.label) {
      sales = formData.sales.value
    } else {
      sales = formData.sales
    }

    const fbData = {
      contact_number: contactNumber,
      date: formData.date,
      channel: formData.channel.value || formData.channel || '',
      contact_name: formData.contact_name || '',
      country: formData.country || '',
      city: formData.city || '',
      province: formData.province || '',
      sport: formData.sport.value || formData.sport || '',
      phone: formData.phone || '',
      email: formData.email || '',
      references: formData.references.value || formData.references || '',
      comments: formData.comments || '',
      sales: sales || '',
      client_feedback: formData.client_feedback || '',
    }
    console.log(fbData)

    return fbData
  },
  validFormCustom: (model) => {
    const inValiFields = []
    if (!model.date) {
      inValiFields.push('Fecha')
    }
    if (!model.channel) {
      inValiFields.push('Canal')
    }
    if (!model.contact_name) {
      inValiFields.push('Nombre')
    }
    if (!model.country) {
      inValiFields.push('País')
    }
    if (!model.sport) {
      inValiFields.push('Deporte')
    }
    if (!model.phone && !model.email) {
      inValiFields.push('Email ó Teléfono')
    }
    if (!model.references && model.references != '') {
      inValiFields.push('Cómo nos conoció')
    }
    return inValiFields
  },
  filterData: async (filter) => {
    return Promise.resolve(mockData)
  },
}
