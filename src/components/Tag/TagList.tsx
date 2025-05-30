interface Tag {
  name: string;
}

export default function TagList({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags && tags.length ? (
        tags.map((tag) => (
          <span
            key={tag.name}
            className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded"
          >
            {tag.name}
          </span>
        ))
      ) : (
        <span className="text-gray-500">Không có thẻ nào</span>
      )}
    </div>
  );
}