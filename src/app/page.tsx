import { AppLayout } from '@/components/AppLayout';
import { Map } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {

  const images = [
    "Tezza-9851.JPG",
    "R0021557.JPG",
    "R0021524.JPG",
    "R0021453.JPG",
    "R0021710.jpg",
    "Tezza-7344.JPG",
    "R0021553.JPG",
    "R0021771.JPG",
    "R0021442.jpg"
  ];


  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-4 leading-tight">
              歡迎來到 SoftDays
            </h1>
            <p className="text-lg text-amber-800 mb-6">
              您的第二個家。SoftDays 座落於大自然的懷抱中，為您提供一個寧靜的避風港，讓您享受舒適且難忘的住宿體驗。
            </p>
            <a
              href="/profile"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
            >
              成為我們的會員
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/assets/tiny-house4.png"
              alt="溫馨客廳"
              width={480}
              height={320}
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">關於 SoftDays</h2>
            <p className="text-amber-800 text-lg">
              SoftDays 專為放鬆與聯繫而設計。無論您是尋找浪漫假期、家庭聚會還是獨自冒險，我們都能提供完美的環境。享受清晨的香醇咖啡、傍晚的壁爐時光，以及夜晚舒適的床鋪。
            </p>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">設施</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src="/assets/tiny-house1.png" alt="壁爐" width={80} height={80} />
              <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">溫馨壁爐</h3>
              <p className="text-amber-700 text-center">探索一天後，在壁爐旁溫暖身心。</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src="/assets/tiny-house2.png" alt="早餐" width={80} height={80} />
              <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">手作早餐</h3>
              <p className="text-amber-700 text-center">以美味且在地的新鮮早餐展開新的一天。</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src="/assets/tiny-house3.png" alt="自然" width={80} height={80} />
              <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">自然步道</h3>
              <p className="text-amber-700 text-center">走出門外即可享受美麗的步行與自行車道。</p>
            </div>
          </div>
        </div>

        {
          images.map((image) => (
            <div className="mb-4 md:mb-16 px-4 flex-1 flex justify-center">
              <Image
                src={`/assets/${image}`}
                alt="溫馨客廳"
                width={480}
                height={320}
                className="rounded-2xl shadow-lg object-cover"
                priority
              />
            </div>
          ))
        }

        {/* Call to Action */}
        <div id="book" className="max-w-3xl mx-auto px-4 mb-12">
          <div className="bg-amber-100 rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">準備好放鬆了嗎？</h2>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">一起加入我們吧！</h2>
            <p className="text-amber-800 mb-6">預訂您的 SoftDays 之旅，體驗舒適、魅力與熱情款待。</p>
            <a
              href="/profile"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
            >
              成為我們的會員
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}