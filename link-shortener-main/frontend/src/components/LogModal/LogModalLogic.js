import { useState } from 'react'
import { supabase } from '../../config/supabase.js'
import { redirectUrl } from '../../config/supabase.js'
import { useNavigate } from 'react-router-dom'

export const useLogModal = (feedToast) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)

      const { session, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      })

      if (error) throw error

      if (session) {
        navigate('dashboard')
      }
    } catch (error) {
      console.error('Google login error: ', error.message)
      setLoading(false)
      feedToast('error')
    }
  }

  const handleGitHubLogin = async () => {
    try {
      setLoading(true)

      const { session, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectUrl,
        },
      })

      if (error) throw error

      if (session) {
        navigate('dashboard')
      }
    } catch (error) {
      console.error('GitHub login error: ', error.message)
      setLoading(false)
      feedToast('error')
    }
  }

  return {
    loading,
    handleGoogleLogin,
    handleGitHubLogin,
  }
}
