import { IDictionary } from '@common-types'
import { ExtractedTimeTypes } from './dps-posts.types'

interface IHourAlias {
  translate: string,
  count: number
}

const hourAliases: IDictionary<IHourAlias> = {
  one: {
    translate: 'один',
    count: 1
  },
  two: {
    translate: 'два',
    count: 2
  },
  three: {
    translate: 'три',
    count: 3
  },
  four: {
    translate: 'четыре',
    count: 4
  },
  five: {
    translate: 'пять',
    count: 5
  },
  six: {
    translate: 'шесть',
    count: 6
  }
}

export const extractTimeFromString = (time?: string): ExtractedTimeTypes => {
  if (!time) {
    return {
      type: 'empty'
    }
  }

  const minutesString = 'minute'
  const hoursString = 'hour'
  const countReg = /\d./

  if (time.toLowerCase().includes(minutesString)) {
    let count = 0
    let word: string
    const countRegExResult = time.match(countReg)

    if (countRegExResult) {
      count = Number(time.match(countReg))
    }

    switch (count) {
      case 1:
        word = 'минута'
        break
      case 2:
      case 3:
      case 4:
        word = 'минуты'
        word = 'минуты'
        break
      default:
        word = 'минут'
    }

    return {
      type: 'minutes_ago',
      count: 2,
      word
    }
  }

  if (time.toLowerCase().includes(hoursString)) {
    const [hourTextCount] = time.split(' ')
    const { translate, count } = hourAliases[hourTextCount]
    let word: string

    switch (count) {
      case 1:
        word = 'час'
        break
      case 2:
      case 3:
      case 4:
        word = 'часа'
        word = 'часа'
        break
      default:
        word = 'часов'
    }

    return {
      type: 'hours_ago',
      count: translate,
      word
    }
  }

  return {
    type: 'number',
    time
  }
}
