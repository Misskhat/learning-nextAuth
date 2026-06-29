import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="border-b-2 p-4 gap-3 flex items-center justify-center">
      <Link className="rounded border hover:bg-amber-100 p-2" href={"/"}>
        Home
      </Link>
      <Link
        className="rounded border hover:bg-amber-100 p-2"
        href={"/public-router"}
      >
        Public
      </Link>
      <Link className="rounded border hover:bg-amber-100 p-2" href={"/private"}>
        Private
      </Link>
      <Link className="rounded border hover:bg-amber-100 p-2" href={"/admin"}>
        Admin
      </Link>
    </div>
  );
}

export default Navbar;
