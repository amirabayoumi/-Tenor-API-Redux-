import { useState } from "react";
import { Input } from "./components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { useGetSearchResultQuery } from "./store/searchApi";
import { useGetWordSuggestionsQuery } from "./store/searchApi";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useGetSearchResultQuery(searchTerm, {
    skip: !searchTerm,
  });

  const { data: suggestions } = useGetWordSuggestionsQuery(searchTerm, {
    skip: !searchTerm,
  });

  console.log(suggestions);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const term = formData.get("searchInput") as string;

    setSearchTerm(term);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-10">
      <form onSubmit={handleSearch} className="w-[400px] flex">
        <Input
          name="searchInput"
          className="w-[70%] m-2 border-2 border-emerald-500 outline-none"
          placeholder="Search GIFs..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button type="submit">
          <IoSearchOutline className="text-5xl text-emerald-500" />
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching GIFs!</p>}

      <div className="w-[400px]">
        {suggestions?.results?.map((suggestion: string, index: number) => (
          <button
            key={index}
            onClick={() => setSearchTerm(suggestion)}
            className="border bg-amber-400 p-3 rounded-md text-2xl hover:bg-amber-500"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {data?.results?.map(
          (gif: {
            id: string;
            media_formats: { gif: { url: string } };
            content_description: string;
          }) => (
            <img
              key={gif.id}
              src={gif.media_formats.gif.url}
              alt={gif.content_description}
              className="w-40 h-40 object-cover rounded-lg"
            />
          )
        )}
      </div>
    </div>
  );
};

export default App;
