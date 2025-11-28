"use client";
import css from "./page.module.css";
import { BreweriesStore } from "../store/zustand";
import { useEffect, useRef, useState } from "react";
import { getAllBreweriesApi } from "../services/api";
import Factory from "../components/Factory";
import {
  selectBreweries,
  selectBufferBreweries,
  selectSelected,
} from "../store/selectors";

export default function Home() {
  const [count, setCount] = useState(1);

  const [page, setPage] = useState(1);

  const observerRef = useRef(null);
  const firstLoad = useRef(true);

  const bufferBreweries = BreweriesStore(selectBufferBreweries);

  const updateBreweries = BreweriesStore((state) => state.setBreweries);

  const deleteAllFromSelected = BreweriesStore(
    (state) => state.deleteAllFromSelected
  );

  const setBufferBreweries = BreweriesStore(
    (state) => state.setBufferBreweries
  );

  const breweries = BreweriesStore(selectBreweries);

  const selected = BreweriesStore(selectSelected);

  async function getBufferData() {
    const buffer = await getAllBreweriesApi(page + count);
    setBufferBreweries(buffer);
  }

  async function getAllBreweries() {
    const data = await getAllBreweriesApi(page);

    updateBreweries(data);
  }

  useEffect(() => {
    getAllBreweries();
    getBufferData();
  }, [page]);

  function deleteFactory() {
    const filtered = breweries.filter(
      (item) => !selected.some((sel) => sel.id === item.id)
    );

    const missingCount = 15 - filtered.length;
    if (missingCount > 0) {
      const bufferSliced = bufferBreweries.slice(0, missingCount);
      filtered.push(...bufferSliced);
    }

    updateBreweries(filtered);

    setCount(count + 1);
    getBufferData();
    deleteAllFromSelected([]);
  }

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (firstLoad.current) {
          firstLoad.current = false;
          return;
        }

        setPage((prev) => prev + 1);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [breweries]);

  return (
    <div className={css.container}>
      <main>
        <div>
          <h1 className={css.h1}>Breweries page:{page}</h1>
        </div>
        {selected.length > 0 && (
          <button
            className={css.deleteBtn}
            type="button"
            onClick={deleteFactory}
          >
            Delete
          </button>
        )}
        <div className={css.breweriesDiv}>
          {breweries.map((brewery, index) => (
            <Factory key={brewery.id + index} brewery={brewery} />
          ))}
        </div>
      </main>
      <div ref={observerRef} className={css.observer}></div>
    </div>
  );
}
