export const Signup = () =>{
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-96">
                    <div className="text-3xl font-semibold text-center">Sign up</div>
                    <div className="text-sm font-medium text-center mt-2">Already have an account? <a href="/signin" className="text-blue-500">Sign in</a></div>
                    <div className="mt-4">
                        <div className="text-sm font-medium text-left py-2">
                            <label className="block mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-2 py-1 border rounded border-slate-400"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="text-sm font-medium text-left py-2">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-2 py-1 border rounded border-slate-400"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="text-sm font-medium text-left py-2">
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-2 py-1 border rounded border-slate-400"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="text-sm font-medium text-left py-2">
                            <label className="block mb-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-2 py-1 border rounded border-slate-400"
                                placeholder="Enter your password again"
                            />
                        </div>
                        <div className="text-sm font-medium text-left py-2">
                            <button className="w-full bg-blue-500 text-white py-1 rounded">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}