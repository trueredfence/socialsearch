import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Card = ({ post }) => {
  console.log(post);
  let photo = false;
  if (post[1].photo !== undefined && post[1].photo !== null) {
    photo = (
      <Image
        src={post[1].photo}
        alt="profile_image"
        width={50}
        height={50}
        className="rounded-full object-contain"
      />
    );
  }

  const imagePath = `assets/images/${post[0]}.svg`;
  const handleImageError = (event) => {
    event.target.src = "assets/images/pfinderlogo.svg";
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={`assets/images/${post[0]}.svg`}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onError={handleImageError}
          />

          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post[0]}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {photo && photo}
              {/* {post.creator.email} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
