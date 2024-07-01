import userImage from "../assets/Man with Glasses Thinking.png";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.username);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex-1"></div>
      <div className="flex items-center">
        {user ? (
          <>
            <span className="text-gray-600 mr-2">{user}</span>

            <img
              src={userImage}
              alt="User"
              className="w-10 h-10 rounded-full bg-slate-400"
            />
          </>
        ) : (
          <>
            <span className="text-gray-600 mr-2">JamesBlank</span>
            <img
              src={userImage}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
