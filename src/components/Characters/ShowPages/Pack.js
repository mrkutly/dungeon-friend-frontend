import React, { Component } from 'react'
import Adapter from '../../../Adapter'

export default class Pack extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    const urls = this.props.item.contents.map(item => item.item_url)
    Adapter.getPackData(urls).then(({ items }) => this.setState({ items }))
  }

  render() {
    // I have my items, now I can map over them and format the data
    console.log(this.state)
    return (
      <h1>hi</h1>
    )
  }
}
