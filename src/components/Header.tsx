import Link from "next/link";
import "./Header.scss";

export default function Header() {
  return (
    <Link href="/">
        <img className="logo" src="logo.png" alt="Logo with trophy and globe" />
    </Link>
  );
}
