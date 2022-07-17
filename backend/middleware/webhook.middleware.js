const protectWebook = async (req, res, next) => {
    try {
        let webhookKey = req.headers['quidax-signature']

        if (webhookKey != process.env.WEBHOOKKEY) {
            res.status(500).json({
                message: "Error in processing secrets."
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            message: "Not Unauthcorized"
        })
    }
}

module.exports = {
    protectWebook
}