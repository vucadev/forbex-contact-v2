/* wks.js - Well Known Instances
    Conjuntos de datos que no cambian casi nunca
    no tienen sentido consumir tráfico en BD para
    conservarlos */

export const salesNamesList = [
  { value: '', label: '(no asignado)' },
  { value: 'gustavo', label: 'Gustavo' },
  { value: 'hector', label: 'Héctor' },
  { value: 'juancarlos', label: 'Juan Carlos' },
  { value: 'fernando', label: 'Fernando' },
  { value: 'raul', label: 'Raúl' },
  { value: 'ezequiel', label: 'Ezequiel' },
  { value: 'romina', label: 'Romina' },
  { value: 'juanpablo', label: 'Juan Pablo' },
  { value: 'jose', label: 'José' },
  { value: 'comex', label: 'Comex' },
  { value: 'javier', label: 'Javier' },
  { value: 'cliff', label: 'Cliff' },
]

export const sportsNamesList = [
  { value: 'futbol', label: 'Futbol' },
  { value: 'hockey', label: 'Hockey' },
  { value: 'padel', label: 'Pádel' },
  { value: 'atletismo', label: 'Pista de atletismo' },
  { value: 'rugby', label: 'Rugby' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'gym', label: 'Gimnasio' },
  { value: 'basket', label: 'Básquet' },
]

export const referencesNamesList = [
  { value: '', label: 'No contestó' },
  { value: 'alreadyclient', label: 'Ya es cliente' },
  { value: 'internet', label: 'Internet' },
  { value: 'recommendation', label: 'Recomendación' },
  { value: 'advertising', label: 'Publicidad' },
]

export const channelNamesList = [
  { value: 'web', label: 'Web Forbex' },
  { value: 'mail', label: 'Email' },
  { value: 'whatsapp', label: 'Whatsapp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
]

const listsMap = {
  channel: channelNamesList,
  references: referencesNamesList,
  sport: sportsNamesList,
  sales: salesNamesList,
}

// Pasar a un archivo de i18n
const fieldNames = {
  country: 'País',
  sport: 'Deporte',
  channel: 'Canal origen',
  sales: 'Vendedor',
  references: 'Referencias',
}

export const getOptionObjectFor = (field, value) => {
  return listsMap[field].find((x) => x.value === value)
}

export const getLabelFor = (field, value) => {
  let label = ''
  try {
    label = getOptionObjectFor(field, value).label
  } catch (error) {
    console.error(error)
    console.error(`Field ${field} - Value: `)
    console.error(value)
    console.error(listsMap[field])
  }

  return label
}

export const getLabelForFilter = (field) => {
  let label = ''
  try {
    label = fieldNames[field]
  } catch (error) {
    console.error(error)
    console.error(`Field ${field}`)
    console.error(fieldNames[field])
  }

  return label
}
