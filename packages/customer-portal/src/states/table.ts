import { BehaviorSubject } from 'rxjs'
import { get } from 'services/table'

const _tables$ = new BehaviorSubject<string[]>([])
export const tables$ = _tables$.asObservable()

window.addEventListener('load', () => {
  ;(async () => {
    try {
      const resp = await get()
      const json = await resp.json()
      _tables$.next(json.tables)
    } catch (err) {
      console.error(err)
    }
  })()
})
