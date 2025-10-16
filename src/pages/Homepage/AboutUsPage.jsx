import { useEffect, useState } from "react";

const AboutUsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/aboutus.json"); // Update with the correct path to your JSON file
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Loading state while data is fetched
  }

  return (
    <div className="container mx-auto py-6 px-6 md:px-[20%]">
      {/* Manager Voice */}
      <div className="flex flex-col md:flex-row mb-12">
        <img
          src={data.managerImage}
          alt={data.managerName}
          className="w-full md:w-1/2 rounded-lg"
        />
        <div className="w-full md:w-1/2 pl-0 md:pl-4 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{data.managerName}</h2>
          <p className="text-lg">{data.managerVoice}</p>
        </div>
      </div>

      {/* Mission */}
      <div className="hidden md:flex flex-col md:flex-row mb-8 ">
        <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Mission</h2>
          <p className="text-lg">{data.missionText}</p>
        </div>
        <img
          src={data.missionImage}
          alt="Mission"
          className="w-full md:w-1/2 rounded-lg"
        />
      </div>
      {/*For Mobile */}
      <div className="flex flex-col md:flex-row mb-8 md:hidden">
        <img
          src={data.missionImage}
          alt="Mission"
          className="w-full md:w-1/2 rounded-lg"
        />
        <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Mission</h2>
          <p className="text-lg">{data.missionText}</p>
        </div>
      </div>

      {/* Vision */}
      <div className="flex flex-col md:flex-row mb-8">
        <img
          src={data.visionImage}
          alt="Vision"
          className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0"
        />
        <div className="w-full md:w-1/2 pl-0 md:pl-4">
          <h2 className="text-2xl font-bold">Vision</h2>
          <p className="text-lg">{data.visionText}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
