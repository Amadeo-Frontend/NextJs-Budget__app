"use client";

export default function Home() {
  return (
    <header className="flex items-center justify-between">
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
        <div>stats</div>
        <div>logout</div>
      </nav>
    </header>
  );
}
