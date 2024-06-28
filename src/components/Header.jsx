import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const dummyImages = [
  "https://via.placeholder.com/40?text=User1",
  "https://via.placeholder.com/40?text=User2",
  "https://via.placeholder.com/40?text=User3",
  "https://via.placeholder.com/40?text=User4",
];

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    // Randomly select an image from the dummyImages array
    const randomImage =
      dummyImages[Math.floor(Math.random() * dummyImages.length)];
    setUserImage(randomImage);
  }, []);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex-1"></div>{" "}
      {/* This empty div will push the user info to the right */}
      <div className="flex items-center">
        <span className="text-gray-600 mr-2">Hello, {user.username}</span>
        <img src={userImage} alt="User" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  );
};

export default Header;
