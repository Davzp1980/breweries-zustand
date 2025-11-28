"use client";
import { useState } from "react";
import { BreweriesStore } from "../store/zustand";
import css from "./factory.module.css";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getACurrentBreweriesApi } from "../services/api";
import { selectSelected } from "../store/selectors";
function Factory({ brewery }) {
  const router = useRouter();

  const [toggleIsLiked, setToggleIsLikedToggle] = useState(false);

  const selected = BreweriesStore(selectSelected);

  const deleteFromFactory = BreweriesStore((state) => state.deleteFromSelected);

  const setCurrentFactory = BreweriesStore((state) => state.setCurrentFactory);

  const setSelected = BreweriesStore((state) => state.setSelected);

  function setIsLikedOn(e, brewery) {
    e.preventDefault();
    setToggleIsLikedToggle((prev) => !prev);

    if (toggleIsLiked === true) {
      deleteFromFactory(brewery.id);
      return;
    }

    setSelected(brewery);
  }

  function openFactory() {
    async function getCurrentFactory() {
      const res = await getACurrentBreweriesApi(brewery.id);
      setCurrentFactory(res);
    }

    getCurrentFactory();
    router.push("/currentFactory");
  }
  return (
    <div
      className={clsx(css.factoryDiv, toggleIsLiked && css.liked)}
      onContextMenu={(e) => setIsLikedOn(e, brewery)}
      onClick={openFactory}
    >
      <p>Address: {brewery.address_1}</p>
      <p>Brewery type: {brewery.brewery_type}</p>
      <p>City: {brewery.city}</p>
      <p>Country: {brewery.country}</p>
      <p>Name: {brewery.name}</p>
      <p>Phone: {brewery.phone}</p>
      <p>Postal code: {brewery.postal_code}</p>
      <p>State: {brewery.state}</p>
      <p>State province: {brewery.state_province}</p>
      <p>Street: {brewery.street}</p>
      <p>Website: {brewery.website_url}</p>
    </div>
  );
}

export default Factory;
