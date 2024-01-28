import Image from "next/image";

export default function Home() {
  return (
    <>
      <div  style={{ backgroundColor: '#AAA9BC' }}>
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-green-400 sm:text-4xl">
                SentinelSafe
                <br />
                Your Local Guardian
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A web app Empowering Communities, Ensuring Safety and overall
                well being of the citizens.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start ">
                <a
                  href="#"
                  className="rounded-md bg-green-400 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get Started &nbsp; &nbsp; →
                </a>
              </div>
            </div>
            <div className="relative  h-80 lg:mt-19">
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none bg-white/5 ring-1 ring-white/10"
                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
