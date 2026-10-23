
const MovieCard = ({ movie, isTrending = false, rank }) => {
  const title = movie.title || "Untitled Movie";
  const rating = Number(movie.vote_average);
  const language = movie.original_language || "N/A";
  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const poster = movie.poster_url
    || (movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/no-movie.png");

  return (
    <li className="group min-w-0">
      <div className="movie-card relative">
        <img
          src={poster}
          alt={`${title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/no-movie.png";
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        {isTrending && (
          <>
            <span
              className={`absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl border text-xs font-black ${
                rank === 1
                  ? "border-lime-300 bg-lime-400 text-zinc-950"
                  : "border-white/20 bg-black/75 text-white"
              }`}
            >
              {String(rank).padStart(2, "0")}
            </span>

            <span className="absolute bottom-3 left-2 right-2 rounded-lg border border-white/15 bg-black/80 px-2 py-2 text-center text-xs font-bold text-white backdrop-blur-md">
              <span className="mr-1 text-lime-400">↗</span>
              {movie.count ?? 0}{" "}
              {(movie.count ?? 0) === 1 ? "search" : "searches"}
            </span>
          </>
        )}
      </div>

      <div className="px-0.5 pt-3">
        <h3
          title={title}
          className="truncate text-base font-bold leading-6 text-white transition group-hover:text-lime-300"
        >
          {title}
        </h3>

        <div className="content mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="rating flex items-center gap-1">
            <img
              src="/star.svg"
              alt=""
              className="!h-4 !w-4 object-contain"
            />
            <p className="text-sm font-bold text-white">
              {Number.isFinite(rating) && rating > 0
                ? rating.toFixed(1)
                : "N/A"}
            </p>
          </div>

          <span className="text-sm text-gray-100">•</span>

          <p className="capitalize text-sm font-medium text-gray-100">
            {language}
          </p>

          <span className="text-sm text-gray-100">•</span>

          <p className="text-sm font-medium text-gray-100">
            {year}
          </p>
        </div>

        {isTrending && (
          <p className="mt-1 text-xs text-zinc-500">
            Popular in searches
          </p>
        )}
      </div>
    </li>
  );
};

export default MovieCard;
