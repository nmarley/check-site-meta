
export type ErrorInfo = {
  type: "input" | "fetch" | "server" | "parse" | "other"
  summary: string,
  detail?: string,
}

export function createError(
  type: ErrorInfo["type"],
  summary: string,
  detail?: string
): ErrorInfo {
  return { type, summary, detail } as ErrorInfo
}

export class AppError extends Error implements ErrorInfo {
  constructor(
    readonly error: unknown,
    readonly type: "input" | "fetch" | "server" | "parse" | "other",
    readonly summary: string,
    readonly detail?: string | undefined,
  ) {
    super(summary)
  }

  toObject(): ErrorInfo {
    return {
      type: this.type,
      summary: this.summary,
      detail: this.detail,
    }
  }
}
