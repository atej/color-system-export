import { writeFile } from 'fs'
import { join } from 'path'

export const createFile = (
  fileName: string,
  data: string,
  filePath = '',
  successMsg?: string,
) => {
  const buildPath = join(__dirname, '..', '..', 'build')
  const file = join(buildPath, filePath, `${fileName}.txt`)
  writeFile(file, data, 'utf8', err => {
    if (err) {
      console.log(err)
    } else {
      console.log(
        successMsg ? `${successMsg}: ${file}` : `File created: ${file}`,
      )
    }
  })
}

const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`)

export function getTimestamp() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${year}-${pad(month)}-${pad(day)}-${pad(hours)}-${pad(minutes)}-${pad(
    seconds,
  )}`
}

export function serializeKeys(obj: { [x: string]: any }) {
  return Object.keys(obj)
    .map(key => `'${key}'`)
    .join(', ')
}
