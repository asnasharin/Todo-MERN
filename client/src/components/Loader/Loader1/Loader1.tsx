import "./Loader.css";

export default function Loader1() {
  return (
    <div className="w-full min-h-screen flex bg-white dark:bg-gray-900 items-center justify-center">
      <div className="typewriter">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
    </div>
  );
}
