import React, { useContext } from "react";

import { AuthContext } from "@/lib/store/auth-context";

import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const { googleLoginHandler } = useContext(AuthContext);

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Seja bem vindo(a) 👋</h1>

      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
          />
        </div>

        <div className="flex-col items-center justify-center px-4 py-4">
          <h3 className="py-4 text-2xl tracking-wider text-center">Use sua Conta do Google</h3>
          <button
            onClick={googleLoginHandler}
            className="flex items-center gap-2 cursor-pointer btn btn-primary-outline"
          >
            <FcGoogle className="text-2xl " />
           <p className="capitalize">Continue com o Google</p> 
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
