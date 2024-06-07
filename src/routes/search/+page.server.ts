import { error } from "@sveltejs/kit";

export const load = async ({ fetch, url, locals }) => {
    let query = url.searchParams.get("q");
    if (!query) {
        error(404, { message: "Please provide a search query" });
    }
    query = decodeURIComponent(query).trim();
    const filter = url.searchParams.get("filter") ?? "videos";

    if (!filter || ["videos", "channels", "playlists"].includes(filter ?? "") === false) {
        error(404, { message: "Please provide a search filter" });
    }

    const api = locals.createPipedApi(fetch);
    const results = await api.getSearch({ query, filter });

    return {
        results,
    };
};
