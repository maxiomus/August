const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};
  
self.addEventListener("install", (event) => {
event.waitUntil(
    addResourcesToCache([
    "/",
    "/august/index.html",
    "/august/classic/resources/August-all_1.css",
    "/august/classic/resources/August-all_2.css",
    "/august/app.js",
    //"/image-list.js",
    //"/star-wars-logo.jpg",
    //"/gallery/bountyHunters.jpg",
    //"/gallery/myLittleVader.jpg",
    //"/gallery/snowTroopers.jpg",
    ])
);
});