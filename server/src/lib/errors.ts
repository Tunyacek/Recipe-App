import { StatusCodes } from 'http-status-codes'

export abstract class BaseCustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, BaseCustomError.prototype)
  }
}

export class NotFoundError extends Error {
  statusCode = StatusCodes.NOT_FOUND

  constructor(message = 'Entity Not Found') {
    super(message)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class UnprocessableEntity extends Error {
  statusCode = StatusCodes.UNPROCESSABLE_ENTITY

  constructor(message = 'Unprocessable Entity') {
    super(message)
    Object.setPrototypeOf(this, UnprocessableEntity.prototype)
  }
}
