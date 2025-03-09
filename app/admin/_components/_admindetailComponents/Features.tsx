import React, { useState, useRef } from "react";
import Table from "./Table";
import Modal from "./Modal";
import Image from "next/image";
import { Feature, FeatureForm, FeaturesProps } from "../../adminTypes";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Features: React.FC<FeaturesProps> = ({
  features,
  loading,
  onAdd,
  onEdit,
  onDelete,
  loadingForm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [form, setForm] = useState<FeatureForm>({
    title: "",
    description: "",
    image: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFeature) {
        await onEdit(editingFeature.id, form);
      } else {
        await onAdd(form);
      }
      setIsModalOpen(false);
      setEditingFeature(null);
      setForm({ title: "", description: "", image: null });
    } catch (error) {
      console.error("Error submitting feature:", error);
    }
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature);
    setForm({
      title: feature.title,
      description: feature.description,
      image: feature.image ? `data:image/jpeg;base64,${feature.image}` : null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this feature?"))
      return;
    await onDelete(id);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setForm({ ...form, image: base64String });
      };
      reader.onerror = () => {
        console.error("Error reading file");
        alert("Error reading file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setForm({ ...form, image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    {
      header: "Image",
      accessor: "image",
      render: (value: string | null) =>
        value ? (
          <div className="relative w-16 h-16">
            <Image
              src={`data:image/jpeg;base64,${value}`}
              width={64}
              height={64}
              alt="Feature"
              className="absolute inset-0 w-full h-full bg-white object-cover rounded"
            />
          </div>
        ) : (
          <span className="text-gray-400">No image</span>
        ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_: unknown, item: Feature) => (
        <>
          <IconButton onClick={() => handleEdit(item)} color="primary">
            <EditIcon className="text-[20px]" />
          </IconButton>
          &nbsp;
          <IconButton onClick={() => handleDelete(item.id)} color="error">
            <DeleteIcon className="text-[20px]" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="border border-[#555555] rounded-lg shadow p-6 mb-10">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-xl font-semibold">Features</h2>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEditingFeature(null);
            setForm({ title: "", description: "", image: null });
            setIsModalOpen(true);
          }}
          className="!px-4 !capitalize !text-[16px] !rounded-md "
        >
          Add Feature
        </Button>
      </div>

      <Table
        columns={columns}
        data={features}
        loading={loading}
        emptyMessage="No features in the list"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFeature(null);
          setForm({ title: "", description: "", image: null });
        }}
        title={editingFeature ? "Edit Feature" : "Add Feature"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {form.image && (
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveImage}
                  className="!px-7 !capitalize !text-[16px] !rounded-md "
                >
                  Remove
                </Button>
              )}
            </div>
            {form.image && (
              <div className="mt-2 relative w-32 h-32">
                <Image
                  src={form.image}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="absolute inset-0 w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outlined"
              color="inherit"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingFeature(null);
                setForm({ title: "", description: "", image: null });
              }}
              className="!px-4 !capitalize !text-[16px] !rounded-md !w-[100px]"
            >
              Cancel
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={loadingForm}
              className="!px-4 !capitalize !text-[16px] !rounded-md !w-[100px]"
            >
              {editingFeature ? (
                <>{loadingForm ? "Updating..." : "Update"} </>
              ) : (
                <>{loadingForm ? "Adding..." : "Add"} </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Features;
