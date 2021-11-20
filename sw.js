const version = 'v1'
const baseUrl = '/test-sw'
const filenames = ['/index.html', '/style.css', '/app.js'].map(
  (url) => baseUrl + url
)

self.addEventListener('install', function (event) {
  event.waitUntil(addCaches(version, filenames))
})
self.addEventListener('activate', function (event) {
  event.waitUntil(deleteOldCaches(version))
})

self.addEventListener('fetch', function (event) {
  event.respondWith(getFile(event))
})

async function addCaches(version, filenames) {
  const cache = await caches.open(version)
  await cache.addAll(filenames)
}

async function getFile(event) {
  const response = await caches.match(event.request)
  return response || fetch(event.request)
}

async function deleteOldCaches(version) {
  const keyList = await caches.keys()
  const deletePromises = keyList.map(
    (key) => key !== version && caches.delete(key)
  )
  return Promise.all(deletePromises)
}
