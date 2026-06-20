import type { FieldDataInterface, FieldInterface } from '~/interfaces/common/field'

/**
 * Преобразует FieldInterface[] в FieldDataInterface[] с заполнением значений из данных
 */
export const processFieldsToFieldsData = <T extends Record<string, any>>(
  fields: FieldInterface[],
  data: T,
  customRepeaterTransform?: (field: FieldInterface, data: T) => any,
): FieldDataInterface[] => {
  const processField = (field: FieldInterface): FieldDataInterface => {
    if (field.type === 'repeater' && field.key) {
      if (customRepeaterTransform) {
        const value = customRepeaterTransform(field, data)
        return { ...field, value: Array.isArray(value) ? value : [] }
      }
      const repeaterArray = (data as any)[field.key] || []
      return { ...field, value: Array.isArray(repeaterArray) ? repeaterArray : [] }
    }

    if (field.type === 'group' && field.fields) {
      return {
        ...field,
        fields: field.fields.map(subField => processField(subField)),
      }
    }

    let value: any
    if (field.type === 'tags' && field.key) {
      const tagsArray = (data as any)[field.key] || []
      value = Array.isArray(tagsArray) ? tagsArray : []
    }
    else if (field.key) {
      value = (data as any)[field.key] ?? (field.valueType === 'number' ? 0 : (field.type === 'switch' ? false : ''))
    }
    else {
      value = field.valueType === 'number' ? 0 : (field.type === 'switch' ? false : '')
    }

    return { ...field, value }
  }

  return fields.map((field: FieldInterface) => processField(field))
}

export const extractValueFromField = (field: FieldDataInterface): any => {
  if (field.type === 'repeater' && field.key) {
    if (Array.isArray(field.value)) {
      return field.value.map((item: any) => {
        const processedItem: any = {}
        if (field.fields) {
          field.fields.forEach((subField) => {
            if (!subField.key) {
              return
            }
            processedItem[subField.key] = item[subField.key] ?? ''
          })
        }
        return processedItem
      })
    }
    return []
  }

  if (field.type === 'group' && field.fields) {
    const result: any = {}
    field.fields.forEach((subField) => {
      if (subField.key) {
        result[subField.key] = extractValueFromField(subField)
      }
    })
    return result
  }

  return field.value
}

export const extractDataFromFields = (fieldsData: FieldDataInterface[]): Record<string, any> => {
  const payload: any = {}

  const processField = (field: FieldDataInterface) => {
    if (field.type === 'group' && field.fields) {
      field.fields.forEach((subField) => {
        if (subField.key && subField.submit !== false) {
          payload[subField.key] = extractValueFromField(subField)
        }
      })
    }
    else if (field.key && field.submit !== false) {
      payload[field.key] = extractValueFromField(field)
    }
  }

  fieldsData.forEach(processField)
  return payload
}
