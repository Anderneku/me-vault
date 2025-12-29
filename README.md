Here’s a polished, comprehensive README for your **WLAN File Server** built with Next.js, shadcn UI, and SQLite, reflecting all the features you’ve been building:

---

# MeVault – WLAN File Server

A lightweight, local file server that allows devices on the same network to **upload, download, and manage files** in real-time. Built with **Next.js**, **shadcn UI**, and **SQLite**, optimized for **WLAN use**.

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

3. **Create uploads folder**:

```bash
mkdir uploads
```

4. **Create SQLite database**:

```bash
touch lib/database/files.db
# Optionally, run your schema setup if needed
```

5. **Add `.gitignore`** to ignore local database:

```
lib/database/files.db
uploads/
```

---

## Running the App

```bash
npm run dev -- -H 0.0.0.0
```

* `-H 0.0.0.0` makes your server accessible to other devices on the same network
* Access from your phone or other devices: `http://<PC_IP>:3000`

---

## Usage

### Upload a File

* Click **Select Files** → choose a file
* Upload progress is displayed
* File list refreshes automatically via **SSE**

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
│  │  └─ updates/       # SSE API for real-time updates
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

---

## Future Improvements

* Authentication for secure access
* File Dropzone
* Streaming large files for faster downloads
* Streaming/Viewing videos, audios and pictures directly on the app
* Customisation
* Real-time updates (I was lazy and used polling lol)

---

## License

MIT License

---
