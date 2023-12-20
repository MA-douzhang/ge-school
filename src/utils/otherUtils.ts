import { OpenAPI } from "../../generated";

const thumbnail = (src: string) => {
  return src + "?x-oss-process=image/resize,m_lfit,h_250,w_250";
};
const toPreview = (item: any, url: string) => {
  item.preview = [url];
  return item.preview;
};

export { thumbnail, toPreview };
