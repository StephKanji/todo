'use client'
import {  useRouter} from "next/navigation";

export default function Home() {
  const router= useRouter()
  return (
    <div className="bg-blue-500 text-white p-4">
      <h1>lets code!!!!</h1>
      <button onClick={() => router.push('/about')}>
        Go to about
      </button>
    </div>
  );
}