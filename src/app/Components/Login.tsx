import React from "react";

function Login() {
  return (
    <>
      {" "}
      <main className="bg-[#181a1f] min-h-screen md:px-4 py-5 grid md:grid-cols-2 relative ">
        <section className="bg-teal-950 py-2 px-4  md:py-4 relative rounded-lg">
          <h1 className="text-3xl text-white font-inter font-bold">
            Core
            <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Link
            </span>
          </h1>
          <article className=" flex flex-col justify-center  gap-y-8 mt-12">
            <div>
              <p className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                Create an Account
              </p>
            </div>

            <div className="mt-2  flex flex-col  gap-8">
              <div>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="border border-teal-300 w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="password"
                  className="border border-teal-300 w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
                />
              </div>
              <div>
                <div className="px-2 flex items-center text-white font-inter border border-teal-300 rounded-full py-1  gap-2 justify-center">
                  Login
                </div>
              </div>
            </div>
          </article>
          <div className="mt-6">
            <p className="font-Ibm text-white text-[15px]">
              Didn&apos;t have an account?{" "}
              <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                Signup
              </span>
            </p>
          </div>

          <menu className="mt-8 flex gap-2">
            <input type="checkbox" />
            <label className="font-Ibm text-white text-[12px]">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </menu>
        </section>

        <article className="relative mt-12">
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

export default Login;
