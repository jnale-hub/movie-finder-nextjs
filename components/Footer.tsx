import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 mt-12 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png" 
              alt="Movie Finder Logo" 
              className="w-8 h-8 object-contain"
              width={32}
              height={32}
            />
            <p className="text-neutral-400 text-sm">
              © {currentYear} - Created by <Link rel="stylesheet" href="https://github.com/jnale-hub">John Mark Delima</Link>
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-neutral-400 hover:text-amber-400 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-neutral-400 hover:text-amber-400 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-neutral-400 hover:text-amber-400 text-sm transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
