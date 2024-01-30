export class NotFoundError extends Error {
  statusCode: number

  constructor(message = 'Entity Not Found') {
    super(message)
    this.statusCode = 404
  }
}

export class UnprocessableEntity extends Error {
  statusCode: number

  constructor(message = 'Unprocessable Entity') {
    super(message)
    this.statusCode = 422
  }
}
