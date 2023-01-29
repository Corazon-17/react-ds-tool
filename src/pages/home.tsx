import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid gap-2 sm:w-2/3 mx-2">
        <p className="text-4xl lg:text-6xl font-extrabold text-center tracking-wide">
          Easily perform some data science techniques without coding.
        </p>
        <p className="text-2xl text-center tracking-wide">
          An open source web application that provides a variety of tools to
          help people do exploratory data, preprocessing, and model building.
        </p>
        <button
          className="mt-2 place-self-center w-max px-4 py-2 text-xl 
            rounded bg-decor-primary text-white"
          onClick={() => navigate("dataset")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
