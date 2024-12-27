import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

interface SignInProps {
  providers: Record<string, {
    id: string
    name: string
    type: string
  }>
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-4">
            <Button
              onClick={() => signIn(provider.id)}
              className="w-full"
              variant={provider.id === 'email' ? 'outline' : 'default'}
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

