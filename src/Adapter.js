const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
const baseUrl = 'http://localhost:3000'

const Adapter = {

  createCharacter: function(character) {
    return fetch(`${baseUrl}/characters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ character })
    })
      .then(resp => resp.json())
  },

  get: function(endpoint) {
    return fetch(`${baseUrl}/${endpoint}`).then(resp => resp.json())
  },

  getData: function(url) {
    return fetch(url).then(resp => resp.json())
  },

  getStartingEquipment: function(url) {
    return fetch(`${baseUrl}/starting_equipment`, {headers: { url }}).then(r => r.json())
  },

  login: function(name) {
    return fetch(`${baseUrl}/sessions`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ user: { name }})
    })
      .then(resp => resp.json())
  }
}

export default Adapter
