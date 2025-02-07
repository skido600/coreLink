import Link from "next/link";

function HomeU() {
  return (
    <>
      <main className="bg-[#181a1f] min-h-screen md:px-20 py-5 grid  lg:grid-cols-2 relative ">
        <section className="bg-[#03346E] py-2 px-4 mx-4  md:py-4 relative rounded-lg">
          <h1 className="text-3xl text-white font-inter font-bold">
            Core
            <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Link
            </span>
          </h1>
          <article className=" flex flex-col justify-center  gap-y-8 mt-12">
            <p className="bg-gradient-to-r text-[2rem]  font-inter from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Welcome to CoreLink
            </p>

            <div className="mt-2">
              <p className="text-white font-inter text-[13px]">
                CoreLink is a centralized platform designed to streamline
                collaboration between admins, workers, and clients. It provides
                real-time updates, secure communication, and a shared workspace
                for managing tasks, products, and projects. Whether you &quot;
                re managing a small team or a large organization, CoreLink
                ensures everyone stays connected and informed.
              </p>
            </div>
            <div className="mt-2  flex flex-col  gap-8">
              <Link href="/signup">
                <p className=" px-3  rounded-full py-2 text-[13px] bg-[#01162A]  text-white text-center font-inter">
                  Sign Up
                </p>
              </Link>
              {/* <Link href="/login">
                <p className=" px-3  bg-[#01162A]  rounded-full py-2 text-[13px]  text-white text-center font-inter">
                  Login as an Admin
                </p>
              </Link> */}
            </div>
          </article>
          {/* <div className="mt-6">
            <p className="font-Ibm text-white">
              Already have an account ?
              <Link href="/login">
                <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                  Log In
                </span>{" "}
              </Link>
            </p>
          </div> */}
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
