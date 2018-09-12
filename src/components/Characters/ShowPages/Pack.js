import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'
import Adapter from '../../../Adapter'

export default class Pack extends Component {

  state = {
    items: [],
    quantities: {}
  }

  componentDidMount() {
    let quantities = {}
    const urls = this.props.item.contents.map(item => {
      quantities[item.item_url] = item.quantity
      return item.item_url
    })

    Adapter.getPackData(urls).then(({ items }) => this.setState({ items, quantities }))
  }

  mappedItems = () => {
    const { quantities } = this.state
    return this.state.items.map(item => {
      let num = quantities[item.url]
      return (
        <li key={item.name}>

          <p>{num} {item.name}</p>
          { item.desc ? <p>{item.desc[0]}</p> : null }
          <Divider />
        </li>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <p>Starting with this pack gives you...</p>
        <ul>
          {this.mappedItems()}
        </ul>
      </React.Fragment>
    )
  }
}
