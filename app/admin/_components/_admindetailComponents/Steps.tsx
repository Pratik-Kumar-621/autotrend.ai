import React, { useState } from "react";
import Table from "./Table";
import Modal from "./Modal";
import { Step, StepForm, StepsProps } from "../../adminTypes";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Steps: React.FC<StepsProps> = ({
  steps,
  loading,
  onAdd,
  onEdit,
  onDelete,
  loadingForm,
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
        <h2 className="text-xl font-semibold">Steps</h2>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEditingStep(null);
            setForm({ step: "" });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 capitalize text-[16px] rounded-md"
        >
          Add Step
        </Button>
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
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <Button
              variant="outlined"
              color="inherit"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingStep(null);
                setForm({ step: "" });
              }}
              className="px-4 py-2 border capitalize text-[16px] rounded-md w-[100px]"
            >
              Cancel
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={loadingForm}
              className="px-4 py-2 capitalize text-[16px] rounded-md w-[100px]"
            >
              {editingStep ? (
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

export default Steps;
