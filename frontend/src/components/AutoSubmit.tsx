import { useFormikContext } from 'formik'
import { useEffect, useRef } from 'react'

const AutoSubmit = () => {
  const { values, submitForm } = useFormikContext()
  const prevValues = useRef(values)

  useEffect(() => {
    const changed = JSON.stringify(prevValues.current) !== JSON.stringify(values)
    if (changed) {
      const timer = setTimeout(() => submitForm(), 2000)
      prevValues.current = values
      return () => clearTimeout(timer)
    }
  }, [values, submitForm])

  return null
}

export default AutoSubmit
