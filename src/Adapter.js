const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
const baseUrl = 'http://localhost:3000'

const Adapter = {

  createCharacter: function(character) {
    return fetch(`${baseUrl}/characters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ character })
    })
      .then(r => r.json())
  },

  get: function(endpoint) {
    return fetch(`${baseUrl}/${endpoint}`).then(r => r.json())
  },

  getData: function(url) {
    return fetch(url).then(r => r.json())
  },

  getPackData: function(urls) {
    return fetch(`${baseUrl}/packs`, { headers: { urls } }).then(r => r.json())
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
      .then(r => r.json())
  },

  updateCharacter: function(character) {
    return fetch(`${baseUrl}/characters/${character.id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ character })
    })
      .then(r => r.json())
  }
}

export default Adapter
