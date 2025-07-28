
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-100">
        <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-center mt-4">The page you are looking for does not exist.</p>
        <p className="text-center mt-2">
            Go back to <a href="/" className="text-blue-500 hover:underline">Home</a>.
        </p>
    </div>
  )
}
