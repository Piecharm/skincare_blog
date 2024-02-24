import Image from "next/image";
import { TAuthor } from "../types/types";

interface AuthorProps {
    author: TAuthor;
}

const Author = ({ author: { bio, name, photo } }: AuthorProps) => {
    return (
        <div className="relative mt-20 mb-8 rounded-lg bg-black bg-opacity-20 p-12 text-center">
            <div className="absolute left-0 right-0 -top-14">
                <Image
                    src={photo.url}
                    alt={name}
                    unoptimized
                    height={100}
                    width={100}
                    className="rounded-full align-middle"
                />
            </div>
            <h3 className="my-4 text-xl font-bold text-white">{name}</h3>
            <p className="text-lg text-white">{bio}</p>
        </div>
    );
};

export default Author;
