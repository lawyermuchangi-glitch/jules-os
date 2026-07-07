
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-ink">JULEX OS</h1>
        <p className="mt-2 text-gray-600">AI-powered practice management for Kenyan advocates</p>
        <div className="mt-6 space-x-4">
          <a href="/auth/login" className="inline-block px-6 py-3 bg-ink text-white rounded-lg">Login</a>
          <a href="/auth/signup" className="inline-block px-6 py-3 bg-gilt text-white rounded-lg">Sign Up</a>
        </div>
      </div>
    </div>
  )
}
