import { afterEach, describe, expect, it, vi } from "vitest";

import { deletePartAction } from "../deletePartAction";

const deletePartUseCaseMock = vi.hoisted(() => vi.fn());

vi.mock("@/server/useCases/parts/deletePartUseCase", () => ({
  deletePartUseCase: deletePartUseCaseMock,
}));

describe("deletePartAction", () => {
  afterEach(() => {
    deletePartUseCaseMock.mockReset();
  });

  it("calls the use case with the given id", async () => {
    await deletePartAction("1");

    expect(deletePartUseCaseMock).toHaveBeenCalledWith("1");
  });
});
