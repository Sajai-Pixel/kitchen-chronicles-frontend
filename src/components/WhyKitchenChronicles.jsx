
const features = [
  {
    icon: "fa-solid fa-utensils",
    title: "Tested & Trusted",
    description:
      "Every recipe is cooked and tested in a real kitchen.",
  },
  {
    icon: "fa-solid fa-users",
    title: "A Growing Community",
    description:
      "Home cooks sharing real experiences and favorite recipes.",
  },
  {
    icon: "fa-solid fa-leaf",
    title: "For Every Lifestyle",
    description:
      "Vegetarian, healthy, quick, indulgent — we've got you.",
  },
  {
    icon: "fa-solid fa-heart",
    title: "Simple & Clear",
    description:
      "Easy step-by-step instructions for everyone.",
  },
];

const WhyKitchenChronicles = () => {
  return (
    <section className="bg-[#f8f8f6] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[#b8862c]">
            Why Us
          </span>
          <h2 className="font-serif text-4xl font-semibold leading-tight text-[#1c3026] sm:text-5xl">
            Why You’ll Love Kitchen Chronicles
          </h2>
          <p className="mt-4 text-base leading-7 text-[#68716c]">
            More than just recipes — it’s a community of food lovers.
          </p>
        </div>
        {/* Features */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center"
            >
              {/* Icon */}
              <div
                className="
                  mx-auto mb-6
                  flex h-[72px] w-[72px]
                  items-center justify-center
                  rounded-full
                  bg-[#fff4df]
                  text-[25px]
                  text-[#b98227]
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:bg-[#1c3026]
                  group-hover:text-[#f5c35b]
                "
              >
                <i className={feature.icon}></i>
              </div>
              {/* Title */}
              <h3 className="font-serif text-[21px] font-semibold text-[#1c3026]">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="mx-auto mt-3 max-w-[230px] text-sm leading-7 text-[#707873]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKitchenChronicles;