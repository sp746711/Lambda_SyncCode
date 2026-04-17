export const createSocket = (endpoint, handlers = {}) => {
  if (!endpoint || endpoint === 'YOUR_WSS_ENDPOINT') {
    throw new Error('Please set a valid WebSocket endpoint in the UI first.')
  }

  const socket = new WebSocket(endpoint)

  socket.onopen = () => handlers.onOpen?.()
  socket.onerror = (error) => handlers.onError?.(error)
  socket.onclose = (event) => handlers.onClose?.(event)
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      handlers.onMessage?.(data)
    } catch {
      handlers.onMessage?.({ type: 'raw', payload: event.data })
    }
  }

  return socket
}

export const sendSocketMessage = (socket, payload) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    throw new Error('WebSocket is not connected.')
  }
  socket.send(JSON.stringify(payload))
}
