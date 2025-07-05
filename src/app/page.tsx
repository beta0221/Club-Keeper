import { AppLayout } from '@/components/AppLayout';
import { Facility } from '@/components/Facility';
import Image from 'next/image';

export default function HomePage() {

  const images = [
    "Tezza-9851.jpg",
    "R0021557.jpg",
    "R0021524.JPG",
    "R0021453.JPG",
    "R0021710.jpg",
    "Tezza-7344.JPG",
    "R0021553.JPG",
    "R0021771.JPG",
    "R0021442.jpg"
  ];

  const facilityList = [
    {
      image: 'tiny-house3.png',
      title: '寵物友善',
      description: '帶上最愛你的寵物一起渡假',
    },
    {
      image: 'tiny-house3.png',
      title: '麻將桌',
      description: '手癢摸兩圈',
    },
    {
      image: 'tiny-house3.png',
      title: '壁爐',
      description: '寒冷的冬天，一起盯著營火發呆',
    },
    {
      image: 'tiny-house3.png',
      title: '衝浪板架',
      description: '脫離初學的浪人當然要有自己的浪板',
    },
    {
      image: 'tiny-house3.png',
      title: '自行車',
      description: '綿延的海岸線，騎著單車到處冒險',
    },
    {
      image: 'tiny-house3.png',
      title: '陽傘、野餐用具',
      description: '都幫你準備好了，出門不用再大包小包',
    }
  ];


  const upcomingList = [
    {
      image: 'tiny-office.png',
      title: '辦公空間',
      description: '數位遊牧的人有福了',
    },
    {
      image: 'sauna-cabin.webp',
      title: '桑拿房',
      description: '冬天就是要三溫暖',
    }
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
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">SoftDays 提供</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilityList.map((item, index) => (
              <Facility
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        {/* Up Comming Section */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">籌備中，敬請期待</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingList.map((item, index) => (
              <Facility
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                isGray
              />
            ))}
          </div>
        </div>

        {/* Images Wall Section */}
        {
          images.map((image) => (
            <div className="mb-4 md:mb-16 px-4 flex-1 flex justify-center">
              <Image
                src={`/assets/${image}`}
                alt=""
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