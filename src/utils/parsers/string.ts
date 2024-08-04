export function calculateStringByteSize(str: string | object) {
  if (typeof str !== 'string') {
    str = JSON.stringify(str)
  }

  if (!str) {
    return 0
  }

  let size = 0
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (code <= 0x007F) {
      size += 1 // ASCII字符占1个字节
    } else if (code <= 0x07FF) {
      size += 2 // 非ASCII字符的首字节在0xC0-0xDF之间，第二字节在0x80-0xBF之间，共占2个字节
    } else if (code >= 0xD800 && code <= 0xDFFF) {
      // 对于UTF-16的代理对，需要计算两个字符
      size += 4 // 通常情况下，一个字符可能由一个代理对表示，占4个字节
    } else {
      size += 3 // 其他非ASCII字符占3个字节
    }
  }

  return size
}

export function formatStringSizeWithUnit(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return {
      size: 0,
      unit: 'B',
    }
  }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return {
    size: Number.parseFloat((bytes / k ** i).toFixed(dm)),
    unit: sizes[i],
  }
}
