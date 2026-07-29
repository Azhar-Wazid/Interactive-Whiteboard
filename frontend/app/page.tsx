import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>This is a demo - GeeksforGeeks</h1>
      <h2>Server is started</h2>
      <Link href= "/canvas">
      Canvas
      </Link>
    </div>
  );
}
