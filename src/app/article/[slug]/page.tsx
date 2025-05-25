"use client"
import { singleArticle } from "@/lib/api/article/single";
import { useState, useEffect,use } from "react";
export default function ArticlePage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const [article, setArticle] = useState(null);
   useEffect(() => {
    const { slug } = use(params);
    async function fetchArticle() {
        
    }
    return <div>{slug}</div>

}
  