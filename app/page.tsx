import FakeAuthSelector from "./fake-auth-selector";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">Hover over the Open bar menu button</h1>
          <p className="text-gray-400 text-lg">To see the animated menu in action</p>
        </div>
        <FakeAuthSelector />
      </main>
    </div>
  )
}
