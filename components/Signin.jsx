// /components/SignIn.jsx

"use client";

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const { googleLoginHandler, user, loading } = useContext(AuthContext);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    
    if (!loading) {
      setIsPageLoading(false);
    }
  }, [loading]);

  const handleGoogleSignIn = async () => {
    try {
      await googleLoginHandler();
      toast.success("Login realizado com sucesso! 😊");
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      toast.error("Erro ao fazer login com Google. Tente novamente.");
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full bg-gray-900 h-dvh">
         <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 object-cover w-full h-full opacity-80"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      {/* Loader de Página */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="absolute flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo da Página */}
      {!isPageLoading && (
        <motion.div
          className="relative z-10 w-full max-w-md p-8 text-center bg-gray-800 shadow-lg bg-opacity-90 rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Título de Boas-Vindas */}
          <h1 className="mb-4 text-4xl font-bold text-white">
            Seja bem-vindo(a) ao Balanço Financeiro
          </h1>

          {/* Descrição */}
          <p className="mb-6 text-gray-400">
            Gerencie suas finanças de forma simples e eficiente. Faça login com sua conta do Google para começar!
          </p>

          {/* Botão de Login com Google */}
          <motion.button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-4 px-6 py-3 mx-auto text-gray-800 transition duration-300 bg-white rounded-lg shadow hover:bg-gray-100"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            aria-label="Continuar com o Google"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-semibold">Autenticar com o Google</span>
          </motion.button>
        </motion.div>
      )}

      {/* Toast Container para notificações */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default SignIn;
