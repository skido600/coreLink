function HomeU() {
  return (
    <>
      <main className="bg-[#181a1f] min-h-screen md:px-4 py-5 grid md:grid-cols-2 relative ">
        <section className="bg-teal-950 py-2 px-4  md:py-4 relative rounded-lg">
          <h1 className="text-3xl text-white font-inter font-bold">
            Core
            <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Link
            </span>
          </h1>
          <article className=" flex flex-col justify-center  gap-y-8 mt-12">
            <p className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Welcome to CoreLink
            </p>

            <div className="mt-2">
              <p className="text-white font-inter text-[13px]">
                CoreLink connects admins, workers, and clients for seamless
                collaboration, real-time updates, and secure communication—all
                in one place
              </p>
            </div>
            <div className="mt-2  flex flex-col  gap-8">
              <p className=" px-3  rounded-full py-2 text-[13px] border border-teal-300 text-white text-center font-inter">
                Sign Up As a Admin
              </p>
              <p className="border border-teal-300 px-3 rounded-full py-2 text-[13px] text-white text-center font-inter">
                Sign Up As a Client
              </p>
            </div>
          </article>
          <div className="mt-6">
            <p className="font-Ibm text-white">
              Already have an account ?
              <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                {" "}
                Log In
              </span>
            </p>
          </div>
        </section>

        <article className="relative  mt-5">
          <p className="md:absolute bottom-0 px-4 text-[13px] text-white font-inter">
            &quot;CoreLink is a collaboration and productivity platform that
            empowers teams to work smarter, not harder. Whether you’re managing
            a project, sharing updates, or communicating with your team,
            CoreLink provides the tools you need to stay connected and
            productive.!&quot;
          </p>
        </article>
      </main>
    </>
  );
}

export default HomeU;
