import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlantPromoSection from "../../components/PlantPromoCard";
import ShopPage from "../../components/dashboard/ShopPage";
import Showcase from "../../components/Showcase";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <Showcase />
      <div className="w-[90%] max-w-[1550px] mx-auto mt-10 mb-20">
        <Carousel autoplay>
          <div>
            <Link to="/shop">
              <img src="https://via.placeholder.com/800x400?text=Shop+Plants" alt="Shop" className="w-full h-64 object-cover rounded-md" />
            </Link>
          </div>
          <div>
            <Link to="/blog">
              <img src="https://via.placeholder.com/800x400?text=Our+Blog" alt="Blog" className="w-full h-64 object-cover rounded-md" />
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <img src="https://via.placeholder.com/800x400?text=Profile" alt="Profile" className="w-full h-64 object-cover rounded-md" />
            </Link>
          </div>
        </Carousel>
      </div>
      <ShopPage />
      <PlantPromoSection />
      <div className="w-[90%] max-w-[1550px] mx-auto mt-10 mb-20">
        <h2 className="text-2xl font-bold text-[#3D3D3D] mb-8">Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/blog" className="block">
            <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <img src="https://via.placeholder.com/300x200?text=Blog+Post+1" alt="Blog Post 1" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#3D3D3D]">Plant Care Tips</h3>
                <p className="text-gray-600 mt-2">Learn how to take care of your plants...</p>
              </div>
            </div>
          </Link>
          <Link to="/blog" className="block">
            <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <img src="https://via.placeholder.com/300x200?text=Blog+Post+2" alt="Blog Post 2" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#3D3D3D]">New Arrivals</h3>
                <p className="text-gray-600 mt-2">Check out our latest plant collection...</p>
              </div>
            </div>
          </Link>
          <Link to="/blog" className="block">
            <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <img src="https://via.placeholder.com/300x200?text=Blog+Post+3" alt="Blog Post 3" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#3D3D3D]">Gardening Hacks</h3>
                <p className="text-gray-600 mt-2">Simple hacks for better gardening...</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
