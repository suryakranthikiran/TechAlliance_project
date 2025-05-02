import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 w-full mt-10">
      <aside className="text-center text-sm sm:text-base">
        <p>
          &copy; {new Date().getFullYear()} - All rights reserved by Surya
          Kranthi Kiran, Tamarapilli
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
