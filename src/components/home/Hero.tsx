import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import SignUpModal from "./SignupModal";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/dashboard");
    }
  });
  return (
    <div className="h-screen">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          LinkWizard
          <br />
          <Highlight className="text-black  dark:text-white">
            Create, Share, and Manage your links.
          </Highlight>
        </motion.h1>
        <div className="flex gap-1 w-full justify-center mt-4">
          <LoginModal />
          <SignUpModal />
        </div>
      </HeroHighlight>
    </div>
  );
};

export default Hero;
