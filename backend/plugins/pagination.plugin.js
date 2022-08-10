const PaginatePlugin = (schema, options) => {
    options = options || {}
    schema.query.paginate = async function (params) {
        const pagination = {
            limit: options.limit || 10,
            page: 1,
            count: 0
        }
        pagination.limit = parseInt(params.limit) || pagination.limit
        const page = parseInt(params.page)
        pagination.page = page > 0 ? page : pagination.page
        const offset = (pagination.page - 1) * pagination.limit
        
        const [data, count] = await Promise.all([
            this.limit(pagination.limit).skip(offset),
            this.model.countDocuments(this.getQuery())
        ]);
        pagination.pages = Math.ceil( count / pagination.limit )
        pagination.count = count;
        return { data, pagination }
    }
}

module.exports = PaginatePlugin