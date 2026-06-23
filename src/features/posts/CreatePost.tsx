import { useState } from "react";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Create Post</h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <textarea
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Post
        </button>
      </div>
    </div>
  );
}

export default CreateForm;