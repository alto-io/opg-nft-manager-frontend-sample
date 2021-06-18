const nearAPI = require('near-api-js')
const NearProvider = require('./NearProvider')

const np = new NearProvider();

// init near
np.init();

document.getElementById("btn-login-near").addEventListener("click", () => {
       np.signInNear()
})