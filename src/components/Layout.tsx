import { ReactNode } from "react";
import { Navbar, Button } from "flowbite-react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import useSession from "../hooks/useSession";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const logout = () => {
    session.logout();
    router.push("/login");
  };
  return (
    <div className="h-screen">
      <Toaster
        toastOptions={{
          duration: 5000,
          position: "top-right",
        }}
        containerClassName="my-16"
      />
      <Navbar fluid className="bg-white drop-shadow-lg dark:bg-slate-800">
        <div className="flex gap-2">
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-4xl font-extrabold text-transparent"
          >
            SBJP
          </Link>
        </div>
        <div className="flex gap-2">
          {session.isAuth ? (
            <>
              <Link href="/sensor/add">
                <Button>+ Add sensor</Button>
              </Link>
              <Button onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Link href="/sign-up">
                <Button>Sign up</Button>
              </Link>
              <Link href="/login">
                <Button>Log in</Button>
              </Link>
            </>
          )}
        </div>
      </Navbar>
      <main className="flex h-[calc(100vh-62px)] flex-col items-center justify-start bg-white p-4 dark:bg-slate-800">
        {children}
      </main>
    </div>
  );
}
