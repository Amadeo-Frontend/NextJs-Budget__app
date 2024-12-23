"use client";

import { IoPieChartSharp } from "react-icons/io5";

const Header = () => {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User information */}
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              src="https://placehold.co/100x100"
              alt="Profile image"
              className="object-cover w-full h-full"
            />
          </div>
          <small>Hi, Leon</small>
        </div>

        <nav className="flex items-center gap-2">
          <div>
            <a href="#chart">
              <IoPieChartSharp className="text-2xl cursor-pointer hover:scale-105 fill-[var(--foreground)]" />
            </a>
          </div>
          <div>
            <button className="btn btn-danger">Sign out</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
