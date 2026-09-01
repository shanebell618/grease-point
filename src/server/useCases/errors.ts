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

export class InsufficientStockError extends PublicError {
  constructor(partName: string, available: number, requested: number) {
    super(
      `Not enough ${partName} in stock: ${available} available, ${requested} requested`,
    );
    this.name = "InsufficientStockError";
  }
}
