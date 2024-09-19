import React from "react";
import NavLinks from "./NavLink";
function SideNav() {
  return (
    <div className="flex w-full h-full flex-col px-3 py-4 md:px-4">
      <div className="my-6">
        <a className="" href={"#"}>
          <p className="text-center text-sm font-medium md:mb-5">
            GreenCleanEarth.org
          </p>
        </a>
        <h1 className="text-primary text-3xl mx-3">Forms</h1>
      </div>
      <NavLinks />
    </div>
  );
}

export default SideNav;
