import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { createSocket, sendSocketMessage } from '../services/websocket'
import { useAppStore } from '../store/useAppStore'

export const useWebSocket = () => {
  const socketRef = useRef(null)
  const reconnectTimerRef = useRef(null)
  const typingTimerRef = useRef(null)

  const {
    wsEndpoint,
    roomId,
    userId,
    userName,
    language,
    setStatus,
    setOutput,
    setTypingUsers,
    upsertUser,
    setUsers,
    addActivity,
  } = useAppStore()

  const clearReconnect = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current)
      reconnectTimerRef.current = null
    }
  }

  useEffect(() => {
    const connectSocket = () => {
      clearReconnect()
      if (!wsEndpoint || wsEndpoint === 'YOUR_WSS_ENDPOINT') {
        setStatus('disconnected')
        return
      }
      setStatus('reconnecting')

      try {
        socketRef.current = createSocket(wsEndpoint, {
          onOpen: () => {
            setStatus('connected')
            toast.success('Connected to LambdaSyncCode realtime server')
            if (roomId) {
              sendSocketMessage(socketRef.current, { action: 'joinRoom', room_id: roomId, user_id: userId, user_name: userName })
            }
          },
          onClose: () => {
            setStatus('disconnected')
            reconnectTimerRef.current = setTimeout(connectSocket, 2200)
          },
          onError: () => {
            toast.error('WebSocket error occurred')
          },
          onMessage: (message) => {
            if (message.type === 'execution_result') {
              setOutput(message.output ?? 'Execution finished with no output.')
              addActivity('Received execution result')
              return
            }

            if (message.type === 'presence_update') {
              const members = message.users ?? []
              setUsers(members)
              addActivity(`Presence updated: ${members.length} active`)
              return
            }

            if (message.type === 'typing') {
              setTypingUsers(message.users ?? [])
              return
            }

            if (message.type === 'code_update' && message.user_id !== userId) {
              useAppStore.getState().setCode(message.code ?? '')
              upsertUser({ userId: message.user_id, userName: message.user_name })
              addActivity(`Code synced from ${message.user_name ?? 'teammate'}`)
            }
          },
        })
      } catch (error) {
        toast.error(error.message)
        setStatus('disconnected')
      }
    }

    connectSocket()
    return () => {
      clearReconnect()
      clearTimeout(typingTimerRef.current)
      socketRef.current?.close()
    }
  }, [addActivity, roomId, setOutput, setStatus, setTypingUsers, setUsers, upsertUser, userId, userName, wsEndpoint])

  const sendMessage = useCallback((payload) => {
    try {
      sendSocketMessage(socketRef.current, payload)
    } catch (error) {
      toast.error(error.message)
    }
  }, [])

  const joinRoom = useCallback(
    (nextRoomId) => {
      sendMessage({ action: 'joinRoom', room_id: nextRoomId, user_id: userId, user_name: userName })
      useAppStore.getState().setRoomId(nextRoomId)
      upsertUser({ userId, userName })
      addActivity(`Joined room ${nextRoomId}`)
      toast.success(`Joined room ${nextRoomId}`)
    },
    [addActivity, sendMessage, upsertUser, userId, userName],
  )

  const sendCode = useCallback(
    (code) => {
      sendMessage({ action: 'sendCode', room_id: roomId, language, code, user_id: userId, user_name: userName })
    },
    [language, roomId, sendMessage, userId, userName],
  )

  const executeCode = useCallback(
    (code) => {
      setOutput('Running...')
      sendMessage({ action: 'executeCode', room_id: roomId, language, code, user_id: userId })
    },
    [language, roomId, sendMessage, setOutput, userId],
  )

  const publishTyping = useCallback(() => {
    sendMessage({ action: 'typing', room_id: roomId, user_id: userId, user_name: userName, typing: true })
    clearTimeout(typingTimerRef.current)
    typingTimerRef.current = setTimeout(() => {
      sendMessage({ action: 'typing', room_id: roomId, user_id: userId, user_name: userName, typing: false })
    }, 850)
  }, [roomId, sendMessage, userId, userName])

  return { joinRoom, sendCode, executeCode, publishTyping }
}
