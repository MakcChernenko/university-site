"use client";
import Link from "next/link";

function Page() {
  return (
    <main>
      <Link href="/slider">Predmets</Link>
      <Link href="/dnd">DND</Link>
      <Link href="/calculate">Calculate</Link>
      <Link href="/exorcism">Гей Андрій</Link>
      <Link href="/drawGraf">редактор графів</Link>
    </main>
  );
}

export default Page;
