import React from "react";
import NewsSwiper from "../custom/NewsSwiper";

const CompanyNews = () => {
  return (
    <section className="container mx-auto xl:max-w-[70%] py-12">
      <h1 className="text-center text-[#DAE6EA] font-[600] text-3xl sm:text-4xl xl:text-[2.225rem] mb-12">
        Company News
      </h1>
      <NewsSwiper/>
    </section>
  );
};

export default CompanyNews;
