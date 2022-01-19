/*
*
* Base Validator class made for custom response
*
* */

class BaseValidator {
    successResponse(res, message = 'Success', data = null, statusCode = 200){
        return res.status(statusCode)
            .send({
                status_code: statusCode,
                message: message,
                data: data
            })
    }

    badResponse(res, message = 'Bad Response', data = null) {
        const statusCode = 400
        return res.status(statusCode)
            .send({
                status_code: statusCode,
                message: message,
                data: data
            })
    }

    notFoundResponse(res, message = ' Not Found Response', data = null) {
        const statusCode = 404
        return res.status(statusCode)
            .send({
                status_code: statusCode,
                message: message,
                data: data
            })
    }

    internalErrorResponse(res, message, error) {
        const statusCode = 500
        return res.status(statusCode)
            .send({
                status_code: statusCode,
                message: message,
                error: error
            })
    }

    resourceConflict(res, message, error) {
        const statusCode = 409
        return res.status(statusCode)
            .send({
                status_code: statusCode,
                message: message,
                error: error
            })
    }

    unprocessableEntityResponse(res, message, validation) {
        const statusCode = 422
        return res.status(statusCode)
            .send({
                status_code: statusCode,
                message: message,
                data: validation
            })
    }

}

export default BaseValidator;

