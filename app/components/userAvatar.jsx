"use client";
import Image from "next/image";

export default function UserAvatar({ size, space, user }) {
  const bodyColor = [
    "9327D6",
    "384FD3",
    "26BFC9",
    "D89F32",
    "3DCC6E",
    "C84638",
    "F3F327",
  ];
  const bgColor = [
    "DFC7FF",
    "7FF0E9",
    "9BAAFC",
    "F5D3AC",
    "B3F3C1",
    "F5C9C9",
    "F3F3AF",
  ];
  return (
    <div className={`mr-${space}`}>
      <Image
        height={size}
        width={size}
        src={`https://api.dicebear.com/6.x/thumbs/svg?backgroundColor=${bgColor}&shapeColor=${bodyColor}&seed=${
          user ? user : "placeholder"
        }.svg`}
        alt="user-image"
        className="rounded-full"
        priority
      />
    </div>
  );
}
