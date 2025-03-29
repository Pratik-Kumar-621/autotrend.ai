import { Button, Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";

interface SocialProps {
  handleBack: () => void;
  loading: boolean;
  bodyLoading: boolean;
  selectedImage: any;
  description: string;
}

const PostingOnSocial = (props: SocialProps) => {
  const { handleBack, loading, bodyLoading, selectedImage, description } =
    props;
  return (
    <div className="landing-explore-social">
      <div className="landing-explore-social-heading">
        Boom!!! Your post is generated 🚀
      </div>

      <div className="landing-explore-social-image">
        <Image src={selectedImage} alt="Post Image" width={400} height={400} />
      </div>
      <div className="landing-explore-social-description">
        <strong>Description: </strong>
        {description}
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
        <Tooltip title="Login required" arrow>
          <div>
            <Button
              variant="contained"
              className="landing-explore-social-buttons-next"
              disabled
            >
              Save this Post
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default PostingOnSocial;
