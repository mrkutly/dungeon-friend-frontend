const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
const baseUrl = 'https://dungeon-friend-api.herokuapp.com'

const Adapter = {

  createCharacter: function(character) {
    return fetch(`${baseUrl}/characters`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify({ character })
    })
      .then(r => r.json())
  },

  get: function(endpoint) {
    return fetch(`${baseUrl}/${endpoint}`, { mode: 'cors' }).then(r => r.json())
  },

  getData: function(url) {
    return fetch(url).then(r => r.json())
  },

  getPackData: function(urls) {
    return fetch(`${baseUrl}/packs`, { headers: { urls }, mode: 'cors' })
      .then(r => r.json())
  },

  getStartingEquipment: function(url) {
    return fetch(`${baseUrl}/starting_equipment`, { headers: { url }, mode: 'cors' })
      .then(r => r.json())
  },

  login: function(name, password) {
    return fetch(`${baseUrl}/sessions`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify({ user: { name, password }})
    })
      .then(r => r.json())
  },

  reAuth: function(token) {
    return fetch(`${baseUrl}/sessions`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        ...headers,
        'Authorization': token
      }
    })
      .then(r => r.json())
  },

  signUp: function(name, password, password_confirmation) {
    return fetch(`${baseUrl}/users`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify({ user: { name, password, password_confirmation } })
    })
      .then(r => r.json())
  },

  updateCharacter: function(character) {
    return fetch(`${baseUrl}/characters/${character.id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify({ character })
    })
      .then(r => r.json())
  }
}

export default Adapter
