const nearAPI = require('near-api-js')

module.exports = class NearProvider {
    // nearAPI
    #userAccount = null
    #contract = null
    #wallet = null 

    // constructor(nearAPI) {
    //     this.nearAPI = nearAPI
    // }

    init = async function() {
        console.log("Near Initializing")
        const { connect, keyStores, WalletConnection, Contract } = nearAPI

        // connect to NEAR  
        const near = await connect({
            deps: {
                keyStore: new keyStores.BrowserLocalStorageKeyStore(),
            },
            networkId: "default",
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org"
        })

        // create wallet connection
        this.#wallet = new WalletConnection(near)

        if (this.#wallet.getAccountId()) {
            const userAccount = {
                accountId: this.#wallet.getAccountId(),
                balance: (await this.#wallet.account().state()).amount 
            }

            this.#userAccount = userAccount 
        }

        const contractName = 'oparcade-dev-1.opgames.testnet'
        this.#contract = await new Contract(this.#wallet.account(), contractName, {
            changeMethods: [],
            viewMethods: [],
            sender: this.#wallet.getAccountId()
        })

        console.log("Near Initialized with account: ", this.#userAccount)
    }

    signInNear = async function() {
        console.log("User logging in...")
        await this.#wallet.requestSignIn(
            'oparcade-dev-1.opgames.testnet',
            'Near Test',
            'http://localhost:1234',
            'http://localhost:1234'
        )

        this.init()
        console.log("User logged in: ", this.#userAccount)
    }

    signOutNear = async function() {
        console.log("Logging out user: ", this.#userAccount)
        await this.#wallet.signOut()

        this.#userAccount = null
        console.log("User logged out")
    }

}