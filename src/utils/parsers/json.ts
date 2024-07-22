export function parseJson<T>(
  json: string | undefined | null,
  defaultValueOrParser?: T,
): T {
  try {
    if (json == null || json === 'null')
      throw new Error('json is empty')

    return JSON.parse(json) as T
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_e) {
    return typeof defaultValueOrParser === 'function'
      ? defaultValueOrParser(json)
      : defaultValueOrParser
  }
}
