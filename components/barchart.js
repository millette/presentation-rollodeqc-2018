// npm
import React, { Component } from 'react'
import VegaLite from 'react-vega-lite'

const spec = {
  width: 500,
  height: 500,
  mark: 'bar',
  encoding: {
    color: { field: 'label', type: 'nominal' },
    x: { field: 'label', type: 'nominal' },
    y: { field: 'personnes', type: 'quantitative' }
  }
}

class Barchart extends Component {
  constructor (props) {
    super(props)
    const re = /([1-9]\. .+?): \*\*(.+?)\*\* (.*?)\s/g

    this.barData = []
    let oy
    let personnes
    while (oy = re.exec(props.children + ' ')) {
      let [zzz, label, personnesImp, word] = oy
      personnes = parseInt(personnesImp.replace(/\s/, ''), 10)
      this.barData.push({ label, personnes, personnesImp, word })
    }

    this.list = (
      <ol style={{ textAlign: 'left', fontSize: '1.5em' }}>
        {this.barData.map(({ label, personnesImp, word }) => (
          <li key={label}>{label.slice(2)}: <b>{personnesImp}</b> {word}</li>
        ))}
      </ol>
    )

    this.state = {
      graphic: true
    }
    this.click = this.click.bind(this)
  }

  click () {
    this.setState({ graphic: !this.state.graphic })
  }

  render () {
    return (
      <div style={{ cursor: 'pointer' }} onClick={this.click}>
        {this.state.graphic ? <VegaLite spec={spec} data={{values: this.barData}} /> : this.list}
      </div>
    )
  }
}

export default Barchart
