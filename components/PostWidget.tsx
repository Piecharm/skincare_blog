import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TPost } from "../types/types";
import { getRecentPosts, getSimilarPosts } from "@/services";

interface PostWidgetProps {
    categories?: string[];
    slug?: string;
}

const PostWidget = ({ categories, slug }: PostWidgetProps) => {
    const [relatedPosts, setRelatedPosts] = useState<TPost[]>([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories!, slug).then((result) =>
                setRelatedPosts(result)
            );
        } else {
            getRecentPosts().then((result) => setRelatedPosts(result));
        }
    }, [slug]);

    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
                {slug ? "Related Posts" : "Recent Posts"}
            </h3>
            {relatedPosts.map((post, idx) => (
                <div key={idx} className="mb-4 flex w-full items-center">
                    <div className="w-16 flex-none">
                        <Image
                            alt={post.title}
                            height={60}
                            width={60}
                            unoptimized
                            className="rounded-full align-middle"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="ml-4 flex-grow">
                        <p className="font-xs text-gray-500">
                            {moment(post.createdAt).format("MMM DD, YYYY")}
                        </p>
                        <Link
                            href={`/post/${post.slug}`}
                            className="text-md"
                            key={post.title}
                        >
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
