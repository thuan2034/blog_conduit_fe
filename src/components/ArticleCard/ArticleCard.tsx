export default function BlogCard({ blog }: { blog: any }) {
    const createdAt = new Date(blog.createdAt);
    return (
        <div>
            <p className="text-xl font-bold">{blog.title}</p>
            <p>{blog.description}</p>
            <p>By: {blog.author.userName}</p>
            <p>{createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()}</p>
            <p>{blog.favoritesCount}</p>
            <p>{blog.tagList.join(", ")}</p>
        </div>
    );
}