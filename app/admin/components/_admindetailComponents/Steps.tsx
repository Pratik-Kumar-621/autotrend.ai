import React, { useState } from "react";
import Table from "./Table";
import Modal from "./Modal";
import { Step, StepForm, StepsProps } from "./detailTypes";

const Steps: React.FC<StepsProps> = ({
  steps,
  loading,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [form, setForm] = useState<StepForm>({
    step: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStep) {
        await onEdit(editingStep.id, form);
      } else {
        await onAdd(form);
      }
      setIsModalOpen(false);
      setEditingStep(null);
      setForm({ step: "" });
    } catch (error) {
      console.error("Error submitting step:", error);
    }
  };

  const handleEdit = (step: Step) => {
    setEditingStep(step);
    setForm({ step: step.step });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this step?")) return;
    await onDelete(id);
  };

  const columns = [
    { header: "Step", accessor: "step" },
    {
      header: "Actions",
      accessor: "id",
      render: (_: unknown, item: Step) => (
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
        <h2 className="text-xl font-semibold">Steps</h2>
        <button
          onClick={() => {
            setEditingStep(null);
            setForm({ step: "" });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Step
        </button>
      </div>

      <Table
        columns={columns}
        data={steps}
        loading={loading}
        emptyMessage="No steps in the list"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStep(null);
          setForm({ step: "" });
        }}
        title={editingStep ? "Edit Step" : "Add Step"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Step
            </label>
            <textarea
              value={form.step}
              onChange={(e) => setForm({ step: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingStep(null);
                setForm({ step: "" });
              }}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingStep ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Steps;
