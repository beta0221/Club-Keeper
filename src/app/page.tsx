import { AppLayout } from '@/components/AppLayout';
import Image from 'next/image';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-4 leading-tight">
              Welcome to SoftDays
            </h1>
            <p className="text-lg text-amber-800 mb-6">
              Your home away from home. Nestled in the heart of nature, SoftDays offers a tranquil escape with all the comforts you need for a memorable stay.
            </p>
            <a
              href="#book"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
            >
              Become Our Member
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/assets/tiny-house4.png"
              alt="Cozy Living Room"
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
            <h2 className="text-2xl font-bold text-amber-900 mb-4">About SoftDays</h2>
            <p className="text-amber-800 text-lg">
              SoftDays  is designed for relaxation and connection. Whether you're seeking a romantic getaway, a family retreat, or a solo adventure, our  provides the perfect setting. Enjoy mornings with fresh coffee, evenings by the fireplace, and restful nights in our plush beds.
            </p>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src="/assets/tiny-house1.png" alt="Fireplace" width={80} height={80} />
              <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">Cozy Fireplace</h3>
              <p className="text-amber-700 text-center">Warm up by the fire after a day of exploring.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src="/assets/tiny-house2.png" alt="Breakfast" width={80} height={80} />
              <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">Homemade Breakfast</h3>
              <p className="text-amber-700 text-center">Start your day with a delicious, locally-sourced breakfast.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src="/assets/tiny-house3.png" alt="Nature" width={80} height={80} />
              <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">Nature Trails</h3>
              <p className="text-amber-700 text-center">Step outside to beautiful walking and biking trails.</p>
            </div>
          </div>
        </div>


        <div className="mb-16 flex-1 flex justify-center">
          <Image
            src="/assets/IMG_7930.png"
            alt="Cozy Living Room"
            width={480}
            height={320}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>

        <div className="mb-16 flex-1 flex justify-center">
          <Image
            src="/assets/IMG_8923.png"
            alt="Cozy Living Room"
            width={480}
            height={320}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>

        <div className="mb-16 flex-1 flex justify-center">
          <Image
            src="/assets/IMG_4837.png"
            alt="Cozy Living Room"
            width={480}
            height={320}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>




        {/* Call to Action */}
        <div id="book" className="max-w-3xl mx-auto px-4 mb-12">
          <div className="bg-amber-100 rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Ready to Relax ?</h2>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Join Us !</h2>
            <p className="text-amber-800 mb-6">Reserve your stay at SoftDays  and experience comfort, charm, and hospitality.</p>
            <a
              href="mailto:info@SoftDays.com"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
            >
              Become Our Member
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}