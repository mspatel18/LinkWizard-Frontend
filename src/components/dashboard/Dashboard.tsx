import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LinkCard from "@/components/dashboard/LinkCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Link {
  name: string;
  link: string;
  _id: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [links, setLinks] = useState<Link[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const handleAddLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/link/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken") || "",
        },
        body: JSON.stringify({ name: name, link: link }),
      });

      const parseRes = await response.json();

      if (parseRes.success) {
        getLinks();
        setName("");
        setLink("");
      } else {
        throw new Error(parseRes.message || "Operation was not successful");
      }
    } catch (error) {
      // console.error("Error occurred:", error);

      toast({
        title: "Error",
        variant: "destructive",
        description: `${error}`,
        duration: 3000,
      });
    }
  };
  const getLinks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/link/getLinks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken") || "",
        },
      });

      const parseRes = await response.json();
      if (parseRes.success) {
        setLinks(parseRes.links);
        setUsername(parseRes.username);
        setLoading(false);
      } else {
        toast({ description: "Something went wrong" });
      }
    } catch (error) {
      console.log("error checking for toast");
      toast({
        description: `${error}`,
      });
      console.log(error);
    }
  };
  const handleLinkClick = () => {
    getLinks();
    // Handle the link click event here, e.g., navigate to the link or perform some action
  };
  useEffect(() => {
    getLinks();
    if (!localStorage.getItem("authtoken")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl mt-32 font-bold text-center">Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <h2 className="text-xl mt-6 font-semi text-center capitalize">
            Welcome, {username}
          </h2>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mt-4">
        <div className=" sm:h-screen mx-6 sm:w-96 ">
          <div className=" ">
            <Card className=" ">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    Your Links
                  </CardTitle>
                  <a href={`/${username}`} target="_blank">
                    <Button variant="outline">Preview</Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent className="flex gap-3 flex-col justify-center items-stretch ">
                {links.map((link) => (
                  <div key={link._id}>
                    <a href={link.link}>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full px-24"
                      >
                        <span className="truncate whitespace-wrap overflow-hidden">
                          🔗{link.name}
                        </span>
                      </Button>
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mx-6 mb-2 h-full sm:w-full flex gap-4 flex-col shadow-sm">
          {/* <h1>Dashboard</h1> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* <h2>Welcome, {username}</h2> */}
              {/* <div className="flex flex-row h-full"> */}
              {/* <div className=""> */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Add New Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleAddLink}
                    className="flex flex-col gap-2 justify-start items-start"
                  >
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      pattern="https://.*"
                      required
                      value={link}
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                    />
                    <Button type="submit">Add</Button>
                  </form>
                </CardContent>
              </Card>
              {/* </div> */}
              {/* </div> */}
              {!loading && links.length === 0 && (
                <Card>
                  <span>No links found.</span>
                </Card>
              )}
              <div className="text-xl font-bold">Edit Your Links</div>
              {links.map((link) => {
                return (
                  <>
                    <div key={link._id}>
                      <LinkCard
                        linkElement={link}
                        onLinkClick={handleLinkClick}
                      />
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
