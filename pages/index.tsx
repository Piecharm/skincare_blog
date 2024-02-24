import Head from "next/head";
import type { NextPage } from "next";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts } from "@/services";
import { TPost } from "@/types/types";

interface HomeProps {
    posts: TPost[];
}

const Home: NextPage = ({ posts }: any) => {
    return (
        <div className="container mx-auto mb-8 px-10">
            <Head>
                <title>CMS Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <FeaturedPosts /> */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post: any) => (
                        <PostCard key={post.node.slug} post={post.node} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const posts = (await getPosts()) || [];

    return {
        props: {
            posts,
        },
    };
}

export default Home;
