"use client";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div>
      <Navbar>
        <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center items-center gap-y-20 gap-x-14 mt-10 mb-5">
          <Card
            title="Monte Carlo Pi Estimation"
            link="monte-carlo-simulator"
            imageUrl="/monte.png"
          />
          <Card
            title="Knapsack Problem"
            link="knapsack"
            imageUrl="/knapsack.png"
          />
        </section>
      </Navbar>
    </div>
  );
}
