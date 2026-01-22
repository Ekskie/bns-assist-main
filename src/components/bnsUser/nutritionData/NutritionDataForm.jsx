"use client";
import { useAddNewCndataRecordMutation } from "@/service/childrenNutritionData/childrenNurtritionDataApiSlice";
import { format, isValid, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";

const NutritionDataForm = ({ setOpen, formUpdateData, formStatus }) => {
  /* API FUNCTION */

  const [addNewCnDataRecords, { isError }] = useAddNewCndataRecordMutation();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [recommendationDropDown, setRecommendationDropDown] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    mother: "",
    ageMonths: 0,
    gender: "",
    status: "",
    birthDate: "",
  });

  /* GENERATE DATE NOW */

  const generateDate = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = now.getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      dateNow: `${month}/${day}/${year}`,
      textDate: `${year}, ${monthNames[now.getMonth()]} ${now.getDate()}`,
    };
  };

  const [information, setInformation] = useState({
    weightKg: 0,
    heightCm: 0,
    muacCm: 0,
    status: "",
    date: generateDate()?.dateNow,
    recommendation: [],
  });

  console.log(information);

  useEffect(() => {
    if (formUpdateData) {
      setFormData(formUpdateData);
      setInformation(
        formUpdateData?.information[formUpdateData?.information?.length - 1]
      );
    } else {
      setFormData({
        _id: "",
        name: "",
        mother: "",
        ageMonths: 0,
        gender: "",
        status: "",
        birthDate: "",
        information: {
          weightKg: 0,
          heightCm: 0,
          muacCm: 0,
          date: generateDate()?.dateNow,
          recommendation: [],
        },
      });
    }
  }, [formUpdateData]);

  /* Dynamic On Change  */
  const setChangeData = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /* Set gender */

  const setGender = (txt) => {
    setFormData((prev) => {
      return { ...prev, gender: txt };
    });
  };

  /* set w,h,muac */
  const setNumberData = (e) => {
    const { value, name } = e.target;

    setInformation((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(formData);

  /* BG Status Reccomendation */

  const setBg = (txt) => {
    if (txt === 1) {
      return "bg-[#DBEAFE] text-[#1447E6]";
    } else if (txt === 2) {
      return "bg-[#DBFCE7] text-[#008236]";
    } else if (txt === 3) {
      return "bg-[#FEF9C2] text-[#894B00]";
    } else if (txt === 4) {
      return "bg-[#FAF5FF] text-[#6E11B0]";
    } else {
      return "bg-[#DBEAFE] text-[]";
    }
  };

  /*   const recordNew = () => {
    setFormData((prev) => {
      return {
        ...prev,
        information: {
          weightKg: 0,
          heightCm: 0,
          muacCm: 0,
          date: generateDate()?.dateNow,
          recommendation: [],
        },
      };
    });
  }; */

  const recordNew = () => {
    setInformation({
      weightKg: 0,
      heightCm: 0,
      muacCm: 0,
      status: "",
      date: new Date(),
      recommendation: [],
    });

    setIsUpdating(true);
  };

  /* Adding Recomendation */

  const addRecommendation = (code) => {
    let recommendation = {};

    if (code === "A1") {
      recommendation = {
        id: information?.recommendation?.length + 1,
        title: "Good Growth Progress",
        description:
          "Child is showing good growth progress. Continue with the current balanced diet.",
      };
    } else if (code === "A2") {
      recommendation = {
        id: information?.recommendation?.length + 1,
        title: "Mild Underweight",
        description:
          "Child is mildly underweight. Introduce more protein-rich foods and monitor weight weekly.",
      };
    } else if (code === "A3") {
      recommendation = {
        id: information?.recommendation?.length + 1,
        title: "Overweight Risk",
        description:
          "Child is at risk of being overweight. Encourage active play and reduce sugary snacks.",
      };
    } else if (code === "A4") {
      recommendation = {
        id: information?.recommendation?.length + 1,
        title: "Severely Underweight",
        description:
          "Immediate attention needed. Refer to a health worker and provide nutrient-dense meals.",
      };
    } else {
      recommendation = {
        id: information?.recommendation?.length + 1,
        title: "Unknown Code",
        description: "No matching recommendation found for this code.",
      };
    }

    setInformation((prev) => {
      return {
        ...prev,
        recommendation: [...(prev?.recommendation || []), recommendation],
      };
    });
  };

  /* Removing Recomendation */

  const removeRecommendation = (value) => {
    setInformation((prev) => {
      return {
        ...prev,
        recommendation: prev?.recommendation?.filter((data) => {
          return data?.id !== value;
        }),
      };
    });
  };

  const formatCustomDate = (value) => {
    if (!value) return ""; // nothing yet on first render

    // Convert to Date
    const date =
      typeof value === "string"
        ? parseISO(value)
        : value instanceof Date
        ? value
        : null;

    if (!isValid(date)) return ""; // guard against bad values

    return format(date, "yyyy, MMM dd").toUpperCase(); // "2025, MAY 27"
  };

  /* GENERATE BMI */

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return { bmi: 0, status: "Invalid input" };

    const bmiValue = weight / (height * height);
    const bmi = parseFloat(bmiValue.toFixed(2));
    let status = "";

    console.log(weight, height, bmi);

    if (bmi < 16) {
      status = "severely underweight";
    } else if (bmi >= 16 && bmi < 18.5) {
      status = "underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      status = "normal";
    } else {
      status = "overweight";
    }

    /*   return { bmi, status }; */

    setInformation((prev) => {
      return {
        ...prev,
        status: status,
        bmi: bmi,
      };
    });
  };

  const addNewRecord = async () => {
    const dataSend = {
      id: formData?._id,
      ...information,
    };

    const isTrue = [
      information?.muacCm,
      information?.weightKg,
      information?.status,
      information?.heightCm,
    ].every(Boolean);

    if (isTrue) {
      const res = await addNewCnDataRecords({ ...dataSend });

      if (isError && res) {
        console.log(res);

        toast.error("Wrong Email or Password!", {
          duration: 3000,
        });
      } else {
        if (res) {
          console.log(res);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    }
  };

  return (
    <div className="w-full p-[24px] border border-gray-200  rounded-md">
      <h3 className="text-[24px] font-semibold">Edit Nutrition Records</h3>
      <p className="text-[14px]  text-[#64748b] mb-[24px]">
        Update the nutrition information for this child
      </p>

      <h3 className="text-lg font-semibold mb-[24px]">Child Information</h3>

      {/* FORM INPUT */}

      <div className="w-full">
        {/* INPUT 1 */}
        <div className="w-full flex gap-[24px] mb-[24px]">
          <div className="w-1/2">
            <label htmlFor="fullname" className="text-sm font-medium">
              Child's Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="name"
              className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-[14px]"
              value={formData?.name}
              onChange={(e) => setChangeData(e)}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender
            </label>
            <div
              id="gender"
              name="nagenderme"
              className="px-[8px] py-[12px] w-full flex justify-between outline-none rounded-md border border-gray-200 text-[14px] relative"
              onClick={() => setDropDownOpen((prev) => !prev)}
            >
              {formData?.gender ? formData?.gender : " Choose Gender..."}
              <i className="bi bi-chevron-down"></i>
              {/* DROPDOWN MENU */}
              <div
                className={`p-2 w-full  gap-2 flex-col outline-none rounded-md border border-gray-200 text-[14px] absolute top-[120%] left-0 bg-[#f9fafb] ${
                  dropDownOpen ? "flex" : "hidden"
                } `}
              >
                <div
                  className="px-[8px] py-[8px] w-full outline-none rounded-md border  border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointer "
                  onClick={() => setGender("Male")}
                >
                  Male
                </div>
                <div
                  className="px-[8px] py-[8px] w-full outline-none rounded-md border border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointer "
                  onClick={() => setGender("Female")}
                >
                  Female
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT 2 */}
        <div className="w-full flex gap-[24px] mb-[24px]">
          <div className="w-1/2">
            <label htmlFor="birthdate" className="text-sm font-medium">
              Birth Date
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthDate"
              className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]"
              value={formData?.birthDate?.slice(0, 10)}
              onChange={(e) => setChangeData(e)}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="guardian" className="text-sm font-medium">
              Mother/Guardian's Name
            </label>
            <input
              type="text"
              id="guardian"
              name="mother"
              className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-[14px]"
              value={formData?.mother}
              onChange={(e) => setChangeData(e)}
            />
          </div>
        </div>

        {/* INPUT 3 */}
        <div className="w-full flex items-end gap-[24px] mb-[24px]">
          <div className="w-1/2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]"
              value={formData?.address}
              onChange={(e) => setChangeData(e)}
              name="address"
            />
          </div>

          <div className="w-1/2 flex justify-end-safe">
            <button className=" bg-[#4CAF50] text-white text-[12px]  flex items-center justify-center gap-5 px-[24px] py-[8px] rounded-md font-medium cursor-pointer duration-200 hover:opacity-50">
              <i className="bi bi-file-info"></i> Update Information
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full flex justify-end py-4 border-b border-gray-200 mb-[24px]"></div>

        {/* Nutrition Measurements */}

        <h3 className="text-[24px] font-semibold">Monthly Nutrition Records</h3>
        <p className="text-[14px]  text-[#64748b] mb-[24px]">
          Record Child Nutritional Data Monthly update
        </p>

        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold mb-[24px]">
            Nutrition Measurements
          </h3>

          <button
            className=" border border-[#4CAF50] text-[#4CAF50] text-[12px]  flex items-center justify-center gap-5 px-[24px] py-[8px] rounded-md font-medium cursor-pointer duration-200 hover:opacity-50"
            onClick={() => recordNew()}
          >
            Record New
          </button>
        </div>

        {/* INPUT 4 */}
        <div className="w-full flex gap-[24px] mb-[24px]">
          <div className="w-[33.33%]">
            <label htmlFor="weight" className="text-sm font-medium">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className=" px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-[14px] placeholder:text-gray-500"
              placeholder="0"
              value={information?.weightKg}
              onChange={(e) => setNumberData(e)}
              name="weightKg"
            />
          </div>

          <div className="w-[33.33%]">
            <label htmlFor="height" className="text-sm font-medium">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              className=" px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-[14px] placeholder:text-gray-500"
              placeholder="0"
              value={information?.heightCm}
              onChange={(e) => setNumberData(e)}
              name="heightCm"
            />
          </div>

          <div className="w-[33.33%]">
            <label htmlFor="muac" className="text-sm font-medium">
              MUAC (cm) - Optional
            </label>
            <input
              type="number"
              id="muac"
              className=" px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-[14px] placeholder:text-gray-500"
              placeholder="0"
              value={information?.muacCm}
              onChange={(e) => setNumberData(e)}
              name="muacCm"
            />
          </div>
        </div>

        {/* INPUT 5 */}
        <div className="w-full flex gap-[24px] mb-[24px]">
          <div className="w-1/2">
            <label htmlFor="daterecord" className="text-sm font-medium">
              Date Recorded
            </label>
            <div
              type="date"
              id="daterecord"
              className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]"
            >
              {formatCustomDate(information?.date)}
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="status" className="text-sm font-medium">
              Nutritional Status
            </label>

            <div className="px-[8px] py-[4px] w-full flex justify-between items-center outline-none rounded-md border border-gray-200  text-black text-[14px]">
              <p className="py-[8px]">
                {information?.status
                  ? information?.status
                  : "Click to Generate"}
              </p>

              {information?.heightCm && information?.status ? (
                <> </>
              ) : (
                <button
                  className=" border border-gray-400 text-[12px] px-[12px] py-[8px] rounded-md font-medium cursor-pointer duration-200 hover:bg-[#FFC105]"
                  onClick={() =>
                    calculateBMI(information?.weightKg, information?.heightCm)
                  }
                >
                  Calculate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* INPUT 6*/}

        <div className="w-full flex gap-[24px] mb-[24px]">
          <div className="w-1/2">
            <label htmlFor="daterecord" className="text-sm font-medium">
              Recommendations
            </label>
            <div
              type="date"
              id="daterecord"
              className="px-[8px] py-[12px] w-full flex flex-wrap gap-4  outline-none rounded-md border border-gray-200  text-black text-[14px]"
            >
              {information?.recommendation?.length ? (
                <>
                  {" "}
                  {information?.recommendation?.map((data, index) => {
                    return (
                      <div
                        className={`w-[30%] flex items-center justify-center px-2 text-[12px] text-center rounded-[2px] ${setBg(
                          index + 1
                        )}`}
                        key={index}
                      >
                        {isUpdating ? (
                          <i
                            className="bi bi-x cursor-pointer text-[16px]"
                            onClick={() => removeRecommendation(data?.id)}
                          >
                            {" "}
                          </i>
                        ) : (
                          ""
                        )}

                        {data?.title}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>Add Recommendation</>
              )}
            </div>
          </div>

          {!isUpdating ? (
            <div className="w-1/2">
              <label htmlFor="recommendation" className="text-sm font-medium">
                NOTE
              </label>
              <div
                id="recommendation"
                name="recommendation"
                className="px-[8px] py-[12px] w-full flex justify-between outline-none rounded-md border border-gray-200 text-[14px] relative"
              >
                YOU ARE VIEWING LAST MONTH UPDATE (
                {formatCustomDate(information?.date)})
              </div>
            </div>
          ) : (
            <div className="w-1/2">
              <label htmlFor="recommendation" className="text-sm font-medium">
                Assign Recommendation
              </label>
              <div
                id="recommendation"
                name="recommendation"
                className="px-[8px] py-[12px] w-full flex justify-between outline-none rounded-md border border-gray-200 text-[14px] relative"
                onClick={() => setRecommendationDropDown((prev) => !prev)}
              >
                Give Recommendation
                <i className="bi bi-chevron-down"></i>
                {/* DROPDOWN MENU */}
                <div
                  className={`p-2 w-full  gap-2 flex-col outline-none rounded-md border border-gray-200 text-[14px] absolute bottom-[120%] left-0 bg-[#f9fafb] ${
                    recommendationDropDown ? "flex" : "hidden"
                  } `}
                >
                  <div
                    className="px-[8px] py-[8px] w-full outline-none rounded-md border  border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointer "
                    onClick={() => addRecommendation("A1")}
                  >
                    Good Growth Progress
                  </div>
                  <div
                    className="px-[8px] py-[8px] w-full outline-none rounded-md border border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointer "
                    onClick={() => addRecommendation("A2")}
                  >
                    Mild Underweight
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex justify-between items-center">
          <button
            className=" border border-gray-400 text-[12px]  flex items-center justify-center gap-5  px-[24px] py-[8px] rounded-md font-medium cursor-pointer duration-200 hover:bg-[#FFC105]"
            onClick={() => setOpen(false)}
          >
            <i className="bi bi-x"></i> Cancel
          </button>

          <button
            className={`bg-[#4CAF50] text-white text-[12px]  flex items-center justify-center gap-5 px-[24px] py-[8px] rounded-md font-medium duration-200 hover:opacity-50 ${
              isUpdating ? "cursor-pointer " : " opacity-50"
            }`}
            disabled={!isUpdating}
            onClick={() => addNewRecord()}
          >
            <i className="bi bi-file-earmark-text"></i> Upload Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionDataForm;
