import { useEffect, useRef, useState } from "react";

// Lappen närmast karusellens vänsterkant räknas som den aktiva.
function findNearestSlideIndex(carousel) {
  let nearestIndex = 0;
  let shortestDistance = Infinity;

  Array.from(carousel.children).forEach((slide, index) => {
    const distanceFromLeft = Math.abs(slide.offsetLeft - carousel.scrollLeft);
    if (distanceFromLeft < shortestDistance) {
      nearestIndex = index;
      shortestDistance = distanceFromLeft;
    }
  });

  return nearestIndex;
}

function useTodoCarousel(todos) {
  const carouselRef = useRef(null);
  const previousTodoOrderRef = useRef("");
  // ID följer samma lapp när listan ändras. Index används om den lappen raderas.
  const [activePosition, setActivePosition] = useState({ id: null, index: 0 });
  const todoOrderKey = todos.map((todo) => todo.id).join(",");
  const selectedIndex = todos.findIndex((todo) => todo.id === activePosition.id);
  const lastIndex = Math.max(0, todos.length - 1);
  const fallbackIndex = Math.max(0, Math.min(activePosition.index, lastIndex));

  // Behåll samma lapp om den finns kvar, annars välj närmaste giltiga plats.
  const activeIndex = selectedIndex >= 0 ? selectedIndex : fallbackIndex;
  const activeId = todos[activeIndex]?.id ?? null;

  // Synka urvalet med listan. Villkoret hindrar en ny uppdatering när de redan stämmer.
  if (activePosition.id !== activeId || activePosition.index !== activeIndex) {
    setActivePosition({ id: activeId, index: activeIndex });
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    // Justera scrollen när lappar läggs till eller tas bort, inte under vanlig bläddring.
    if (carousel && previousTodoOrderRef.current !== todoOrderKey) {
      carousel.scrollTo({
        left: carousel.children[activeIndex]?.offsetLeft ?? 0,
        behavior: "instant",
      });
    }
    previousTodoOrderRef.current = todoOrderKey;
  }, [todoOrderKey, activeIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let previousWidth = carousel.clientWidth;

    function alignAfterResize() {
      if (carousel.clientWidth !== previousWidth) {
        previousWidth = carousel.clientWidth;
        carousel.scrollTo({
          left: carousel.children[activeIndex]?.offsetLeft ?? 0,
          behavior: "instant",
        });
      }
    }

    // Behåll den valda lappen i bild när karusellens bredd ändras.
    const observer = new ResizeObserver(alignAfterResize);
    observer.observe(carousel);
    return () => observer.disconnect();
  }, [activeIndex, todoOrderKey]);

  function handleScroll() {
    // Samma brytpunkt som md i layouten: desktop använder ett rutnät.
    if (!window.matchMedia("(width < 48rem)").matches) return;
    const carousel = carouselRef.current;
    const nearestIndex = findNearestSlideIndex(carousel);
    const nearestTodoId = todos[nearestIndex]?.id ?? null;

    setActivePosition((currentPosition) =>
      currentPosition.id === nearestTodoId
        ? currentPosition
        : { id: nearestTodoId, index: nearestIndex },
    );
  }

  function scrollToTodo(index) {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index];
    if (!slide) return;

    // Respektera användarens inställning för minskad rörelse.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    carousel.scrollTo({
      left: slide.offsetLeft,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }

  return { carouselRef, activeIndex, handleScroll, scrollToTodo };
}

export default useTodoCarousel;
