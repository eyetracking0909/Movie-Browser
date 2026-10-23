
import MovieCard from "./Moviecard";

const TrendingMovies = ({ movies = [] }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="my-12 w-full sm:my-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] font-extrabold tracking-[2px] text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
            COMMUNITY FAVORITES
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Trending <span className="text-lime-400">Now</span>
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            See what everyone is searching for.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-2 text-[10px] font-extrabold tracking-wider text-lime-200 sm:flex">
          MOST SEARCHED
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {movies.slice(0, 5).map((movie, index) => (
          <MovieCard
            key={movie.$id || movie.movie_id}
            movie={movie}
            isTrending
            rank={index + 1}
          />
        ))}
      </ul>
    </section>
  );
};

export default TrendingMovies;
