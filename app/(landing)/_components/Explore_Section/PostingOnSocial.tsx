import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CachedIcon from "@mui/icons-material/Cached";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "../LoginModal";
interface SocialProps {
  handleBack: () => void;
  handlePostRegeneration: () => void;
  handlePostOnSocial: () => void;
  loading: boolean;
  bodyLoading: boolean;
  selectedImage: any;
  description: string;
}

const PostingOnSocial = (props: SocialProps) => {
  const {
    handleBack,
    loading,
    bodyLoading,
    selectedImage,
    description,
    handlePostRegeneration,
    handlePostOnSocial,
  } = props;
  useEffect(() => {
    setEditedDescription(description);
  }, [description]);
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [open, setOpen] = useState(false);
  const handleLoginClose = () => {
    setOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedDescription(event.target.value);
  };

  const handleDescriptionSave = (e: any) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="landing-explore-social">
      <div className="landing-explore-social-heading">
        Boom!!! Your post is generated 🚀
      </div>

      <div className="landing-explore-social-image">
        <Image src={selectedImage} alt="Post Image" width={400} height={400} />
      </div>
      <div className="landing-explore-social-description">
        <div className="landing-explore-social-description-buttons">
          <strong>Description: </strong>
          <Tooltip title="Regenerate Description">
            <IconButton color="inherit" onClick={handlePostRegeneration}>
              <CachedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Description">
            <IconButton color="inherit" onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="landing-explore-social-description-text">
          {isEditing ? (
            <form
              onSubmit={handleDescriptionSave}
              className="landing-explore-social-description-text-change"
            >
              <textarea
                value={editedDescription}
                onChange={handleDescriptionChange}
                autoFocus
              />
              <Button variant="outlined" type="submit">
                Update Description
              </Button>
            </form>
          ) : (
            editedDescription
          )}
        </div>
      </div>
      <div className="landing-explore-social-buttons">
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={loading || bodyLoading}
          className="landing-explore-social-buttons-back"
        >
          Back
        </Button>
        {user ? (
          <Button
            variant="contained"
            className="landing-explore-social-buttons-next"
            onClick={handlePostOnSocial}
          >
            Save this Post
          </Button>
        ) : (
          <div>
            <Button
              variant="contained"
              className="landing-explore-social-buttons-next"
              onClick={() => setOpen(true)}
            >
              Save this Post
            </Button>
          </div>
        )}
      </div>
      <LoginModal open={open} handleClose={handleLoginClose} />
    </div>
  );
};

export default PostingOnSocial;
