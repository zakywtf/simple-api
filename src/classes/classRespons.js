class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.code = 400
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.code = 404
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
        this.code = 500
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.name = "UnauthorizedError";
        this.code = 401
    }
}

module.exports = {
    ValidationError,
    NotFoundError,
    ServerError,
    UnauthorizedError
}