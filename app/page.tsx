"use client";
import Card from "@/components/Card";
import { routes } from "@/utils/routes";

export default function Home() {
  return (
    <>
      <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center items-center gap-y-20 gap-x-14 mt-10 mb-5">
        {routes.map((route) => (
          <Card
            key={route.title}
            title={route.title}
            link={route.link}
            imageUrl={route.imageUrl}
          />
        ))}
      </section>
    </>
  );
}
