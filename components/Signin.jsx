// /components/SignIn.jsx

"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

function SignIn() {
  const { googleLoginHandler, signInWithEmail } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      toast.success("Login realizado com sucesso! 😊");
    } catch (error) {
      console.error("Erro ao fazer login com e-mail e senha:", error);
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Seja bem-vindo(a) 👋</h1>

      <div className="flex flex-col overflow-hidden bg-black shadow-md shadow-slate-500 rounded-2xl">
        <div className="h-48">
          <img
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
            alt="Finance Background"
          />
        </div>

        <div className="px-4 py-4">
          <h3 className="text-2xl text-center">Faça login usando uma conta do Google ou E-mail</h3>

          {/* Botão de Login com Google */}
          <button
            onClick={googleLoginHandler}
            className="flex items-center justify-center w-full gap-2 p-4 mx-auto mt-6 font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>

          {/* Formulário de Login com E-mail */}
          <form onSubmit={handleEmailSignIn} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="w-full p-4 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Entrar com E-mail
            </button>
          </form>

          {/* Link para Registro */}
          <p className="mt-4 text-sm text-center text-gray-400">
            Não tem uma conta?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
