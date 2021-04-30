const DB_NAME = 'sample-chrome-db'
const DB_VERSION = 1
const STORES = {
    BLOBS: 'blobs'
}

export const db = {
    instance: null,
    init: () => {
        return new Promise(
            (resolve, reject) => {
                var req = window.indexedDB.open(DB_NAME, DB_VERSION)

                req.onsuccess = function (e) {
                    console.log('db.init.success')
                    db.instance = this.result
                    resolve(this.result)
                }

                req.onerror = function (e) {
                    console.error('db.init.error', e.target.errorCode)
                    reject(e)
                }

                req.onupgradeneeded = function (e) {
                    console.log('db.init.onupgradeneeded')

                    var blobsStore = e.currentTarget.result.createObjectStore(
                        STORES.BLOBS,
                        {
                            keyPath: 'id',
                            autoIncrement: true
                        }
                    )
                    blobsStore.createIndex('blob', 'blob', { unique: false })
                }
            }
        )
    },
    transaction: (store, mode) => {
        return db.instance.transaction(store, mode).objectStore(store)
    },
    createBlob: (blob) => {
        return new Promise(
            (resolve, reject) => {
                let blobStore = db.transaction(STORES.BLOBS, 'readwrite')
                let request = blobStore.add({ blob })
                request.onsuccess = function (e) {
                    console.log('db.createBlob.success')
                    resolve(e.target.result)
                }
            }
        )
    },
    getBlobs: () => {
        return new Promise(
            (resolve, reject) => {
                let blobStore = db.transaction(STORES.BLOBS, 'readwrite')
                let request = blobStore.getAll()

                request.onsuccess = function (e) {
                    console.log('db.getBlobs.success')
                    resolve(e.target.result)
                }
            }
        )
    },
    clearBlobs: () => {
        return new Promise(
            (resolve, reject) => {
                let blobStore = db.transaction(STORES.BLOBS, 'readwrite')
                let request = blobStore.clear()

                request.onsuccess = function (e) {
                    console.log('db.clearBlobs.success')
                    resolve(e.target.result)
                }
            }
        )
    }
}