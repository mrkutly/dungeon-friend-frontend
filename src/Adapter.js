const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
const baseUrl = 'http://localhost:3000'


const Adapter = {
  login: function(name) {
    return fetch(`${baseUrl}/sessions`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ user: { name }})
    })
      .then(resp => resp.json())
  },

  get: function(endpoint) {
    return fetch(`${baseUrl}/${endpoint}`).then(resp => resp.json())
  },

  getData: function(url) {
    return fetch(url).then(resp => resp.json())
  }
}

export default Adapter
