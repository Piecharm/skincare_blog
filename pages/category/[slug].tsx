import { useRouter } from "next/router";
import { TPost } from "@/types/types";
import { Categories, Loader, PostCard } from "@/components";
import { getCategories, getCategoryPost } from "@/services";

type TParams = {
    params: {
        slug: string;
    };
};

interface CategoryPostProps {
    posts: {
        node: TPost;
    }[];
}

const CategoryPost = ({ posts }: CategoryPostProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto mb-8 px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post: any, index: number) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CategoryPost;

export async function getStaticProps({ params }: TParams) {
    const posts = await getCategoryPost(params.slug);

    return {
        props: { posts },
    };
}

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }: TPost) => ({ params: { slug } })),
        fallback: true,
    };
}
