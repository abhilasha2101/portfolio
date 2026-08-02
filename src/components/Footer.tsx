import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";

export default function Footer() {
  // get the current time in UTC+5:30 time zone (IST)
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/abhilasha2101"
              target="_blank"
              passHref
              className="text-foreground transition hover:text-primary"
            >
              Abhilasha Kumari
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold" suppressHydrationWarning>
              {mounted ? time : "--:--"} IST (UTC+5:30)
            </p>
          </span>
        </span>
        <Button variant={"outline"} asChild>
          <a
            href="mailto:abhilasha21012005@gmail.com"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <MailIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:flex">abhilasha21012005@gmail.com</span>
          </a>
        </Button>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
