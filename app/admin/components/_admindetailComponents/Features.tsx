import React, { useState, useRef } from "react";
import Table from "./Table";
import Modal from "./Modal";
import Image from "next/image";
import { Feature, FeatureForm, FeaturesProps } from "./detailTypes";

const Features: React.FC<FeaturesProps> = ({
  features,
  loading,
  onAdd,
  onEdit,
  onDelete,
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
              className="absolute inset-0 w-full h-full object-cover rounded"
            />
          </div>
        ) : (
          <span className="text-gray-400">No image</span>
        ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_: unknown, item: Feature) => (
        <>
          <button
            onClick={() => handleEdit(item)}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <button
          onClick={() => {
            setEditingFeature(null);
            setForm({ title: "", description: "", image: null });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Feature
        </button>
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
            <label className="block text-sm font-medium text-gray-700">
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
            <label className="block text-sm font-medium text-gray-700">
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
            <label className="block text-sm font-medium text-gray-700">
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
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
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
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingFeature(null);
                setForm({ title: "", description: "", image: null });
              }}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingFeature ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Features;
