
import Partner from "../ui/Partner";

const TrustedPartners = () => {
  return (
    <div className="w-full flex flex-col items-center text-heading-1 md:py-20">
      <div className="flex flex-col xl:space-x-3 space-y-4 md:space-y-0 items-center">
        <h2 className="text-3xl font-semibold">Our Trusted Parteners</h2>
        <p className="text-center text-gray-primary/75  text-lg max-w-xl">
          There are many variations of passages of Lorem Ipsum available but the
          this in majority have suffered alteration in some
        </p>
      </div>

      <Partner />
    </div>
  );
};

export default TrustedPartners;
