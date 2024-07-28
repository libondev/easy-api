type Callback = () => void

export const useLazyTask = (() => {
  if (typeof window.scheduler.postTask === 'function') {
    return (fn: Callback) => window.scheduler.postTask(fn, {
      delay: 1000,
      priority: 'background',
    })
  }

  return (fn: Callback) => setTimeout(fn, 0)
})()
