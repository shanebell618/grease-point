export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends PublicError {
  constructor(resourceType?: string) {
    super(`${resourceType ?? "Resource"} not found`);
    this.name = "NotFoundError";
  }
}
