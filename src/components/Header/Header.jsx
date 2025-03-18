import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoutBtn } from "../index";
import { MorphingTextDemo } from "../MorphingTextDemo";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavigation = useCallback(
    (slug) => {
      navigate(slug);
      closeMenu();
    },
    [navigate, closeMenu]
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-sm">
      <nav className="flex items-center justify-between h-16 container mx-auto px-4">
        <Link to="/" className="z-50">
        <div  className="scale-40">
          {/* <MorphingTextDemo className="h-4" /> */}
        </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.slug)}
                      className="px-4 py-2 text-sm font-medium text-white md:hover:text-purple-200 md:hover:bg-white/10 rounded-lg transition-all md:duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="text-white md:hover:text-purple-200 ml-4" />
              </li>
            )}
          </ul>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg z-50 text-white"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {isMenuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-lg md:hidden z-40"
            onClick={closeMenu}
          >
            <div
              className="fixed inset-0 flex flex-col items-center justify-center h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/50 rounded-xl border border-white/10 p-4 absolute top-[67px] shadow-lg w-full max-w-sm">
                <ul className="flex flex-col items-center gap-4">
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <li key={item.name}>
                          <button
                            onClick={() => handleNavigation(item.slug)}
                            className="text-lg font-medium text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                  )}
                  {authStatus && (
                    <li>
                      <LogoutBtn className="text-lg font-medium text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
