export default function Aboutus() {
  return (
    <section>
      <div>
        <h3 className="text-sm text-center text-[#006A7F] pb-5 mt-15">(About us)</h3>
        <p className="text-3xl font-normal max-w-[38ch] mx-auto text-center leading-tight pb-2">
          Your health matter to us. That's why we listen, care, and use the{" "}
          <span className="italic">latest dental</span> methods to deliver
          treatments that feel <span className="italic">natural</span> and
          comfortable.
        </p>
        <p className="text-[12px] max-w-[48ch] mx-auto text-center leading-tight ">
          Our team of experienced doctors utilise advanced methods and the
          latest equipment to deliver the personalized care that keeps your
          smile healthy and strong. We offer a wide range of services from
          routine checkup to the complex procedures, all under one roof.{" "}
        </p>
      </div>
      <div className="flex justify-center mt-12">
        <iframe
          width="80%"
          height="600"
          src="https://www.youtube.com/embed/AWGwDr80MpE?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
