import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
interface Link {
  name: string;
  link: string;
  _id: string;
}
interface LinkCardProps {
  //   index: number;
  linkElement: Link;
  onLinkClick: (link: Link) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ linkElement, onLinkClick }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [toEdit, setToEdit] = useState(false);
  const [name, setName] = useState(linkElement.name);
  const [link, setLink] = useState(linkElement.link);
  const { toast } = useToast();
  const handleEdit = async () => {
    try {
      //   console.log(linkElement._id, name, link);

      const response = await fetch(
        `${BASE_URL}/link/update/${linkElement._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken") || "",
          },
          body: JSON.stringify({ name: name, link: link }),
        }
      );
      const parseRes = await response.json();
      if (parseRes.success) {
        setToEdit(false);
        onLinkClick(linkElement);
      } else {
        toast({ description: "Something went wrong", variant: "destructive" });
      }
    } catch (error) {
      toast({ description: "Something went wrong" });
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/link/delete/${linkElement._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken") || "",
          },
        }
      );
      const parseRes = await response.json();
      if (parseRes.success) {
        onLinkClick(linkElement);
      } else {
        toast({ description: "Something went wrong", variant: "destructive" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card key={linkElement._id}>
        <CardHeader>
          <CardTitle>Link </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex flex-col gap-2 justify-start items-start">
            <Input
              disabled={!toEdit}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              type="url"
              placeholder="https://example.com"
              pattern="https://.*"
              required
              disabled={!toEdit}
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </CardDescription>
        </CardContent>
        <CardFooter>
          {!toEdit ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setToEdit(true)}>
                Edit
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <p>Are you sure you want to delete this link?</p>
                  </DialogDescription>
                  <div className="flex gap-2">
                    {/* <Button
                      variant="outline"
                      onClick={() => {
                        setDeleteDialog(false);
                      }}
                    >
                      Cancel
                    </Button> */}
                    <Button variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <>
              <Button variant="outline" onClick={() => handleEdit()}>
                Update
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setToEdit(false);
                  setLink(linkElement.link);
                  setName(linkElement.name);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default LinkCard;
