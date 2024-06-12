import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

interface Link {
  name: string;
  link: string;
  _id: string;
}
const AllLinks = () => {
  const { username } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(username);
  const [links, setLinks] = useState<Link[]>([]);
  const getLinks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/link/getLinks/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parseRes = await response.json();
      if (parseRes.success) {
        console.log(parseRes.links);
        setLinks(parseRes.links);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLinks();
  });
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-start justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-5xl mt-32 font-bold text-neutral-700 dark:text-white">
            LinkWizard
          </h1>
          <p className="text-neutral-500 dark:text-white">{username}</p>
          {links.length === 0 ? (
            <p className="text-neutral-500 mt-10 italic dark:text-white">
              No links found for this user
            </p>
          ) : (
            ""
          )}
          {links.map((link) => (
            <Button
              className="px-24 py-2 rounded-md border border-neutral-300  text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              size="lg"
              key={link._id}
            >
              <a href={link.link}>{link.name}</a>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllLinks;
