const projectImages = [
  "./assets/mock-ups/andaluciabirdland-laptop.jpg",
  "./assets/mock-ups/livedocs-laptop.jpg",
  "./assets/mock-ups/mello-laptop.jpg",
  "./assets/mock-ups/yariga-laptop.jpg",
  "./assets/mock-ups/flowerheads-laptop.jpg",
  "./assets/mock-ups/krypt-laptop.jpg",
];

projectImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});
