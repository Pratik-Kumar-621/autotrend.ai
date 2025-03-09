"use client";

import React, { useEffect, useState } from "react";
import Features from "./_admindetailComponents/Features";
import Steps from "./_admindetailComponents/Steps";
import { AdminDetailsProps, FeatureInput, Feature, Step } from "../adminTypes";
import { Button } from "@mui/material";

const AdminDetails: React.FC<AdminDetailsProps> = ({ onLogout }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

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
    setLoadingForm(true);
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
        setLoadingForm(false);
        await fetchData();
      } else {
        setLoadingForm(false);
        console.error("Failed to add feature:", await response.text());
      }
    } catch (error) {
      setLoadingForm(false);
      console.error("Error adding feature:", error);
    }
  };
  console.log(features);

  const handleEditFeature = async (id: string, feature: FeatureInput) => {
    setLoadingForm(true);
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
        setLoadingForm(false);
        await fetchData();
      } else {
        setLoadingForm(false);
        console.error("Failed to edit feature:", await response.text());
      }
    } catch (error) {
      setLoadingForm(false);
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
    setLoadingForm(true);
    const response = await fetch("/api/steps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(step),
    });

    if (response.ok) {
      setLoadingForm(false);
      await fetchData();
    }
  };

  const handleEditStep = async (id: string, step: Omit<Step, "id">) => {
    setLoadingForm(true);

    const response = await fetch(`/api/steps`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...step }),
    });

    if (response.ok) {
      setLoadingForm(false);
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
    <div className="admin-content pt-6 mb-10">
      <div className="flex justify-between items-center mb-[50px]">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={onLogout}
          variant="contained"
          color="error"
          className="capitalize px-5 rounded-md text-[16px]"
        >
          Log Out
        </Button>
      </div>

      <Features
        features={features}
        loading={loading}
        onAdd={handleAddFeature}
        onEdit={handleEditFeature}
        onDelete={handleDeleteFeature}
        loadingForm={loadingForm}
      />

      <Steps
        steps={steps}
        loading={loading}
        onAdd={handleAddStep}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
        loadingForm={loadingForm}
      />
    </div>
  );
};

export default AdminDetails;
