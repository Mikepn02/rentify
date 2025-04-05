import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Property } from "@/@types/types";
import axios from "@/lib/axios.config";
import { m } from "framer-motion";





export default function useProperties() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [creatingProperty, setCreatingProperty] = useState(false);
    const [deletingProperty, setDeletingProperty] = useState(false);
    const [updatingProperty, setUpdatingProperty] = useState(false);

    const { data: properties , isLoading , error , mutate} = useSWR<Property[]>("/properties", async( url: string) => {
        const { data } = await axios.get(url);
        return data
    });


    useEffect(() => {
        mutate()
    },[]);


    const createProperty = async(property: Omit<Property, "id">) => {
        setCreatingProperty(true);
    }
}