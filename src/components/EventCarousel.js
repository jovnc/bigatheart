"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselEventCard from "./CarouselEventCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const supabase = createClientComponentClient();

export default function EventCarousel({ deviceType }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: eventData } = await supabase
        .from("events")
        .select("date, time, location, name, image");

      setData(eventData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || !data) return <Spinner />;

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={deviceType !== "mobile" ? true : false}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      partialVisbile={true}
      focusOnSelect={true}
    >
      {data &&
        data.map((event, i) => {
          return (
            <CarouselEventCard
              name={event.name}
              date={event.date}
              time={event.time}
              location={event.location}
              image_url={event.image}
              key={i}
            />
          );
        })}
    </Carousel>
  );
}
