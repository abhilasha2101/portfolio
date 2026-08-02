import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
  GitFork,
  Star,
  FolderGit2,
  ExternalLink,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const headerPills = [
  "Java",
  "Spring Boot",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Git",
];

const aboutStats = [
  { label: "Internship & Experience", value: "6 Months" },
  { label: "Technologies", value: "15+" },
  { label: "Projects Built", value: "8+" },
];

const projects = [
  {
    title: "TwoDo",
    description:
      "A collaborative productivity platform featuring secure authentication, real-time synchronization, offline PWA support, web push notifications, calendar management, and PostgreSQL Row Level Security powered by Supabase.",
    image: "/assets/twodo.svg",
    href: "https://two-do-one.vercel.app",
    github: "https://github.com/abhilasha2101/TwoDo",
  },
  {
    title: "Veritas AI",
    description:
      "AI-powered news verification platform that evaluates claims against reliable sources and generates structured evidence-backed verdicts with confidence scoring and citation support.",
    image: "/assets/veritas.svg",
    href: "https://veritasai-mu.vercel.app",
    github: "https://github.com/abhilasha2101/Veritas-AI",
  },
  {
    title: "Vinyasa",
    description:
      "A fashion discovery platform helping users explore curated outfits, discover style inspiration, and shop seamlessly through a modern editorial interface.",
    image: "/assets/vinyasa.svg",
    href: "https://vinyasa.qzz.io",
    github: "https://github.com/abhilasha2101/Vinyasa",
  },
  {
    title: "AI Booth Management System",
    description:
      "AI-powered civic platform enabling voter registration, grievance management, public issue tracking, and intelligent complaint prioritization using Ollama.",
    image: "/assets/booth.svg",
    href: "https://github.com/vidhika-anjne/BoothManagement",
    github: "https://github.com/vidhika-anjne/BoothManagement",
  },
];

const openSourceProjects = [
  {
    title: "OSSfolio",
    description:
      "A modern developer portfolio template built with Next.js, focused on clean UI, performance, and customization. Actively maintained while contributing to the open-source ecosystem.",
    stars: "Open Source",
    forks: "Template",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    href: "https://github.com/abhilasha2101/ossfolio",
    demo: "https://ossfolio.qzz.io",
  },
];

const services = [
  {
    service: "Full Stack Web Development",
    description:
      "Building scalable web applications using React, Next.js, Node.js, and PostgreSQL.",
    icon: Code2,
  },
  {
    service: "Backend Development",
    description:
      "Designing secure REST APIs and backend systems using Java, Spring Boot, Node.js, and SQL databases.",
    icon: Eye,
  },
  {
    service: "Database Design",
    description:
      "Designing relational databases, optimizing queries, and integrating Supabase, PostgreSQL, and MySQL.",
    icon: Frame,
  },
  {
    service: "Performance Optimization",
    description:
      "Improving application performance, reducing load times, and enhancing user experience.",
    icon: SearchCheck,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-wrap items-center gap-1.5"
            >
              {headerPills.map((tech) => (
                <span key={tech} className={styles.pill}>
                  {tech}
                </span>
              ))}
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Abhilasha.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Software Developer passionate about building scalable web applications and high-performance backend systems.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:abhilasha21012005@gmail.com" passHref>
                <Button>
                  Let&apos;s Connect <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16 pb-2 text-2xl font-light leading-relaxed tracking-tight text-foreground xl:text-3xl">
              Hi, I&apos;m Abhilasha Kumari, a Software Engineering student and Software Developer Intern passionate about building scalable, user-focused applications. I specialize in Java, Spring Boot, React, Next.js, Node.js, PostgreSQL, and modern cloud-based development. During my internship at Rasoi Rasta, I have worked on designing REST APIs, backend workflows, and integrating production features for restaurant management systems.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>

            {/* Projects Grid */}
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  id="tilt"
                  className="flex flex-col justify-between overflow-hidden border border-white/10 bg-white/5 backdrop-blur transition duration-300 hover:border-primary/50 hover:bg-white/10"
                >
                  <CardHeader className="p-0">
                    <Link href={project.href} target="_blank" passHref>
                      {project.image.endsWith(".webm") || project.image.endsWith(".mp4") ? (
                        <video
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          className="aspect-video h-full w-full rounded-t-md bg-primary/20 object-cover"
                        />
                      ) : (
                        <div className="relative aspect-video h-full w-full rounded-t-md bg-primary/20 overflow-hidden">
                          <Image
                            src={project.image.startsWith("/") ? project.image : `/assets/${project.image}`}
                            alt={project.title}
                            width={600}
                            height={300}
                            quality={100}
                            className="aspect-video h-full w-full object-cover transition duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>
                      )}
                    </Link>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between border-t border-white/10 bg-background/80 p-5 backdrop-blur">
                    <div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          {project.github && (
                            <Link
                              href={project.github}
                              target="_blank"
                              passHref
                              className="text-muted-foreground transition hover:text-foreground"
                              title="GitHub Repository"
                            >
                              <FolderGit2 className="h-5 w-5" />
                            </Link>
                          )}
                          {project.href && project.href !== "#" && (
                            <Link
                              href={project.href}
                              target="_blank"
                              passHref
                              className="text-muted-foreground transition hover:text-foreground"
                              title="Live Demo"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </Link>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm tracking-tight text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Source */}
        <section id="opensource" data-scroll-section>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Open Source
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Open source & contributions.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I believe in building in public and contributing back to the developer community.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {openSourceProjects.map((project) => (
                <Card
                  key={project.title}
                  id="tilt"
                  className="flex flex-col justify-between border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:border-primary/50 hover:bg-white/10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <FolderGit2 className="h-8 w-8 text-primary" />
                      <div className="flex items-center space-x-2">
                        {project.href && (
                          <Link
                            href={project.href}
                            target="_blank"
                            passHref
                            className="text-muted-foreground transition hover:text-foreground"
                            title="GitHub Repository"
                          >
                            <FolderGit2 className="h-5 w-5" />
                          </Link>
                        )}
                        {project.demo && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            passHref
                            className="text-muted-foreground transition hover:text-foreground"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm tracking-tight text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.pill}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Star className="h-3.5 w-3.5" />
                        <span>{project.stars}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{project.forks}</span>
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I offer. If you have any
                  questions, feel free to reach out.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s <span className="text-gradient clash-grotesk">Connect.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Open to Software Development internships and full-time opportunities.
            </p>
            <Link href="mailto:abhilasha21012005@gmail.com" passHref>
              <Button className="mt-6">Let&apos;s Connect</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
