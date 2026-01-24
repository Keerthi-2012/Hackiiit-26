export default function AttachmentViewer({
  attachments,
}: {
  attachments: { name: string; url: string }[];
}) {
  return (
    <div>
      <h3 className="font-medium mb-2">Attachments</h3>

      <ul className="text-sm text-blue-400 space-y-1">
        {attachments.map((file) => (
          <li key={file.name}>
            <a href={file.url}>{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
