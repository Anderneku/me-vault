---

# MeVault – WLAN File Server

A lightweight, local file server that allows devices on the same network to **upload, download, and manage files** in real-time. Built with **Next.js**, **shadcn UI**, and **SQLite**, optimized for **WLAN use**.
<img width="1450" height="942" alt="image" src="https://github.com/user-attachments/assets/03376590-72d9-49d6-861b-390d3d1a90f8" />


---

## Features

* **Upload files** via a simple form
* **Download files directly in the browser** (desktop and mobile)
* **Delete files** from the server
* **Real-time updates** across all devices using **SSE** or optional polling
* **File type icons** with dynamic display based on MIME type
* **SQLite database** stores metadata like filename, MIME type, and upload date
* Fully responsive UI with **shadcn UI + TailwindCSS**

---

## Tech Stack

* **Frontend**: Next.js (App Router), React, shadcn UI
* **Backend**: Next.js API routes, Node.js, File System (`fs`)
* **Database**: SQLite for metadata storage
  
---

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/mevault.git
cd mevault
```

2. **Install dependencies**:

```bash
npm install
# or
yarn
```

3. **uploads folder (file uploads go here)**:

```bash
/uploads
```

4. **SQLite database (metadata on files)**:

```bash
/lib/database/files.db
```

---

## Running the App

```bash
npm run dev
```

* Be sure to use the host (server) IP (not localhost)
* Access from your phone or other devices: `http://<PC_IP>:3000`

---

## Usage

### Upload a File

* Click **Select Files** → choose a file
* Upload progress is displayed
* File list refreshes automatically

### Download a File

* Click the download icon → file is downloaded **directly in browser**
* Works on desktop and mobile

### Delete a File

* Click the delete icon → file is removed from **both disk and database**
* All connected devices update in real-time

---

## File Type Icons

| File Type       | Icon      | Color  |
| --------------- | --------- | ------ |
| Video           | Video     | Blue   |
| Document        | FileText  | Orange |
| Archive         | HardDrive | Purple |
| Audio           | Music     | Pink   |
| Image           | ImageIcon | Green  |
| Other (default) | File      | Green  |

* Automatically determined from `mime_type`
* Default fallback icon used for unknown types

---

## Real-Time Updates

* Implemented via **Server-Sent Events (SSE)**
* All devices see the **same file list** in real-time when files are uploaded or deleted
* Optional **polling** available if SSE is not desired

---

## Folder Structure

```
mevault/
├─ app/
│  ├─ api/
│  │  ├─ file/          # upload/download API
│  │  ├─ delete/        # delete API
│  └─ file-list/        # UI components
├─ lib/
│  └─ database/         # SQLite DB
├─ uploads/             # uploaded files (ignored in git)
├─ package.json
└─ ...
```

---

## Notes

* Feel free to fork this and turn it into something more useful as this is very much in a 'skeletal' state.
* You could pretty easily implement this app into an already existing local database as a more 'polished front' to access files across all your devices.
* You could possibly implement soemthing like [pm2](https://www.npmjs.com/package/pm2) to have the server start running automatically on startup on your server/pc; I already have plans to add that in the future.

---

## Future Improvements

* Authentication for secure access
* File Dropzone
* Streaming large files for faster downloads
* Streaming/Viewing videos, audios and pictures directly on the app
* Customisation
* Real-time updates (I was lazy and used polling lol)
* [pm2](https://www.npmjs.com/package/pm2) 'sevrer start on startup' implementation

---

## License

MIT License

---
