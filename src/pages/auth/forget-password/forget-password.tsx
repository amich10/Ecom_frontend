export const ForgetPassword = () =>{
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Forget Password</h1>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Send Reset Link
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}