class NotFoundException extends Error
{
    constructor (message)
    {
        super(message);
        this.name = 'NotFoundException';
        this.statusCode = '404';
        this.message = "Resource is not found";
    }
}

module.exports = { NotFoundException }