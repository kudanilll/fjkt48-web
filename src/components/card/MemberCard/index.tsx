"use client";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Image from "next/image";
import Link from "next/link";

type MemberCardProps = {
  name: string;
  gen?: string;
  image: string;
  jikoshoukai: string;
};

export default function MemberCard(props: MemberCardProps) {
  const [flip, setFlip] = useState<boolean>(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      {/* front card */}
      <div
        // href={"/member/" + props.name.replaceAll(" ", "-").toLowerCase()}
        className="m-1.5 cursor-pointer"
        onClick={() => setFlip(!flip)}>
        <div className="rounded-2xl bg-gray-300">
          <div className="overflow-visible">
            <Image
              className="w-full object-cover rounded-t-2xl"
              width={500}
              height={500}
              alt={props.name}
              src={props.image}
              priority={true}
            />
          </div>
          <div className="text-small py-3 px-4 flex-col items-start">
            <h4 className="font-poppins font-semibold text-xl sm:mb-8 h-16 md:h-0">
              {props.name}
            </h4>
            <p className="sm:bottom-0 sm:mb-3 sm:mt-2 py-1 text-sm">
              {props.gen}
            </p>
          </div>
        </div>
      </div>
      {/* back card */}
      <div className="m-1.5 cursor-pointer" onClick={() => setFlip(!flip)}>
        <div className="rounded-2xl bg-gray-300">
          <div className="text-small py-3 px-4 flex-col items-start">
            <h4 className="font-poppins font-semibold text-xl sm:mb-8 h-16 md:h-0">
              {props.name}
            </h4>
            <p className="sm:bottom-0 sm:mb-3 sm:mt-2 py-1 text-sm">
              {props.jikoshoukai}
            </p>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
}
