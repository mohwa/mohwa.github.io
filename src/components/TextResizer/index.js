import React from 'react'
import './TextResizer.scss'
import * as Util from '../../util'

const TEXT_RATIO = 1.2

const incrementFontSize = (elemList) => {
  elemList.forEach((elem) => {
    const oldStyle = window.getComputedStyle(elem)
    const { fontSize: oldFontSize } = oldStyle

    elem.style.fontSize = `${parseInt(oldFontSize) * TEXT_RATIO}px`
  })
}

const decrementFontSize = (elemList) => {
  elemList.forEach((elem) => {
    const oldStyle = window.getComputedStyle(elem)
    const { fontSize: oldFontSize } = oldStyle

    elem.style.fontSize = `${parseInt(oldFontSize) / TEXT_RATIO}px`
  })
}

const getOriginalFontSize = (elemList) => {
  return elemList.reduce((acc, elem) => {
    const oldStyle = window.getComputedStyle(elem)

    acc.push(parseInt(oldStyle.fontSize))

    return acc
  }, [])
}

const resetFontSize = (elemList, originalFontSizeList) => {
  elemList.forEach((elem, index) => {
    elem.style.fontSize = `${parseInt(originalFontSizeList[index])}px`
  })
}

export default class TextResizer extends React.Component {
  elemList = null
  originalFontSizeList = null
  componentDidMount () {
    const title = document.querySelector('header h1.f3.f2-m.f-subheadline-l.measure.lh-title.fw1.mt0')
    const date = document.querySelector('div time.f5.f4-l.db.fw1.baskerville.mb4-l.mb2')
    const tags = document.querySelectorAll('div a .f6.f4-l.fw1')
    const content = document.querySelector('section div div.measure.db.center.f5.f4-ns.lh-copy')

    this.elemList = [title, date, content].concat(...tags)
    this.originalFontSizeList = getOriginalFontSize(this.elemList)
  }

  render () {
    if (!Util.isMobile()) {
      return null
    }

    return (
      <div className='TextResizer flex justify-center'>
        <div className='more' onClick={() => { incrementFontSize(this.elemList) }} />
        <div className='substract ml2' onClick={() => { decrementFontSize(this.elemList) }} />
        <div className='refresh ml2' onClick={() => { resetFontSize(this.elemList, this.originalFontSizeList) }} />
      </div>
    )
  }
}
