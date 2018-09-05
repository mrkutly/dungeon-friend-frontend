import React, { Component } from 'react'
import _ from 'lodash'
import Adapter from '../../Adapter'
import { Search, Grid, Popup, Button } from 'semantic-ui-react'
import { updateCharacter } from '../../redux/actions'
import { connect } from 'react-redux'

class SearchBar extends Component {

  state = {
    source: [],
    currentCharacter: {...this.props.character}
  }

  componentDidMount() {
    const { query } = this.props

    Adapter.get(query).then(source => {
      source = (source.spells ? source.spells : source)
      this.setState({ source })
    })
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      const { query } = this.props
      Adapter.get(query).then(source => {
        source = (source.spells ? source.spells : source)
        this.setState({ source })
      })
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleAdd = (e) => {
    const { query } = this.props
    const newItem = this.state.results.find(item => item.name === this.state.value)
    const found = this.state.currentCharacter[query].find(el => el.name === newItem.name)

    if ((query === "skills" || query === "proficiencies") && found) return

    this.setState(prevState => {
      return {
        ...prevState,
        currentCharacter: {
          ...prevState.currentCharacter,
          [query]: [
            ...prevState.currentCharacter[query],
            newItem
          ]
        }
      }
    }, () => this.props.updateCharacter(this.state.currentCharacter))
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    const { source } = this.state

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    let searchResults = results.map(item => {
      return {
        ...item,
        title: item.name
      }
    })

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={searchResults}
              value={value}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Popup trigger={<Button primary icon='add' onClick={this.handleAdd} />} content="Add this to your character sheet" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCharacter: (character) => { dispatch( updateCharacter(character) )}
  }
}

export default connect(null, mapDispatchToProps)(SearchBar)
