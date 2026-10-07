import { useEffect, useRef, useState } from "react";

function useTodoCarousel(todos) {
  const carouselRef = useRef(null);
  const previousOrder = useRef("");
  const [position, setPosition] = useState({ id: null, index: 0 });
  const order = todos.map((todo) => todo.id).join(",");
  // ID behåller samma lapp vald när listan ändras. Om den raderas används
  // dess gamla plats, eller den sista platsen om listan har blivit kortare.
  const selectedIndex = todos.findIndex((todo) => todo.id === position.id);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : Math.max(0, Math.min(position.index, todos.length - 1));
  const activeId = todos[activeIndex]?.id ?? null;

  // Uppdatera bara när urvalet ändrats så att räknaren följer den aktuella listan.
  if (position.id !== activeId || position.index !== activeIndex) {
    setPosition({ id: activeId, index: activeIndex });
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    // Justera scrollen när lappar läggs till eller tas bort, utan att störa en pågående swipe.
    if (carousel && previousOrder.current !== order) {
      carousel.scrollTo({ left: carousel.children[activeIndex]?.offsetLeft ?? 0, behavior: "instant" });
    }
    previousOrder.current = order;
  }, [order, activeIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let width = carousel.clientWidth;

    // Behåll den valda lappen i bild när bredden ändras, till exempel vid skärmrotation.
    function alignAfterResize() {
      if (carousel.clientWidth !== width) {
        width = carousel.clientWidth;
        carousel.scrollTo({
          left: carousel.children[activeIndex]?.offsetLeft ?? 0,
          behavior: "instant",
        });
      }
    }
    const observer = new ResizeObserver(alignAfterResize);
    observer.observe(carousel);
    return () => observer.disconnect();
  }, [activeIndex, order]);

  // Lappen närmast vänsterkanten styr räknaren när användaren swipar.
  function updatePosition() {
    // Samma brytpunkt som i CSS: desktop visar ett rutnät utan karusellnavigering.
    if (!window.matchMedia("(width < 48rem)").matches) return;
    const carousel = carouselRef.current;
    let nearest = 0;
    let distance = Infinity;
    Array.from(carousel.children).forEach((slide, index) => {
      const nextDistance = Math.abs(slide.offsetLeft - carousel.scrollLeft);
      if (nextDistance < distance) {
        nearest = index;
        distance = nextDistance;
      }
    });
    setPosition((current) =>
      current.id === todos[nearest]?.id ? current : { id: todos[nearest]?.id ?? null, index: nearest },
    );
  }

  function goTo(index) {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index];
    if (!slide) return;
    carousel.scrollTo({
      left: slide.offsetLeft,
      // Hoppa över scrollanimationen om användaren har valt minskad rörelse.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return { carouselRef, activeIndex, updatePosition, goTo };
}

export default useTodoCarousel;
