import {useRouter} from "next/router";

export default function movieDetails() {
    const router = useRouter();
    console.log(router);
    return "movie details";
}