export function parseUrlFromQuery(query: string | string[] | undefined) {
  if (!query) return { url: null, error: null }



  let inferredUrl = Array.isArray(query) ? query[0] : query

  if (inferredUrl.startsWith("localhost")) {
    inferredUrl = "http://" + inferredUrl
  }
  if (inferredUrl.startsWith(":")) {
    inferredUrl = "http://localhost" + inferredUrl
  }
  if (!inferredUrl.startsWith("http")) {
    inferredUrl = "http://" + inferredUrl
  }

  const rawUrl = inferredUrl

  if (
    !rawUrl.startsWith("http://") &&
    !rawUrl.startsWith("https://") &&
    !rawUrl.startsWith("localhost:")
  ) {
    return { url: null, error: "URL must start with http:// or https://" }
  }

  try {
    const tempParsedURL = new URL(rawUrl)

    if (!['http:', 'https:'].includes(tempParsedURL.protocol)) {
      throw new Error("URL must start with http:// or https://")
    }

    return {
      url: tempParsedURL,
      error: null
    }
  } catch (error) {
    return {
      url: null,
      error: error instanceof Error
        ? error.message
        : "An error occurred"
    }
  }
}