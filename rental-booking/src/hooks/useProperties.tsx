/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Property } from "@/@types/types";
import axios from "@/lib/axios.config";
import { notifications } from "@mantine/notifications";
import useAuth from "./useAuth";

export default function useProperties() {
  const navigate = useNavigate();
  const { user } = useAuth()

  const [creatingProperty, setCreatingProperty] = useState(false);
  const [deletingProperty, setDeletingProperty] = useState(false);
  const [updatingProperty, setUpdatingProperty] = useState(false);

  const propertyKey =
  !user || user.role !== "HOST"
    ? "/properties"
    : `/properties/host/${user.id}`;

  const {
    data: properties,
    isLoading,
    error,
    mutate,
  } = useSWR<Property[]>(propertyKey, async (url: string) => {
    const { data } = await axios.get(url);
    return data.properties;
  });

  useEffect(() => {
    mutate();
  }, []);

  const getPropertyById = (id: string) => {
    const property = properties?.find((property) => property.id === id);
    if (!property) {
      toast.error("Property not found");
      navigate("/dashboard/properties");
    }
    return property;
  };

  const createProperty = async (property: Omit<Property, "id">) => {
    setCreatingProperty(true);

    try {
      const formData = new FormData();

      for (const key in property) {
        if (key === "images" && Array.isArray(property.images)) {
          property.images.forEach((image) => {
            formData.append("images", image);
          });
        } else if (key === "amenities" && Array.isArray(property.amenities)) {
          property.amenities.forEach((amenity) => {
            formData.append("amenities", amenity);
          });
        } else {
          formData.append(key, (property as any)[key]);
        }
      }

      console.log("Property: ", property);
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const { data } = await axios.post("/properties/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        notifications.show({
          title: "Success",
          message: "Property created successfully",
          color: "green",
        });
        mutate([...(properties || []), data.property]);
        navigate("/dashboard/properties");
      } else {
        toast.error("An error occurred");
      }
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message ?? "An error occured",
        color: "red",
      });
    } finally {
      setCreatingProperty(false);
    }
  };

  const updateProperty = async (
    id: string,
    updatedData: Partial<Omit<Property, "id">>
  ) => {
    console.log("Here is updated data: ", updatedData);

    setUpdatingProperty(true);
    try {
      const formData = new FormData();
      for (const key in updatedData) {
        if (key === "images" && Array.isArray(updatedData.images)) {
          updatedData.images.forEach((image: File | string) => {
            if (image instanceof File) {
              formData.append("images", image);
            } else {
              formData.append("existingImages", image);
            }
          });
        } else {
          formData.append(key, (updatedData as any)[key]);
        }
      }
      const { data } = await axios.patch(`/properties/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Property updated successfully");
        mutate(
          (prev) => prev?.map((p) => (p.id === id ? data.property : p)) || [],
          false
        );
        navigate("/dashboard/properties");
      } else {
        toast.error("An error occurred while updating the property");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setUpdatingProperty(false);
    }
  };

  const deleteProperty = async (id: string) => {
    setDeletingProperty(true);

    try {
      const { data } = await axios.delete(`/properties/${id}`);
      if (data.success) {
        mutate((prev) => prev?.filter((p) => p.id !== id) || [], false); 
        notifications.show({
          title: "Success",
          message: "Property deleted successfully",
          color: "green",
        });
        navigate("/dashboard/properties");
        
      }else {
        throw new Error(data.message || "Deletion failed");
      }
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message ?? "An error occured",
        color: "red",
      });
    } finally {
      setDeletingProperty(false);
    }
  };

  return {
    properties,
    isLoading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    creatingProperty,
    deletingProperty,
    updatingProperty,
    setUpdatingProperty,
    setDeletingProperty,
    setCreatingProperty,
  };
}
