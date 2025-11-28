"use client";
import { BreweriesStore } from "@/src/store/zustand";
import css from "./currentFactory.module.css";
import { selectCurrentFactory } from "@/src/store/selectors";
import Link from "next/link";

function currentFactory() {
  const brewery = BreweriesStore(selectCurrentFactory);
  return (
    <div className={css.mainDiv}>
      <Link className={css.link} href={"/"}>
        Home
      </Link>
      <div className={css.factoryDiv}>
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
    </div>
  );
}

export default currentFactory;
