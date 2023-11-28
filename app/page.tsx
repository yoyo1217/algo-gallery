"use client";
import Navbar from "@/components/navbar";
import Card from "@/components/card";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center items-center gap-y-20 gap-x-14 mt-10 mb-5">
        <Card />
        {/* just temporary */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  );
}
