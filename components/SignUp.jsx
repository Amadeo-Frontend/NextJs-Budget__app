// /components/SignUp.jsx

"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/lib/store/auth-context";
import { toast } from "react-toastify";

function SignUp() {
  const { signUpWithEmail } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      toast.success("Registro realizado com sucesso! 😊");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Erro ao registrar. Verifique os detalhes.");
    }
  };

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Crie sua Conta 👋</h1>

      <div className="flex flex-col overflow-hidden bg-black shadow-md shadow-slate-500 rounded-2xl">
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
            alt="Finance Background"
          />
        </div>

        <div className="px-4 py-4">
          <h3 className="text-2xl text-center">Registre-se usando E-mail e Senha</h3>

          {/* Formulário de Registro */}
          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
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
              className="w-full p-4 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Registrar-se
            </button>
          </form>

          {/* Link para Login */}
          <p className="mt-4 text-sm text-center text-gray-400">
            Já tem uma conta?{" "}
            <a href="/signin" className="text-blue-400 hover:underline">
              Faça Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
