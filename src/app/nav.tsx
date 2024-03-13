import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 text-white">
      <div className="flex flex-col justify-between h-full">
        <div className="text-white mb-10">
          <Link href="/">Home</Link>
        </div>
        <div className="text-white mb-10">
          <Link href="/admin/tickets">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
