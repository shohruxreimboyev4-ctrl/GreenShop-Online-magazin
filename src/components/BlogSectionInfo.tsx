import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegComment, FaRegHeart, FaSearch } from "react-icons/fa";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { useReduxSelector } from "../hooks/useRedux/useRedux";

interface BlogType {
  _id: string;
  title: string;
  short_description?: string;
  content?: string;
  created_at: string;
  created_by: string;
  views?: number;
  likes?: number;
  comments_count?: number;
}

interface RootState {
  userSlice: {
    user: null | Record<string, unknown>;
  };
}

const BlogSectionInfo = () => {
  const navigate = useNavigate();
  const user = useReduxSelector((state: RootState) => state.userSlice.user);

  const skeletonArray = [1, 2, 3, 4, 5, 6];

  const [searchTerm, setSearchTerm] = useState("");
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const isClient = typeof window !== "undefined"; // 🔥 SSR FIX

  const { data: apiData = [], isLoading: apiLoading } = useQueryHandler<
    BlogType[]
  >({
    url: "user/blog",
    pathname: "blog",
    param: { search: "" },
  });

  /** 🔥 SAFE DATA LOAD (deferred setState to avoid cascading renders) */
  useEffect(() => {
    if (!isClient) return;

    if (apiData.length > 0) {
      Promise.resolve().then(() => {
        localStorage.setItem("blogs_cache", JSON.stringify(apiData));
        setAllBlogs(apiData);
        setFilteredBlogs(apiData);
      });
    } else {
      const stored = localStorage.getItem("blogs_cache");
      if (stored) {
        const parsed: BlogType[] = JSON.parse(stored);
        Promise.resolve().then(() => {
          setAllBlogs(parsed);
          setFilteredBlogs(parsed);
        });
      }
    }
  }, [apiData, isClient]);

  /** 🔍 SEARCH */
  const handleSearch = () => {
    setIsSearching(true);
    setFilteredBlogs([]);

    setTimeout(() => {
      const term = searchTerm.toLowerCase().trim();

      if (!term) {
        setFilteredBlogs(allBlogs);
      } else {
        const filtered = allBlogs.filter(
          (blog) =>
            blog.title?.toLowerCase().includes(term) ||
            blog.short_description?.toLowerCase().includes(term) ||
            blog.content?.toLowerCase().includes(term),
        );
        setFilteredBlogs(filtered);
      }

      setIsSearching(false);
    }, 800);
  };

  /** 🔁 RESET SEARCH */
  useEffect(() => {
    if (!searchTerm) {
      const id = setTimeout(() => setFilteredBlogs(allBlogs), 0);
      return () => clearTimeout(id);
    }
  }, [searchTerm, allBlogs]);

  return (
    <div className="w-[90%] max-w-[1550px] mx-auto px-4 py-8">
      {user && (
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-lg flex items-center gap-2 bg-gray-50 p-2 rounded-lg border shadow-sm">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-1 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#46a358] hover:bg-[#3d8f4d] text-white px-6 py-2.5 rounded-md transition active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSearching || (apiLoading && allBlogs.length === 0) ? (
          skeletonArray.map((_, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-6 animate-pulse h-56"
            />
          ))
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            {searchTerm
              ? `"${searchTerm}" bo‘yicha natija topilmadi`
              : "Bloglar mavjud emas"}
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="border rounded-lg p-6 hover:shadow-md transition cursor-pointer"
            >
              <h3 className="font-bold mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-600 line-clamp-4">
                {blog.short_description || blog.content}
              </p>

              <div className="flex justify-between text-sm text-gray-400 mt-4 pt-4 border-t">
                <span className="flex gap-1 items-center">
                  <FaEye /> {blog.views ?? 0}
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegComment /> {blog.comments_count ?? 0}
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegHeart /> {blog.likes ?? 0}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSectionInfo;
