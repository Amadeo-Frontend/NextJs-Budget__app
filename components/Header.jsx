// /components/Header.jsx

"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/store/auth-context";
import { ImStatsBars } from "react-icons/im";

function Header() {
  const { user, loading, logout } = useContext(AuthContext);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* img */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={user.photoURL || "/default-avatar.png"} // Adicionado fallback para avatar
                alt={user.displayName || "User"}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* name */}
            <small>Olá, {user.displayName || "Usuário"}!</small>
          </div>
        )}

        {/* Right side of our navigation */}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger hover:bg-red-800">
                Sair
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
