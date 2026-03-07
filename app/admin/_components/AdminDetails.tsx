"use client";

import React, { useEffect, useState } from "react";
import Features from "./_admindetailComponents/Features";
import Steps from "./_admindetailComponents/Steps";
import Suggestions from "./_admindetailComponents/Suggestions";
import {
  AdminDetailsProps,
  FeatureInput,
  Feature,
  Step,
  Suggestion,
  SuggestionForm,
} from "../adminTypes";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDetails: React.FC<AdminDetailsProps> = ({ onLogout }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loadingFeature, setLoadingFeature] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    fetchFeaturesData();
    fetchStepsData();
    fetchSuggestionsData();
  }, []);

  const fetchFeaturesData = async () => {
    setLoadingFeature(true);
    try {
      const featuresResponse = await axios.get("/api/features");
      if (featuresResponse.data.type === "Error") {
        throw new Error(featuresResponse.data.message);
      }
      setFeatures(featuresResponse.data.data);
    } catch (error: any) {
      toast.error(`Failed to fetch features data.`);
      return error;
    } finally {
      setLoadingFeature(false);
    }
  };
  const fetchStepsData = async () => {
    try {
      const stepsResponse = await axios.get("/api/steps");
      if (stepsResponse.data.type === "Error") {
        throw new Error(stepsResponse.data.message);
      }
      setSteps(stepsResponse.data.data);
    } catch (error: any) {
      toast.error(`Failed to fetch steps data.`);
      return error;
    } finally {
      setLoadingSteps(false);
    }
  };

  const fetchSuggestionsData = async () => {
    setLoadingSuggestions(true);
    try {
      const suggestionsResponse = await axios.get("/api/suggestions");
      if (suggestionsResponse.data.type === "Error") {
        throw new Error(suggestionsResponse.data.error);
      }
      setSuggestions(suggestionsResponse.data.data);
    } catch (error: any) {
      toast.error(`Failed to fetch suggestions data.`);
      return error;
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleAddFeature = async (feature: FeatureInput) => {
    setLoadingForm(true);
    try {
      const processedFeature = {
        ...feature,
        image: feature.image?.split?.(",")[1] || null,
      };

      const response = await axios.post("/api/features", processedFeature);
      const responseData = await response.data;

      if (responseData.type === "Success") {
        await fetchFeaturesData();
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast.error(`Failed to add new feature`);
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };
  const handleEditFeature = async (id: string, feature: FeatureInput) => {
    setLoadingForm(true);
    try {
      const processedFeature = {
        ...feature,
        image: feature.image?.startsWith("data:")
          ? feature.image.split(",")[1]
          : feature.image,
      };
      const response = await axios.put("/api/features", {
        id,
        ...processedFeature,
      });
      if (response.data.type === "Success") {
        await fetchFeaturesData();
      } else throw new Error(response.data.message);
    } catch (error: any) {
      toast.error("Error editing feature");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    setLoadingForm(true);
    try {
      const response = await axios.delete("/api/features", {
        data: { id: id },
      });
      if (response.data.type === "Success") {
        await fetchFeaturesData();
      } else throw new Error(response.data.message);
    } catch (error: any) {
      toast.error("Error deleting feature");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  // Step handlers
  const handleAddStep = async (step: Omit<Step, "id">) => {
    setLoadingForm(true);
    try {
      const response = await axios.post("/api/steps", step);
      if (response.data.type === "Success") {
        await fetchStepsData();
      } else throw new Error();
    } catch (error: any) {
      toast.error("Error adding step");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleEditStep = async (id: string, step: Omit<Step, "id">) => {
    setLoadingForm(true);
    try {
      const response = await axios.put("/api/steps", { id, ...step });
      if (response.data.type === "Success") {
        await fetchStepsData();
      } else throw new Error();
    } catch (error: any) {
      toast.error("Error updating step");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDeleteStep = async (id: string) => {
    try {
      const response = await axios.delete("/api/steps", { data: { id } });
      if (response.data.type === "Success") {
        await fetchStepsData();
      } else throw new Error();
    } catch (error: any) {
      toast.error("Error deleting step");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleAddSuggestion = async (suggestion: SuggestionForm) => {
    setLoadingForm(true);
    try {
      const response = await axios.post("/api/suggestions", suggestion);
      if (response.data.type === "Success") {
        await fetchSuggestionsData();
      } else throw new Error();
    } catch (error: any) {
      toast.error("Error adding suggestion");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleEditSuggestion = async (
    id: string,
    suggestion: SuggestionForm
  ) => {
    setLoadingForm(true);
    try {
      const response = await axios.put("/api/suggestions", { id, ...suggestion });
      if (response.data.type === "Success") {
        await fetchSuggestionsData();
      } else throw new Error();
    } catch (error: any) {
      toast.error("Error updating suggestion");
      return error.message;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDeleteSuggestion = async (id: string) => {
    setLoadingForm(true);
    try {
      const response = await axios.delete("/api/suggestions", { data: { id } });
      if (response.data.type === "Success") {
        await fetchSuggestionsData();
      } else throw new Error();
    } catch (error: any) {
      toast.error("Error deleting suggestion");
      return error.message;
    } finally {
      setLoadingForm(false);
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
          className="!capitalize !px-5 !rounded-md !text-[16px]"
        >
          Admin Logout
        </Button>
      </div>

      <Features
        features={features}
        loading={loadingFeature}
        onAdd={handleAddFeature}
        onEdit={handleEditFeature}
        onDelete={handleDeleteFeature}
        loadingForm={loadingForm}
      />

      <Steps
        steps={steps}
        loading={loadingSteps}
        onAdd={handleAddStep}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
        loadingForm={loadingForm}
      />

      <Suggestions
        suggestions={suggestions}
        loading={loadingSuggestions}
        onAdd={handleAddSuggestion}
        onEdit={handleEditSuggestion}
        onDelete={handleDeleteSuggestion}
        loadingForm={loadingForm}
      />
    </div>
  );
};

export default AdminDetails;
