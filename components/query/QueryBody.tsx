export default function QueryBody({
  description,
}: {
  description: string;
}) {
  return (
    <div className="text-gray-300 leading-relaxed">
      {description}
    </div>
  );
}
