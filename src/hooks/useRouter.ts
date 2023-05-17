import { useNavigate } from 'react-router-dom'
import { LogCardElement } from '../types/LogCard'

export const useRouter = () => {
  const router = useNavigate()

  return {
    currentPath: window.location.hash,
    routeTo: (path: string, data?: LogCardElement) => router(path, { state: data })
  }
}
