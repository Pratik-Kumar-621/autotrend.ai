"use client";
import LandingExplore from "@/app/(landing)/_components/Explore_Section/LandingExplore";
import { useAuth } from "@/lib/auth-context";
import { Button, Dialog, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardContent = (props: any) => {
  const { suggestion, posts, setIsPosted, setLoading } = props;

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<any>(null);
  console.log(open);
  const { token } = useAuth();

  const handleAfterPost = async () => {
    toast.success("Post saved successfully");
    setLoading(true);
    setIsPosted(new Date());
    setOpen(false);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    try {
      setLoading(true);
      const response = await axios.delete("api/savePost", {
        data: {
          id: postToDelete,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      if (data.type === "Error") {
        throw new Error("Error deleting post");
      }
      setIsPosted(new Date());
      toast.success("Post deleted successfully");
    } catch (error: any) {
      toast.error("Error deleting post");
      setLoading(false);
      return error.message;
    } finally {
      setConfirmOpen(false);
      setPostToDelete(null);
    }
  };
  console.log(token);

  const handleEditPost = async (updatedDescription: string) => {
    if (!postToEdit) return;
    try {
      setLoading(true);
      const response = await axios.put(
        "api/savePost",
        {
          id: postToEdit.id,
          description: updatedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      if (data.type === "Error") {
        throw new Error("Error editing post");
      }
      toast.success("Post updated successfully");
      setIsPosted(new Date());
    } catch (error: any) {
      toast.error("Error editing post");
      setLoading(false);
      return error.message;
    } finally {
      setEditOpen(false);
      setPostToEdit(null);
    }
  };

  const openConfirmDialog = (postId: string) => {
    setPostToDelete(postId);
    setConfirmOpen(true);
  };

  const openEditDialog = (post: any) => {
    setPostToEdit(post);
    setEditOpen(true);
  };

  return (
    <div className="dashboard-content">
      {posts?.length === 0 ? (
        <div className="dashboard-content-empty">
          <div className="dashboard-content-empty-image">
            <Image
              src="/images/no-data.svg"
              alt="empty"
              width={300}
              height={300}
            />
          </div>
          <div className="dashboard-content-empty-text">
            You haven{"'"}t saved any post yet, start exploring and save the
            ones you like!
          </div>
          <Button
            variant="text"
            color="success"
            className="dashboard-content-empty-button"
            onClick={() => setOpen(true)}
          >
            Add new post
            <ArrowRightAltIcon
              sx={{ fontSize: "24px", marginLeft: "7px", marginTop: "1px" }}
            />
          </Button>
        </div>
      ) : (
        <div className="dashboard-content-list">
          <div className="dashboard-content-list-heading">
            <div className="dashboard-content-list-heading-text">
              Saved Posts
            </div>
            <Button
              variant="outlined"
              className="dashboard-content-list-heading-button"
              onClick={() => setOpen(true)}
            >
              <AddIcon sx={{ fontSize: "20px", marginRight: "7px" }} />
              New Post
            </Button>
          </div>
          <div className="dashboard-content-list-items">
            {posts?.map((item: any) => {
              return (
                <div
                  className="dashboard-content-list-items-item"
                  key={item.id}
                >
                  <div className="dashboard-content-list-items-item-keyword">
                    # {item.keyword}
                  </div>
                  <Image
                    className="dashboard-content-list-items-item-image"
                    src={item.image}
                    alt={item.keyword}
                    width={300}
                    height={300}
                  />

                  <div className="dashboard-content-list-items-item-description">
                    <strong>Description: </strong>
                    {item.description}
                  </div>
                  <div className="dashboard-content-list-items-item-actions">
                    <IconButton
                      onClick={() => openEditDialog(item)}
                      color="primary"
                    >
                      <EditIcon sx={{ fontSize: "18px" }} />
                    </IconButton>{" "}
                    <IconButton
                      onClick={() => openConfirmDialog(item.id)}
                      color="error"
                    >
                      <DeleteIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: {
            backgroundColor: "#131313",
            border: "2px solid #2b2b2b",
            boxShadow: "none",
            borderRadius: "20px",
            // height: "70vh",
          },
        }}
      >
        <div className="close-dialog absolute text-white top-2 right-2">
          <IconButton onClick={() => setOpen(false)} style={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </div>
        <LandingExplore {...{ suggestion, handleAfterPost, token }} />
      </Dialog>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "#131313",
            border: "2px solid #2b2b2b",
            boxShadow: "none",
            borderRadius: "11px",
          },
        }}
      >
        <div className="delete-dialog">
          <h3 className="delete-dialog-heading">
            Are you sure you want to delete this post?
          </h3>
          <div className="delete-dialog-actions">
            <Button
              variant="outlined"
              className="delete-dialog-actions-cancel"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="delete-dialog-actions-delete"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "#1e1e1e",
            border: "2px solid #2b2b2b",

            borderRadius: "12px",
          },
        }}
      >
        <div className="edit-dialog">
          <h3 className="edit-dialog-heading">Edit Description</h3>
          <div className="edit-dialog-content">
            <textarea
              className="w-full p-3 mb-2 text-[15px] min-h-[90px] text-white bg-[#4f4e4e] border border-[#7d7d7d] rounded-md focus:outline-none focus:border-[#b3b3b3] focus:ring-0"
              placeholder="Enter new description..."
              defaultValue={postToEdit?.description}
              onChange={(e) =>
                setPostToEdit({ ...postToEdit, description: e.target.value })
              }
            />
          </div>
          <div className="edit-dialog-actions flex justify-end gap-3 mt-4">
            <Button
              variant="outlined"
              className="edit-dialog-actions-cancel"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="edit-dialog-actions-save"
              onClick={() => handleEditPost(postToEdit?.description)}
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DashboardContent;
