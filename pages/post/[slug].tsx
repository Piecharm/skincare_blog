import { getPostDetails, getPosts } from "@/services";
import {
    Author,
    Categories,
    CommentForm,
    Comments,
    PostDetail,
    PostWidget,
} from "../../components";
import { TPost } from "@/types/types";

interface PostDetailsProps {
    post: TPost;
}

type TParams = {
    params: {
        slug: string;
    };
};

const PostDetails = ({ post }: PostDetailsProps) => {
    return (
        <div className="container mx-auto px-10 pb-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <PostWidget
                            slug={post.slug}
                            categories={post.categories.map(
                                (category) => category.slug
                            )}
                        />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps({ params }: TParams) {
    const data = await getPostDetails(params.slug);

    return {
        props: {
            post: data,
        },
    };
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node: { slug } }: { node: TPost }) => ({
            params: { slug },
        })),
        fallback: false,
    };
}

export default PostDetails;
