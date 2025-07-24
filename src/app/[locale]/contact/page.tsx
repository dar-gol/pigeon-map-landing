"use client";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-xl shadow-lg border border-primary-20 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-primary-100 text-center md:text-left">
            Contact
          </h1>
          <p className="mb-4 text-grey-80 text-center md:text-left">
            If you have any questions, suggestions, or want to get in touch,
            feel free to email us at:
          </p>
          <div className="flex justify-center md:justify-start mb-8">
            <a
              href="mailto:kontakt@digging.pl"
              className="inline-block text-primary-80 hover:underline hover:text-primary-100 font-medium transition text-lg"
            >
              kontakt@digging.pl
            </a>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-primary-90 text-center md:text-left">
              Social Media
            </h2>
            <ul className="flex flex-col gap-2 items-center md:items-start text-grey-70">
              <li>
                <a
                  href="https://digging.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary-80"
                >
                  Digging shop
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@diggingtv-pigeonmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary-80"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://patronite.pl/pigeonmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary-80"
                >
                  Patronite
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-primary-90 text-center md:text-left">
            Our Address
          </h2>
          <div className="bg-primary-10/30 border border-primary-20 rounded-lg p-4 text-center md:text-left text-grey-80 mb-8">
            <div className="font-semibold">DIGGING Barbara Skrzypnik</div>
            <div className="mb-1">NIP: 879 153 05 59</div>
            <div>Sikorowo 32</div>
            <div>88-100 Inowrocław</div>
            <div>Woj. kujawsko-pomorskie</div>
            <div className="mt-2">
              Call:{" "}
              <a
                href="tel:607701351"
                className="text-primary-80 hover:underline"
              >
                607701351
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
