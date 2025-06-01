interface Tag {
  name: string;
}

export default function TagList({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-3 pl-0 pr-4 py-4 bg-transparent rounded-lg">
      {tags.length ? (
        tags.map((tag) => (
          <span
            key={tag.name}
            className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
          >
            #{tag.name}
          </span>
        ))
      ) : (
        <span className="text-gray-500 italic">Không có thẻ nào</span>
      )}
    </div>
  );
}



