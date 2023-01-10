module.exports = {
    target: 'https://auth.ebay.com', // URL cible du proxy
    changeOrigin: true, // Modifie l'en-tête Host de la demande pour correspondre à l'URL cible
    logLevel: 'debug' // Affiche les informations de débogage dans la console
}
