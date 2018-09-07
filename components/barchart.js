// npm
import React, { Component } from 'react'
import VegaLite from 'react-vega-lite'

class Barchart extends Component {
  constructor (props) {
    super(props)
    const { title, children } = props
    const re = /([1-9]\. .+?): \*\*(.+?)\*\* (.*?)\s/g

    this.spec = {
      width: 550,
      height: 450,
      config: {
        autosize: 'pad',
        axis: {
          labelFontSize: 20,
          titleFontSize: 20
        },
        legend: {
          labelFontSize: 20,
          titleFontSize: 20
        }
      },
      mark: 'bar',
      encoding: {
        color: {
          sort: {
            field: 'personnes'
          },
          title,
          field: 'label',
          type: 'nominal'
        },
        x: {
          title,
          field: 'label',
          type: 'nominal',
          sort: {
            field: 'personnes'
          },
          axis: {
            labelAngle: 45
          }
        },
        y: {
          title: 'Personnes',
          field: 'personnes',
          type: 'quantitative',
          axis: {
            titlePadding: 15
          }
        }
      }
    }

    this.barData = []
    let oy
    let personnes
    while ((oy = re.exec(children + ' '))) {
      let [, label, personnesImp, word] = oy
      label = label.slice(3)
      personnes = parseInt(personnesImp.replace(/\s/, ''), 10)
      this.barData.push({ label, personnes, personnesImp, word })
    }

    this.list = (
      <ol style={{ textAlign: 'left', fontSize: '1.5em' }}>
        {this.barData.map(({ label, personnesImp, word }) => (
          <li key={label}>{label}: <b>{personnesImp}</b> {word}</li>
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
    const props = {
      spec: this.spec,
      data: { values: this.barData }
    }
    return (
      <div style={{ cursor: 'pointer' }} onClick={this.click}>
        {this.state.graphic ? <VegaLite {...props} /> : this.list}
      </div>
    )
  }
}

export default Barchart
