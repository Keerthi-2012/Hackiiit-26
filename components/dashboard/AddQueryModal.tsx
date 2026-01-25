"use client";
import { useState } from "react";

const TAG_OPTIONS = [
  "Machine Learning",
  "Systems",
  "VLSI",
  "Theory",
  "Computer Vision",
  "NLP",
  "Databases",
  "Networks",
  "Security",
  "Distributed Systems",
  "Algorithms",
  "Optimization",
  "Robotics",
  "HCI",
  "Bioinformatics",
];

const TAG_COLORS: Record<string, string> = {
  "Machine Learning": "#4facfe",
  Systems: "#22c55e",
  VLSI: "#a855f7",
  Theory: "#f97316",
  "Computer Vision": "#ef4444",
  NLP: "#06b6d4",
  Databases: "#ff6b35",
  Networks: "#14b8a6",
  Security: "#8b7355",
  "Distributed Systems": "#7c3aed",
  Algorithms: "#6366f1",
  Optimization: "#eab308",
  Robotics: "#ec4899",
  HCI: "#00bcd4",
  Bioinformatics: "#84cc16",
};

const modalStyles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;

  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-content {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(79, 172, 254, 0.2);
    border-radius: 1rem;
    width: 90%;
    max-width: 700px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease-out;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(79, 172, 254, 0.1);
  }

  .modal-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #e0e7ff;
  }

  .modal-close {
    background: none;
    border: none;
    color: #cbd5e1;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0.5rem;
  }

  .modal-close:hover {
    color: #ff6b6b;
    background: rgba(239, 68, 68, 0.15);
    border-radius: 0.5rem;
  }

  .modal-body {
    padding: 1.5rem;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #e0e7ff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .form-label-icon {
    font-size: 1.1rem;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(79, 172, 254, 0.3);
    color: #e0e7ff;
    font-family: inherit;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(79, 172, 254, 0.6);
    box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.15);
  }

  .form-textarea {
    resize: vertical;
    min-height: 150px;
  }

  .input-helper {
    font-size: 0.75rem;
    color: #94a3b8;
    text-align: right;
  }

  .tags-container {
    background: rgba(79, 172, 254, 0.08);
    border: 1px solid rgba(79, 172, 254, 0.15);
    border-radius: 0.5rem;
    padding: 1rem;
    backdrop-filter: blur(10px);
  }

  .tags-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tag-btn {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    border: 1px solid rgba(79, 172, 254, 0.2);
    background: rgba(79, 172, 254, 0.1);
    color: #cbd5e1;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .tag-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 172, 254, 0.2);
  }

  .tag-btn.active {
    font-weight: 600;
    border: 2px solid;
    background-color: currentColor;
    color: #0f172a;
  }

  .selected-tags {
    margin-top: 1rem;
  }

  .selected-tags-label {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 0.75rem;
    display: block;
  }

  .selected-tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.8rem;
    border-radius: 2rem;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.75rem;
  }

  .tag-chip-close {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  .tag-chip-close:hover {
    opacity: 1;
    transform: rotate(90deg);
  }

  .attachments-section {
    border: 2px dashed rgba(79, 172, 254, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    background: rgba(79, 172, 254, 0.05);
  }

  .file-input-wrapper {
    position: relative;
    display: inline-block;
  }

  .file-input {
    display: none;
  }

  .file-btn {
    background: none;
    border: 1px solid rgba(79, 172, 254, 0.3);
    color: #cbd5e1;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .file-btn:hover {
    border-color: rgba(79, 172, 254, 0.6);
    background: rgba(79, 172, 254, 0.1);
  }

  .files-list {
    margin-top: 1rem;
  }

  .files-list-label {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 0.5rem;
    display: block;
  }

  .files-list-items {
    list-style: none;
    padding: 0;
  }

  .files-list-item {
    padding: 0.5rem 0;
    color: #cbd5e1;
    font-size: 0.85rem;
  }

  .files-list-item::before {
    content: "📎 ";
    margin-right: 0.5rem;
  }

  .anonymous-box {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border: 1px solid rgba(168, 85, 247, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    backdrop-filter: blur(10px);
  }

  .anonymous-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  .checkbox-input {
    cursor: pointer;
    width: 20px;
    height: 20px;
    accent-color: #a855f7;
  }

  .anonymous-text {
    flex: 1;
  }

  .anonymous-title {
    font-weight: 600;
    color: #e0e7ff;
    font-size: 0.95rem;
  }

  .alert-box {
    background: rgba(79, 172, 254, 0.1);
    border: 1px solid rgba(79, 172, 254, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    color: #cbd5e1;
    font-size: 0.85rem;
    display: flex;
    gap: 0.75rem;
  }

  .alert-icon {
    flex-shrink: 0;
    color: #00f2fe;
    font-size: 1.2rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid rgba(79, 172, 254, 0.1);
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-cancel {
    background: none;
    border: 1px solid rgba(79, 172, 254, 0.3);
    color: #cbd5e1;
  }

  .btn-cancel:hover {
    border-color: rgba(79, 172, 254, 0.6);
    background: rgba(79, 172, 254, 0.1);
  }

  .btn-submit {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: #0f172a;
    box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  }

  .btn-submit:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
    transform: translateY(-2px);
  }

  .btn-submit:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default function AddQueryModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  }

  // async function handleSubmit() {
  //   if (!title.trim() || !text.trim() || selectedTags.length === 0) return;
  
  //   setIsSubmitting(true);
  
  //   try {
  //     const filesToSend = await Promise.all(
  //       files.map(async (file) => {
  //         const base64 = await fileToBase64(file); // convert to base64
  //         return {
  //           filename: file.name,
  //           fileType: file.type,
  //           url: base64, // put base64 string here
  //         };
  //       })
  //     );
  
  //     const res = await fetch("/api/query", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         title,
  //         description: text,
  //         tags: selectedTags,
  //         isAnonymous: anonymous,
  //         files: filesToSend,
  //       }),
  //     });
  
  //     if (!res.ok) throw new Error("Failed to create query");
  
  //     onClose();
  //     window.location.reload();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to post query");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }
  
  // function fileToBase64(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file); // convert to base64
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (err) => reject(err);
  //   });
  // }
  async function handleSubmit() {
  if (!title.trim() || !text.trim() || selectedTags.length === 0) return;

  setIsSubmitting(true);

  try {
    // Convert files to Base64
    const filesData = await Promise.all(
      files.map(file => {
        return new Promise<{ filename: string; fileType: string; data: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              filename: file.name,
              fileType: file.type || "unknown",
              data: reader.result as string,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file); // Base64
        });
      })
    );

    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: text,
        tags: selectedTags,
        isAnonymous: anonymous,
        files: filesData,
      }),
    });

    if (!res.ok) throw new Error("Failed to create query");

    onClose();
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Failed to post query");
  } finally {
    setIsSubmitting(false);
  }
}


  const isFormValid =
    title.trim().length > 0 &&
    text.trim().length > 0 &&
    selectedTags.length > 0;

  return (
    <>
      <style>{modalStyles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title">Create New Query</div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Query Title */}
            <div className="form-group">
              <label className="form-label">
                Query Title
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Short, clear title"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 80))}
              />
              <div className="input-helper">{title.length}/80</div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Describe Your Research Query
              </label>
              <textarea
                className="form-textarea"
                placeholder="Be specific and detailed. The more information you provide, the better answers you'll get..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Tags Section */}
            <div className="form-group">
              <label className="form-label">
                Select Tags ({selectedTags.length})
              </label>
              <div className="tags-container">
                <div className="tags-grid">
                  {TAG_OPTIONS.map((tag) => (
                    <button
                      key={tag}
                      className={`tag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
                      onClick={() => toggleTag(tag)}
                      style={
                        selectedTags.includes(tag)
                          ? { borderColor: TAG_COLORS[tag], backgroundColor: TAG_COLORS[tag] }
                          : {}
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="selected-tags">
                  <label className="selected-tags-label">Selected tags:</label>
                  <div className="selected-tags-list">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag}
                        className="tag-chip"
                        style={{ backgroundColor: TAG_COLORS[tag] }}
                      >
                        {tag}
                        <span
                          className="tag-chip-close"
                          onClick={() => toggleTag(tag)}
                        >
                          ✕
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Attachments */}
            <div className="form-group">
              <label className="form-label">
                Attachments (Optional)
              </label>
              <div className="attachments-section">
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    multiple
                    className="file-input"
                    id="file-input"
                    onChange={handleFileChange}
                  />
                  <button
                    className="file-btn"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    Attach Files
                  </button>
                </div>

                {files.length > 0 && (
                  <div className="files-list">
                    <label className="files-list-label">Selected files:</label>
                    <ul className="files-list-items">
                      {files.map((file, i) => (
                        <li key={i} className="files-list-item">{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Anonymous Checkbox */}
            <div className="anonymous-box">
              <label className="anonymous-checkbox">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                <div className="anonymous-text">
                  <div className="anonymous-title">Post Anonymously</div>
                  <div>
                    Your query will be visible to the community. Please ensure you
                    provide enough context for others to understand your question.
                  </div>
                </div>
              </label>
            </div>           
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-submit"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Query"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}