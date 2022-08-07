const mongoose = require("mongoose")
const logger = require("../services/logging.service")

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true

        },
        () => logger.info("Mongo db has started"), (e) => {
            logger.error(`Error in connecting to server: ${error.message}`)
            process.exit(1)
        })

    mongoose.set('debug', function (coll, method, query, doc, options) {
        const set = {
            coll: coll,
            method: method,
            query: query,
            doc: doc,
            options: options
        };

        logger.info(JSON.stringify({
            dbQuery: set
        }));
    });
}

module.exports = connectDB