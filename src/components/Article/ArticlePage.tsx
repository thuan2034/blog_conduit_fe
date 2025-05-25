import { singleArticle } from "@/lib/api/article/single";
import { useState } from "react";
export default async function ArticlePage(title: string, description: string, body: string, favoritesCount: number, createdAt: string, tagList: string[], author: any) {
    return (
        <>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{body}</p>
            <p>{favoritesCount}</p>
            <p>{createdAt}</p>
            <p>{tagList.join(", ")}</p>
        </div>
        <div>
            <p>{author.userName}</p>
            <p>{author.bio}</p>
            <p>{author.image}</p>
            <p>{author.following}</p>
        </div>
        </>
    )
}
