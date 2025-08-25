"use client";
import Link from "next/link";
import { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import useAuth from "../../../hooks/useAuth";

export default function NavBar() {
  const { data, loading } = useContext(Authcontext);
  const { logout } = useAuth(); // Use hook tab r
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        Dine IN{" "}
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <>
              <button
                className="bg-red-500 hover:bg-blue-300 text-white font-semibold py-1 px-4 rounded mr-2 transition-colors duration-200 shadow"
                onClick={logout}
              >
                Logout
              </button>
              <span className="bg-gray-200 text-gray-700 rounded-full p-2">
                  {getInitials(data.firstName, data.lastName)}
              </span>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="bg-red-500 hover:bg-blue-300 text-white font-semibold py-1 px-4 rounded mr-2 transition-colors duration-200 shadow"
                >
                  {" "}
                  SignUp{" "}
                </Link>
                <Link
                  href="/login"
                  className="bg-red-500 hover:bg-blue-300 text-white font-semibold py-1 px-4 rounded transition-colors duration-200 shadow"
                >
                  {" "}
                  Login{" "}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
