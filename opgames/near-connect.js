const nearAPI = require('near-api-js')
const NearProvider = require('./NearProvider')
const nearConnectButton = document.getElementById('btn-login-near')

const np = new NearProvider();

// init near
np.init().then(() => {
    nearConnectButton.innerHTML = np.isSignedIn() ? 'Log out NEAR' : 'Login NEAR'
    const {accountId, balance} = np.getAccount()
    const isSignedIn = np.isSignedIn()
    document.getElementById('acc-id').innerText = isSignedIn ? `id: ${accountId}` : 'id: ...' 
    document.getElementById('acc-bal').innerText = isSignedIn ? `bal: ${balance}` : 'bal: ...' 
});

nearConnectButton.addEventListener('click', () => {
    np.isSignedIn() ? np.signOutNear() : np.signInNear()
})