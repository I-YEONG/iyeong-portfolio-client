import { Loading } from "@/components";
import { projectDetailImgsCss } from "./ProjectDetailImgs.styles";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useMedia } from "@/hooks/useMedia";
import { useSetAtom } from "jotai";
import { imageModalOpenAtom, imageModalUrlAtom } from "@/atoms/imageModalAtoms";

const ProjectDetailImgs = ({ data }) => {
  const imageList = data?.images?.filter((img) => !img.isMain && !img.isDetail)?.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const { isPc } = useMedia();

  const openModal = useSetAtom(imageModalOpenAtom);
  const setUrl = useSetAtom(imageModalUrlAtom);

  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectDetailImgsCss} className="content-box">
          <div className="content-center">
            <p className="explanation">클릭 시 크게 볼 수 있습니다.</p>
            <Swiper
              slidesPerView={isPc ? "auto" : 1}
              spaceBetween={32}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper">
              {imageList?.map((item, index) => (
                <SwiperSlide
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setUrl(item.imageUrl);
                    openModal(true);
                  }}>
                  <img src={item.imageUrl} className="image-item" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
};
export default ProjectDetailImgs;
