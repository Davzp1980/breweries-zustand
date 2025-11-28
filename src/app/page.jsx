"use client";
import css from "./page.module.css";
import { BreweriesStore } from "../store/zustand";
import { useEffect, useRef, useState } from "react";
import { getAllBreweriesApi } from "../services/api";
import Factory from "../components/Factory";
import { selectBreweries, selectFavorite } from "../store/selectors";

export default function Home() {
  const [selected, setSelected] = useState([]);

  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);

  const observerRef = useRef(null);
  const firstLoad = useRef(true);

  const updateBreweries = BreweriesStore((state) => state.setBreweries);

  const deleteAllFromFavorite = BreweriesStore(
    (state) => state.deleteAllFromFavorite
  );

  const breweries = BreweriesStore(selectBreweries);

  const favorite = BreweriesStore(selectFavorite);

  const filtered = breweries.filter(
    (item) => !selected.some((del) => del.id === item.id)
  );

  useEffect(() => {
    async function getAllBreweries() {
      const data = await getAllBreweriesApi(perPage, page);

      updateBreweries(data);
    }

    getAllBreweries();
  }, [updateBreweries, page, perPage]);

  function deleteFactory() {
    setSelected(favorite);
    setPerPage((prev) => prev + favorite.length);
    deleteAllFromFavorite();
  }

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (firstLoad.current) {
          firstLoad.current = false;
          return; // пропустить первый запуск
        }
        loadMore();
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
        <h1 className={css.h1}>Breweries page:{page}</h1>
        {favorite.length > 0 && (
          <button
            className={css.deleteBtn}
            type="button"
            onClick={deleteFactory}
          >
            Delete
          </button>
        )}
        <div className={css.breweriesDiv}>
          {filtered.map((brewery) => (
            <Factory key={brewery.id} brewery={brewery} />
          ))}
        </div>
      </main>
      <div ref={observerRef} className={css.observer}></div>
    </div>
  );
}
