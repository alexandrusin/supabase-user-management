import { CenterLayout } from '@/components/CenterLayout'
import {
  ButtonPrimary,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Form,
  notify,
  PasswordInput,
} from '@openpatch/patches'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useState, FormEventHandler } from 'react'
import { supabase } from 'supabase/browser/client'

export default function PasswordRecoveryPage() {
  const { t } = useTranslation('account')
  const [state, setState] = useState<'default' | 'resetting'>('default')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const router = useRouter()

  const accessToken = router.query.access_token as string

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (password !== passwordRepeat) {
      notify.error(t('passwords-do-not-match'))
      return
    }
    setState('resetting')
    supabase.auth.api
      .updateUser(accessToken, { password })
      .then(() => {
        router.push('/account/signin')
      })
      .catch(() => {
        notify.error(t('error-token-expired'))
        setState('default')
      })
  }

  return (
    <CenterLayout>
      {' '}
      <Card>
        {' '}
        <Form onSubmit={handleSubmit}>
          {' '}
          <CardHeader>{t('reset-password')}</CardHeader>{' '}
          <CardContent>
            {' '}
            <PasswordInput
              placeholder={t('password')}
              value={password}
              onChange={setPassword}
            />{' '}
            <PasswordInput
              placeholder={t('password-repeat')}
              error={password !== passwordRepeat}
              value={passwordRepeat}
              onChange={setPasswordRepeat}
            />{' '}
          </CardContent>{' '}
          <CardFooter>
            {' '}
            <ButtonPrimary
              fullWidth
              type="submit"
              loading={state === 'resetting'}
              disabled={state === 'resetting'}
            >
              {' '}
              {t('reset-password')}{' '}
            </ButtonPrimary>{' '}
          </CardFooter>{' '}
        </Form>{' '}
      </Card>{' '}
    </CenterLayout>
  )
}
