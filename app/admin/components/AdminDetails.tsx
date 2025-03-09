"use client";

import React, { useEffect, useState } from "react";
import { Feature, Step } from "./_admindetailComponents/detailTypes";
import Features from "./_admindetailComponents/Features";
import Steps from "./_admindetailComponents/Steps";
import {
  AdminDetailsProps,
  FeatureInput,
} from "./_admindetailComponents/detailTypes";

const AdminDetails: React.FC<AdminDetailsProps> = ({ onLogout }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [featuresRes, stepsRes] = await Promise.all([
        fetch("/api/features"),
        fetch("/api/steps"),
      ]);

      const featuresData: Feature[] = await featuresRes.json();
      const stepsData: Step[] = await stepsRes.json();

      setFeatures(featuresData);
      setSteps(stepsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Feature handlers
  const handleAddFeature = async (feature: FeatureInput) => {
    try {
      // Extract base64 data from the data URL
      console.log("Adding feature", feature);

      const processedFeature = {
        ...feature,
        image: feature.image?.split?.(",")[1] || null,
      };

      const response = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedFeature),
      });

      if (response.ok) {
        await fetchData();
      } else {
        console.error("Failed to add feature:", await response.text());
      }
    } catch (error) {
      console.error("Error adding feature:", error);
    }
  };
  console.log(features);

  const handleEditFeature = async (id: string, feature: FeatureInput) => {
    try {
      console.log("Editing feature", id, feature);

      const processedFeature = {
        ...feature,
        image: feature.image?.startsWith("data:")
          ? feature.image.split(",")[1]
          : feature.image,
      };
      const response = await fetch(`/api/features`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...processedFeature }),
      });
      if (response.ok) {
        await fetchData();
      } else {
        console.error("Failed to edit feature:", await response.text());
      }
    } catch (error) {
      console.error("Error editing feature:", error);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    const response = await fetch(`/api/features`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      await fetchData();
    }
  };

  // Step handlers
  const handleAddStep = async (step: Omit<Step, "id">) => {
    const response = await fetch("/api/steps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(step),
    });

    if (response.ok) {
      await fetchData();
    }
  };

  const handleEditStep = async (id: string, step: Omit<Step, "id">) => {
    const response = await fetch(`/api/steps`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...step }),
    });

    if (response.ok) {
      await fetchData();
    }
  };

  const handleDeleteStep = async (id: string) => {
    const response = await fetch(`/api/steps`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      await fetchData();
    }
  };

  return (
    <div className="admin-content p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <Features
        features={features}
        loading={loading}
        onAdd={handleAddFeature}
        onEdit={handleEditFeature}
        onDelete={handleDeleteFeature}
      />

      <Steps
        steps={steps}
        loading={loading}
        onAdd={handleAddStep}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
      />
    </div>
  );
};

export default AdminDetails;
