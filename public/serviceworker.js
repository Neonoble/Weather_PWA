const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html']
// offline.html === page shown when theres no internet

const self = this ;

//install a SW   
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
       console.log('Cache Opened')
        return cache.addAll(urlsToCache)
    })
  )
})


//listen for requests
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
    .then(() => {
      return fetch(e.request)
      //if it cant fetch data === no internet connection so show offline version
        .catch(() => caches.match('offline.html'))
    })
  )
})


//activate th SW
self.addEventListener('activate', (event) => {
  const cacheList = [];
  cacheList.push(CACHE_NAME);

  event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
          cacheNames.map((cacheName) => {
              if(!cacheList.includes(cacheName)) {
                  return caches.delete(cacheName);
              }
          })
      ))
          
  )
});