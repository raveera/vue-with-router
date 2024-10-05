import { isEmpty } from 'lodash'

export function requireValue (value) {
    return isEmpty(value) ? 'Required!' : true
}
