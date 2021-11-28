class InvalidArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentError';
        this.statusCode = '422';
        this.message = message || 'Invalid Argument Error';
    }
}

module.exports = { InvalidArgumentError };
