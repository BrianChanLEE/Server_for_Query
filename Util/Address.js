const axios = require("axios");

// API 키
const API_KEY = "API_KEY";

// API 호출 함수
const getAddress = async (Address) => {
  const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${API_KEY}&currentPage=1&countPerPage=10&keyword=${encodeURIComponent(
    Address
  )}&resultType=json`;

  try {
    const response = await axios.get(url);
    const data = response.data.results.juso[0];
    return {
      zipCode: data.zipNo,
      address: data.roadAddr,
      detailAddress: "",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getAddress;
