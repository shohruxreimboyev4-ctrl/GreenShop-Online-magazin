import { useState, useMemo } from "react";
import { Slider, Skeleton, Select } from "antd";
import { useQueryHandler } from "../../hooks/useQuery/UseQuery";
import type {
  CategoryType,
  ProductType,
  QueryType,
} from "../../@types/AuthType";
import { loaderApi } from "../../generic/loader/loaderApi";
import Card from "./Card";

const { Option } = Select;

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("house-plants");
  const [slider, setSlider] = useState<number[]>([0, 1000]);
  const [sortType, setSortType] = useState("default");
  const [activeTab, setActiveTab] = useState("all");

  const { cateGoryLoader } = loaderApi();

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  }: QueryType<CategoryType[]> = useQueryHandler({
    url: "flower/category",
    pathname: "category",
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  }: QueryType<ProductType[]> = useQueryHandler({
    url: `flower/category/${activeCategory}`,
    pathname: `products/${activeCategory}`,
  });

  /** 🔥 PRICE FILTER + SORT */
  const filteredProducts = useMemo(() => {
    if (!productsData) return [];

    let data = productsData.filter(
      (p) => p.price >= slider[0] && p.price <= slider[1],
    );

    if (sortType === "cheap") {
      data = [...data].sort((a, b) => a.price - b.price);
    }
    if (sortType === "expensive") {
      data = [...data].sort((a, b) => b.price - a.price);
    }

    return data;
  }, [productsData, slider, sortType]);

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20 flex flex-col lg:flex-row gap-8">
      {/* SIDEBAR */}
      <div className="w-full lg:w-[25%] bg-[#fbfbfb] p-4 rounded-md h-fit">
        <h3 className="font-bold text-[18px] mb-4">Categories</h3>

        <div className="flex flex-col gap-4">
          {categoryLoading || categoryError
            ? cateGoryLoader()
            : categoryData?.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.route_path)}
                  className={`flex justify-between cursor-pointer
                  ${
                    activeCategory === cat.route_path
                      ? "text-[#46A358] font-bold"
                      : "hover:text-[#46A358]"
                  }`}
                >
                  <span>{cat.title}</span>
                  <span>({cat.count})</span>
                </div>
              ))}
        </div>

        {/* PRICE */}
        <div className="mt-8">
          <h3 className="font-bold text-[18px] mb-4">Price Range</h3>
          <Slider
            range
            min={0}
            max={1000}
            value={slider}
            onChange={setSlider}
            trackStyle={[{ backgroundColor: "#46A358" }]}
            handleStyle={[
              { borderColor: "#46A358" },
              { borderColor: "#46A358" },
            ]}
          />
          <p className="mt-2">
            Price:
            <span className="text-[#46A358] font-bold ml-1">
              {slider[0]}$ - {slider[1]}$
            </span>
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="w-full lg:w-[75%]">
        {/* TOP BAR (rasmdagidek) */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6 font-medium">
            {["all", "new", "sale"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`relative cursor-pointer pb-1 transition-all duration-300
    ${
      activeTab === t
        ? "text-[#46A358] after:w-full"
        : "text-[#3d3d3d] hover:text-[#46A358] after:w-0 hover:after:w-full"
    }
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-[#46A358] after:transition-all after:duration-300
  `}
              >
                {t === "all"
                  ? "All Plants"
                  : t === "new"
                    ? "New Arrivals"
                    : "Sale"}
              </button>
            ))}
          </div>

          <Select value={sortType} onChange={setSortType} className="w-[180px]">
            <Option value="default">Default Sorting</Option>
            <Option value="cheap">The Cheapest</Option>
            <Option value="expensive">Most Expensive</Option>
          </Select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productsError ? (
            <p className="text-red-500">Products not found 😕</p>
          ) : productsLoading ? (
            skeletons.map((_, i) => (
              <div
                key={i}
                className="h-[300px] flex items-center justify-center border rounded-md"
              >
                <Skeleton.Image active />
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
