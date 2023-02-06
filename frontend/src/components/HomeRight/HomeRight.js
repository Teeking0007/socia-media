import { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./HomeRight.css";
import { FaHome } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import Trending from "../Trending/Trending";
import PostCard from '../PostCard/PostCard';
import { Link } from "react-router-dom";

const HomeRight = () => {

  const theme = useMantineTheme();

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="home-right">
      <div className="right-icons">
        <Link to = '../home' ><FaHome style={{ cursor: "pointer", color: "var(--orange)" }} /></Link>
        <FiSettings style={{ cursor: "pointer" }} />
        <RiNotification2Line style={{ cursor: "pointer" }} />
        <MdOutlineMessage style={{ cursor: "pointer" }} />
      </div>
      <Trending />
      <button className="button" onClick={() => setModalOpen(true)}>Share</button>
      <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size={700}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Your Info"
      >
        <PostCard/>
      </Modal>
    </div>
  );
};

export default HomeRight;
