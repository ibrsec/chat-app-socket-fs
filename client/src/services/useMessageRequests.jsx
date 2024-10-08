import { useDispatch } from "react-redux";
import useAxios from "./useAxios";   
import { hotToastError } from "../helper/hotToast";
import { fetchMessageFail, fetchMessageStart, messagesSuccess, sendMessageSuccess,  } from "../features/messageSlice"; 

const useMessageRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();  
  const getMessagesApi = async (recieverId) => {
    try {
      dispatch(fetchMessageStart());
      const { data } = await axiosToken("/messages/"+recieverId);
      console.log(`getMessagesApi = `, data);
      dispatch(messagesSuccess(data?.messages));
    } catch (error) {
      // toastErrorNotify("Error! Couldn't Get Firms");
      hotToastError(
        "Error! Messages couldn't be loaded!" +
          " - " +
          error?.response?.data?.message
      );

      dispatch(fetchMessageFail());
      console.log(error);
    //   if (error?.response?.status === 403) {
    //     console.log("403 hata alındı, yönlendiriliyor...");
    //     dispatch(logoutSuccess());
    //     navigate("/");
    //   }
    }
  };



  const sendMessageApi = async (recieverId,message) => {
    try {
      dispatch(fetchMessageStart());
      const { data } = await axiosToken.post("/messages/send/"+recieverId,{message});
      console.log(`sendMessageApi = `, data);
      dispatch(sendMessageSuccess(data?.newMessage));

 
    } catch (error) { 
      hotToastError(
        "Error! Message couldn't be sended!" +
          " - " +
          error?.response?.data?.message
      );

      dispatch(fetchMessageFail());
      console.log(error);
    //   if (error?.response?.status === 403) {
    //     console.log("403 hata alındı, yönlendiriliyor...");
    //     dispatch(logoutSuccess());
    //     navigate("/");
    //   }
    }
  };
  
 



  // const deleteSelectedDataApi = async (path, id) => {
  //   const idLoading = toastLoading(`Deleting...`);
  //   try {
  //     dispatch(fetchStockStart());
  //     const { data } = await axiosToken.delete(`${path}/${id}`);
  //     console.log(
  //       `useStocktan delete Data(${path})= [response empty - success]`,
  //       data
  //     );
  //     dispatch(successWitoutPayload());
  //     // toastSuccessNotify(`Deleted Successfully!`);
  //     taostStopLoading(idLoading, "success", "Deleted Successfully!");
  //     getDataApi(path);
  //   } catch (error) {
  //     // toastErrorNotify("Error! The Firm couldn't be deleted !");
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! Data couldn't be deleted! - " + error?.response?.data?.message
  //     );

  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");

  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };
  // const postNewDataApi = async (path, firmData) => {
  //   const idLoading = toastLoading("Creating...!");
  //   try {
  //     dispatch(fetchStockStart());
  //     const { data } = await axiosToken.post(path, firmData);
  //     console.log(`useStocktan postnewData(${path})= `, data);
  //     dispatch(successWitoutPayload());
  //     // toastSuccessNotify(`New Firm is added Successfully!`);
  //     getDataApi(path);
  //     taostStopLoading(idLoading, "success", data?.message);
  //   } catch (error) {
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! The New data couldn't be added ! - " +
  //         error?.response?.data?.message
  //     );
  //     // toastErrorNotify("Error! The New Firm couldn't be added !");
  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");
  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };
  // const putEditApi = async (path, id, firmData) => {
  //   const idLoading = toastLoading(`Editting...`);
  //   try {
  //     dispatch(fetchStockStart());
  //     const { data } = await axiosToken.put(`${path}/${id}`, firmData);
  //     console.log(`useStocktan putEditData(${path})= `, data);
  //     dispatch(successWitoutPayload());
  //     // toastSuccessNotify(`The Firm is editted Successfully!`);
  //     taostStopLoading(idLoading, "success", data?.message);

  //     getDataApi(path);
  //   } catch (error) {
  //     // toastErrorNotify("Error! The New Firm couldn't be editted !");
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! Data couldn't be editted! - " + error?.response?.data?.message
  //     );

  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");
  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };

  // const getAllDataGenericApi = async (paths) => {
  //   const idLoading = toastLoading(`Getting the ${paths?.join(", ")}...`);
  //   try {
  //     dispatch(fetchStockStart());
  //     const res = await Promise.all(paths?.map((item) => axiosToken(item)));

  //     const datas = res.map((item) => item?.data?.data);
  //     console.log(`useStocktan promise all (${paths?.join(", ")})= `, res);
  //     console.log(paths);
  //     console.log(datas);
  //     dispatch(stockPromiseAllSuccess({ datas, paths }));
  //     taostStopLoading(
  //       idLoading,
  //       "success",
  //       `${paths} are loaded successfully!`
  //     );
  //   } catch (error) {
  //     // toastErrorNotify("Error! Couldn't Get Firms");
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! Datas couldn't be loaded!" + " - " + paths.join(", ")
  //     );

  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");
  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };

  return {
    getMessagesApi, sendMessageApi,  
  };
};

export default useMessageRequests;
