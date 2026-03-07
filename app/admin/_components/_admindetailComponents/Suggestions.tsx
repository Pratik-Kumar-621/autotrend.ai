import React, { useState } from "react";
import Table from "./Table";
import Modal from "./Modal";
import {
  Suggestion,
  SuggestionForm,
  SuggestionsProps,
} from "../../adminTypes";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  loading,
  onAdd,
  onEdit,
  onDelete,
  loadingForm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSuggestion, setEditingSuggestion] =
    useState<Suggestion | null>(null);
  const [form, setForm] = useState<SuggestionForm>({
    text: "",
    sequence: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSuggestion) {
        await onEdit(editingSuggestion.id, form);
      } else {
        await onAdd(form);
      }
      setIsModalOpen(false);
      setEditingSuggestion(null);
      setForm({ text: "", sequence: 0 });
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    }
  };

  const handleEdit = (suggestion: Suggestion) => {
    setEditingSuggestion(suggestion);
    setForm({
      text: suggestion.text,
      sequence: suggestion.sequence,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this suggestion?"))
      return;
    await onDelete(id);
  };

  const columns = [
    { header: "Sequence", accessor: "sequence" },
    { header: "Text", accessor: "text" },
    {
      header: "Actions",
      accessor: "id",
      render: (_: unknown, item: Suggestion) => (
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
    <div className="border bg-black border-[#555555] rounded-lg shadow p-6 mb-10">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-xl font-semibold">Suggestions</h2>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEditingSuggestion(null);
            setForm({ text: "", sequence: 0 });
            setIsModalOpen(true);
          }}
          className="!px-4 !capitalize !text-[16px] !rounded-md"
        >
          Add Suggestion
        </Button>
      </div>

      <Table
        columns={columns}
        data={suggestions}
        loading={loading}
        emptyMessage="No suggestions in the list"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSuggestion(null);
          setForm({ text: "", sequence: 0 });
        }}
        title={editingSuggestion ? "Edit Suggestion" : "Add Suggestion"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sequence
            </label>
            <input
              type="number"
              value={form.sequence}
              onChange={(e) =>
                setForm({ ...form, sequence: +e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outlined"
              color="inherit"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingSuggestion(null);
                setForm({ text: "", sequence: 0 });
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
              {editingSuggestion ? (
                <>{loadingForm ? "Updating..." : "Update"}</>
              ) : (
                <>{loadingForm ? "Adding..." : "Add"}</>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Suggestions;

