const http = require('../http')
const opts = require('../opts')
const { validateOptions }=require("../function")


module.exports = function (config) {
    validateOptions(config)
    http.defaults.headers.common['x-api-key'] = config.publickey;
    http.defaults.headers.common['x-secret-key'] = config.secretkey;
    http.defaults.headers.common['x-private-key'] = config.privatekey;
    http.defaults.baseURL =  config.sandbox ? "https://api-sandbox.kkiapay.me" : "https://api.kkiapay.me"
    
    return features
}


const features={

    verify: async (transactionId) => { 

        return http.post(opts.transactionEndpoint,
            {transactionId})
        
            .then((response) => {
                    return response.data
            }).catch((error) => {
                const response = error.response;
                if (response) {
                    // console.log(response.data) // Removed or use standard logger if available
                    if (response.status === 4003) {
                        throw new Error(response.data && response.data.reason ? response.data.reason : 'Transaction Forbidden');
                    }
                }
                // Fallback for other errors or missing response
                throw new Error("Transaction Not Found or Network Error"); 
            })
    
   },

   refund: async (transactionId) => { 

    return http.post(opts.revertEndpoint,
        {transactionId})
    
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response ? error.response.data : { success: false, message: error.message };
        })

    },

    setup_payout: async (options) => { 

        return http.post(opts.payoutEndpoint,
            options)
        
            .then((response) => {
                return response.data
            }).catch((error) => {
                return error.response ? error.response.data : { success: false, message: error.message };
            })
    
        }

}