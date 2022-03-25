import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ results }) {
    const router = useRouter();
    const onClick = (id, title) => {
        // router.push(`/movies/${id}`)
        router.push({
                pathname: `/movies/${id}`,
                query: {
                    title
                }
            },
            `/movies/${id}`
        );
    }
    return (
        <div className="container">
            <Seo title="Home"/>
            {results?.map((movie) => (
                <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <h4>
                        {/*<Link href={`/movies/${movie.id}`}>*/}
                        <Link
                            href={{
                                pathname: `/movies/${movie.id}`,
                                query: {
                                    title: movie.original_title
                                }
                            }}
                            as={`/movies/${movie.id}`}
                        >
                            <a>{movie.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))}
            <style jsx>{`
            .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 20px;
                gap: 20px;
            }
            .movie img {
                max-width: 100%;
                border-radius: 12px;
                transition: transform 0.2s ease-in-out;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .movie:hover img {
                transform: scale(1.05) translateY(-10px);
            }
            .movie h4 {
                font-size: 18px;
                text-align: center;
            }
            `}</style>
        </div>
    );
}

/**
 * getServerSideProps 는 약속된 이름으로 꼭 이렇게 해야한다.
 * */
export async function getServerSideProps() {
    const response = await fetch(`http://localhost:3000/api/movies`);
    const { results } = await response.json();
    return {
        props: {
            results
        }
    }
}